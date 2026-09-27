#!/usr/bin/env bash
#
# Incremental deploy to cPanel over the cPanel API (port 2083) — no FTP, no SSH.
#
# Why this exists: SkyHost's FTP passive-port config keeps resetting (broke
# 2026-09-10 and again 2026-09-26), and SSH/shell is disabled on the account.
# The cPanel web API on port 2083 answers reliably from outside, so we deploy
# through it instead. See docs/pqnk-book-workflow.md for the full history.
#
# The site is ~1.1 GB (mostly PDFs/images), so we CANNOT re-upload everything
# each run. Strategy:
#   * "small" set (HTML/JS/CSS + everything under _next/ + tiny non-media
#     files): re-uploaded every run — it's small and always-current.
#   * "media" set (PDFs/images, the big stuff): only files changed since the
#     last successful deploy are uploaded (computed via git diff of public/).
# Each set is packed into <= CHUNK_CAP zips, uploaded via UAPI
# Fileman::upload_files, and unpacked into the docroot via API2
# Fileman::fileop op=extract (overwrite). The zips are deleted afterwards.
#
# Required environment (set by .github/workflows/deploy.yml):
#   CPANEL_HOST    e.g. cpanel.pedaver.com   (has a valid cert on :2083)
#   CPANEL_USER    cPanel account username    (secret)
#   CPANEL_TOKEN   cPanel API token           (secret)
#   DOCROOT_REL    docroot relative to the cPanel home, e.g. pedaver.com
#   GH_TOKEN       GITHUB_TOKEN (to find the last successful deploy commit)
#   FALLBACK_BASE  commit to diff against if no previous success is found
#
set -euo pipefail

: "${CPANEL_HOST:?}"; : "${CPANEL_USER:?}"; : "${CPANEL_TOKEN:?}"
: "${DOCROOT_REL:?}"; : "${GH_TOKEN:?}"; : "${FALLBACK_BASE:?}"

API="https://${CPANEL_HOST}:2083"
AUTH="Authorization: cpanel ${CPANEL_USER}:${CPANEL_TOKEN}"
HOME_DIR="/home/${CPANEL_USER}"
CHUNK_CAP=$((40 * 1024 * 1024))   # 40 MB per upload chunk
WORK="$(mktemp -d)"

media_re='\.(pdf|png|jpe?g|webp|gif|mp4|webm|mov|m4v|avi)$'

# ---------------------------------------------------------------------------
# 1. Work out the baseline commit = the most recent SUCCESSFUL run of this
#    workflow, excluding the current run. Falls back to FALLBACK_BASE.
# ---------------------------------------------------------------------------
echo "== Resolving baseline commit =="
runs="$(curl -sS -H "Authorization: Bearer ${GH_TOKEN}" \
  "https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/deploy.yml/runs?branch=main&status=success&per_page=20" || true)"
BASE="$(echo "$runs" | jq -r --arg cur "${GITHUB_RUN_ID:-0}" \
  '(.workflow_runs // []) | map(select((.id|tostring)!=$cur)) | (.[0].head_sha // "")' 2>/dev/null || true)"
if [ -z "${BASE:-}" ] || ! git cat-file -e "${BASE}^{commit}" 2>/dev/null; then
  echo "No usable previous-success commit; using fallback ${FALLBACK_BASE}"
  BASE="$FALLBACK_BASE"
fi
echo "Baseline: $BASE"
echo "Head:     ${GITHUB_SHA:-$(git rev-parse HEAD)}"

# ---------------------------------------------------------------------------
# 2. Build the two file lists (paths relative to out/).
# ---------------------------------------------------------------------------
[ -d out ] || { echo "ERROR: out/ not found — build must run first"; exit 1; }

SMALL_LIST="$WORK/small.txt"
MEDIA_LIST="$WORK/media.txt"

# small = under _next/, OR not a media extension
( cd out && find . -type f -printf '%P\n' ) \
  | awk -v re="$media_re" 'BEGIN{IGNORECASE=1} $0 ~ /^_next\// || $0 !~ re' \
  | sort > "$SMALL_LIST"

# media to upload = public/ media files changed since BASE (added/modified/
# renamed-to), mapped public/X -> X (which is their path in out/).
git diff --name-only --diff-filter=d "${BASE}..HEAD" -- 'public/**' 2>/dev/null \
  | grep -iE "$media_re" \
  | sed -E 's#^public/##' \
  | while IFS= read -r rel; do if [ -f "out/$rel" ]; then echo "$rel"; fi; done \
  | sort > "$MEDIA_LIST" || true

echo "Small (always) files: $(wc -l < "$SMALL_LIST")"
echo "Media (changed) files: $(wc -l < "$MEDIA_LIST")"

# ---------------------------------------------------------------------------
# 3. Helpers: upload one zip and extract it into the docroot; chunked packer.
# ---------------------------------------------------------------------------
push_zip() {              # $1 = absolute path to a .zip whose entries are
  local zip="$1"          #      relative to the docroot
  local name; name="$(basename "$zip")"
  echo "  -> uploading $name ($(du -h "$zip" | cut -f1))"
  local up
  up="$(curl -sS --fail-with-body -H "$AUTH" \
        -F "dir=${HOME_DIR}" -F "file-1=@${zip}" \
        "${API}/execute/Fileman/upload_files")"
  echo "$up" | jq -e '.status==1' >/dev/null 2>&1 \
    || { echo "  !! upload failed: $up"; exit 1; }
  echo "  -> extracting into ${DOCROOT_REL}/"
  local ex
  ex="$(curl -sS --fail-with-body -H "$AUTH" \
        "${API}/json-api/cpanel?cpanel_jsonapi_user=${CPANEL_USER}&cpanel_jsonapi_apiversion=2&cpanel_jsonapi_module=Fileman&cpanel_jsonapi_func=fileop&op=extract&sourcefiles=${name}&destfiles=${DOCROOT_REL}&overwrite=1&doubledecode=1")"
  # API2 error surfaces in .cpanelresult.error when something goes wrong.
  if echo "$ex" | jq -e '.cpanelresult.error // empty' >/dev/null 2>&1; then
    echo "  !! extract error: $(echo "$ex" | jq -r '.cpanelresult.error')"; exit 1
  fi
  # best-effort cleanup of the uploaded archive
  curl -sS -H "$AUTH" \
    "${API}/json-api/cpanel?cpanel_jsonapi_user=${CPANEL_USER}&cpanel_jsonapi_apiversion=2&cpanel_jsonapi_module=Fileman&cpanel_jsonapi_func=fileop&op=unlink&sourcefiles=${name}&destfiles=${name}" >/dev/null 2>&1 || true
}

deploy_list() {          # $1 = file listing (relative to out/), $2 = label
  local list="$1" label="$2"
  [ -s "$list" ] || { echo "== $label: nothing to upload =="; return 0; }
  echo "== $label: packing & uploading =="
  local idx=0 cur=0 chunk="$WORK/${label}_chunk.txt"
  : > "$chunk"
  flush() {
    [ -s "$chunk" ] || return 0
    local zip="$WORK/${label}_${GITHUB_RUN_ID:-0}_${idx}.zip"
    ( cd out && zip -q -X "$zip" -@ < "$chunk" )
    push_zip "$zip"; rm -f "$zip"
    idx=$((idx+1)); : > "$chunk"; cur=0
  }
  while IFS= read -r rel; do
    local sz; sz="$(stat -c%s "out/$rel" 2>/dev/null || echo 0)"
    if [ "$cur" -gt 0 ] && [ $((cur + sz)) -gt "$CHUNK_CAP" ]; then flush; fi
    printf '%s\n' "$rel" >> "$chunk"; cur=$((cur + sz))
  done < "$list"
  flush
  echo "== $label: done ($idx chunk(s)) =="
}

# ---------------------------------------------------------------------------
# 4. Deploy: small set every run, media delta only.
# ---------------------------------------------------------------------------
deploy_list "$SMALL_LIST" "small"
deploy_list "$MEDIA_LIST" "media"

echo "== Deploy complete =="
rm -rf "$WORK"
