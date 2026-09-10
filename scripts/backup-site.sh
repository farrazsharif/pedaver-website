#!/usr/bin/env bash
#
# Pedaver website backup — THE RULE (added 2026-09-10 after a near-loss of the
# live site). Keeps exactly TWO rolling copies of the built static site on this
# Mac:
#
#   ~/Documents/Pedaver_Website_Backups/current    <- this run
#   ~/Documents/Pedaver_Website_Backups/previous   <- the run before it
#
# Each copy is a full, directly re-deployable snapshot of what the deploy
# uploads (the contents of out/, WITH .htaccess), plus a MANIFEST.txt that
# records exactly what it is: date, git branch/commit, clean-or-dirty, file
# count, total size, and SHA-256s of the key files and every book-chapter PDF.
#
# Disk-friendly: the new snapshot is hard-linked against the previous one
# (rsync --link-dest), so unchanged files cost no extra space — only what
# actually changed since the last backup is written.
#
# WHEN THIS RUNS
#   * automatically before every push to `main` (the .githooks/pre-push hook)
#   * automatically once a day (launchd: com.pedaver.website-backup)
#   * any time, by hand:  scripts/backup-site.sh
#
# Usage:
#   scripts/backup-site.sh              # npm run build, then snapshot + rotate
#   scripts/backup-site.sh --no-build   # snapshot the existing out/ as-is
#
# Exits non-zero if the build fails or out/ is empty, so the pre-push hook
# refuses to deploy something that has no backup behind it.
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_ROOT="${PEDAVER_BACKUP_ROOT:-$HOME/Documents/Pedaver_Website_Backups}"
CURRENT="$BACKUP_ROOT/current"
PREVIOUS="$BACKUP_ROOT/previous"
STAGING="$BACKUP_ROOT/.staging"
LOG="$BACKUP_ROOT/backup.log"

DO_BUILD=1
[ "${1:-}" = "--no-build" ] && DO_BUILD=0

mkdir -p "$BACKUP_ROOT"
ts="$(date '+%Y-%m-%d %H:%M:%S %z')"
log() { echo "[$ts] $*" | tee -a "$LOG" ; }

log "backup-site: start (build=$DO_BUILD, root=$BACKUP_ROOT)"
cd "$REPO_ROOT"

# --- disk headroom check (this Mac has run critically low before) -----------
avail_kb="$(df -k "$BACKUP_ROOT" | awk 'NR==2 {print $4}')"
if [ "${avail_kb:-0}" -lt 3145728 ]; then   # < 3 GiB free
  log "WARNING: only $((avail_kb/1024)) MiB free on the backup volume. Free up space."
fi

# --- build ----------------------------------------------------------------
if [ "$DO_BUILD" = 1 ]; then
  log "building (npm run build)…"
  if ! npm run build >>"$LOG" 2>&1; then
    log "ERROR: npm run build failed — see $LOG. No snapshot taken."
    exit 1
  fi
fi

if [ ! -d "$REPO_ROOT/out" ] || [ -z "$(ls -A "$REPO_ROOT/out" 2>/dev/null || true)" ]; then
  log "ERROR: out/ is missing or empty — nothing to back up."
  exit 1
fi

# match the deploy exactly: .htaccess sits at the top of what ships
cp "$REPO_ROOT/docs/htaccess.txt" "$REPO_ROOT/out/.htaccess"

# --- snapshot into staging, hard-linked against the current copy ----------
rm -rf "$STAGING"
mkdir -p "$STAGING/site"
if [ -d "$CURRENT/site" ]; then
  rsync -a --delete --link-dest="$CURRENT/site" "$REPO_ROOT/out/" "$STAGING/site/"
else
  rsync -a --delete "$REPO_ROOT/out/" "$STAGING/site/"
fi

# --- manifest -----------------------------------------------------------
commit="$(git rev-parse HEAD 2>/dev/null || echo '(no git)')"
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
subject="$(git log -1 --pretty=%s 2>/dev/null || true)"
dirty="clean"; git diff --quiet 2>/dev/null || dirty="DIRTY — uncommitted changes present"
files="$(find "$STAGING/site" -type f | wc -l | tr -d ' ')"
size="$(du -sh "$STAGING/site" | cut -f1)"
{
  echo "Pedaver website snapshot"
  echo "================================================================"
  echo "taken        : $ts"
  echo "host         : $(hostname)"
  echo "git branch   : $branch"
  echo "git commit   : $commit"
  echo "git subject  : $subject"
  echo "git state    : $dirty"
  echo "files        : $files"
  echo "total size   : $size"
  echo
  echo "To restore this exact site: upload the CONTENTS of ./site/ into the"
  echo "cPanel document root (public_html), overwriting. .htaccess is included."
  echo
  echo "SHA-256 — key files:"
  for f in index.html sitemap.xml .htaccess robots.txt \
           books/natural-ecosystem-science/index.html ; do
    [ -f "$STAGING/site/$f" ] && printf '  %s  %s\n' \
      "$(shasum -a 256 "$STAGING/site/$f" | cut -d' ' -f1)" "$f"
  done
  echo
  echo "SHA-256 — every book chapter PDF:"
  find "$STAGING/site/books" -name '*.pdf' 2>/dev/null | sort | while read -r p; do
    printf '  %s  %s\n' "$(shasum -a 256 "$p" | cut -d' ' -f1)" "${p#"$STAGING"/site/}"
  done
} > "$STAGING/MANIFEST.txt"

# --- rotate: previous <- current ; current <- staging -------------------
rm -rf "$PREVIOUS"
[ -d "$CURRENT" ] && mv "$CURRENT" "$PREVIOUS"
mv "$STAGING" "$CURRENT"

log "backup-site: done — $files files, $size"
log "  current : $CURRENT   ($branch @ ${commit:0:9}, $dirty)"
[ -d "$PREVIOUS" ] && log "  previous: $PREVIOUS"
