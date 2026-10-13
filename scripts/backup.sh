#!/usr/bin/env bash
#
# Cold, off-GitHub backup of the ENTIRE repo (full history + every PDF/image)
# into a single restorable .bundle file. The repo is the source of truth for
# the whole website, so this one file is a complete backup of everything.
#
# Run it periodically and keep the output somewhere OFF GitHub — an external
# drive, or a synced cloud folder (Google Drive/OneDrive/Dropbox). That way the
# site survives even a lost GitHub account.
#
# Usage:
#   bash scripts/backup.sh [DEST_DIR]
#     DEST_DIR defaults to ../pedaver-backups
#
# Restore later from any .bundle:
#   git clone pedaver-YYYY-MM-DD_HHMMSS.bundle restored-pedaver
#
set -euo pipefail

DEST="${1:-../pedaver-backups}"
cd "$(git rev-parse --show-toplevel)"
mkdir -p "$DEST"

# Pull the latest from all remotes first so the backup is current.
git fetch --all -q || echo "(warning: fetch failed — backing up local state)"

stamp="$(date +%Y-%m-%d_%H%M%S)"
out="$DEST/pedaver-${stamp}.bundle"

echo "Creating full backup bundle -> $out"
git bundle create "$out" --all

echo "Verifying..."
git bundle verify "$out" >/dev/null
echo "OK  ($(du -h "$out" | cut -f1))"
echo
echo "Keep this file OFF GitHub (external drive / cloud)."
echo "Restore with:  git clone \"$out\" restored-pedaver"
