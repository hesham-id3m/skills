#!/usr/bin/env bash
# Frontend Studio v10.2 complete (12 core skills + 2 API addons)
set -Eeuo pipefail
SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-$HOME/frontend-studio-v10}"
if [[ "$TARGET" == "--help" || "$TARGET" == "-h" ]]; then
  printf 'Usage: bash install.sh [TARGET_WORKSPACE]\nInstall 14 skills, workspace rules, tools, examples, original API contract.\n'
  exit 0
fi
for relative in CLAUDE.md .claude/skills/project-generator/SKILL.md .claude/skills/api-contract-frontend/SKILL.md .claude/skills/api-documentation-reader/SKILL.md docs/contracts/university-library/API_DOCUMENTATION.md tools/verify.sh; do
  if [[ ! -f "$SOURCE/$relative" ]]; then
    printf 'Incomplete package: %s\n' "$relative" >&2; exit 2
  fi
done
# Validate API documentation byte-for-byte using the included SHA256 before changes.
(cd "$SOURCE" && sha256sum -c API_DOCUMENTATION_SHA256.txt >/dev/null) || { echo 'API documentation checksum mismatch' >&2; exit 2; }
mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"
if [[ "$SOURCE" == "$TARGET" || "$TARGET" == "$SOURCE/"* || "$SOURCE" == "$TARGET/"* ]]; then
 echo 'ERROR: extract the installer outside the workspace target' >&2; exit 2
fi
DOC_REL='docs/contracts/university-library/API_DOCUMENTATION.md'
if [[ -e "$TARGET/$DOC_REL" ]] && ! cmp -s "$SOURCE/$DOC_REL" "$TARGET/$DOC_REL"; then
  echo "Existing API documentation differs; refusing to overwrite: $TARGET/$DOC_REL" >&2
  echo 'Please reconcile the contract versions manually, then install again.' >&2
  exit 2
fi
STAMP="$(date +%Y%m%d-%H%M%S)-$$"
BACKUP="$TARGET/.frontend-studio-backups/$STAMP"
BACKED=0
backup() {
  local relative="$1"
  if [[ -e "$TARGET/$relative" || -L "$TARGET/$relative" ]]; then
    mkdir -p "$BACKUP/$(dirname "$relative")"
    cp -a "$TARGET/$relative" "$BACKUP/$relative"
    BACKED=1
  fi
}
backup CLAUDE.md
cp -f "$SOURCE/CLAUDE.md" "$TARGET/CLAUDE.md"
mkdir -p "$TARGET/.claude/skills" "$TARGET/tools" "$TARGET/evals" "$TARGET/templates" "$(dirname "$TARGET/$DOC_REL")"
for skill in "$SOURCE"/.claude/skills/*; do
  [[ -d "$skill" ]] || continue
  name="$(basename "$skill")"
  backup ".claude/skills/$name"
  rm -rf -- "$TARGET/.claude/skills/$name"
  cp -a "$skill" "$TARGET/.claude/skills/$name"
done
for relative in tools/assets.py tools/verify.sh evals/cases.json evals/SCORECARD.md; do
  backup "$relative"
  mkdir -p "$TARGET/$(dirname "$relative")"
  cp -f "$SOURCE/$relative" "$TARGET/$relative"
done
for name in authenticated-app-kit dashboard-ui-kit; do
  backup "templates/$name"
  rm -rf -- "$TARGET/templates/$name"
  cp -a "$SOURCE/templates/$name" "$TARGET/templates/$name"
done
# Preserve an identical already-existing API contract.
if [[ ! -f "$TARGET/$DOC_REL" ]]; then cp -f "$SOURCE/$DOC_REL" "$TARGET/$DOC_REL"; fi
chmod +x "$TARGET/tools/assets.py" "$TARGET/tools/verify.sh"
count="$(find "$TARGET/.claude/skills" -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l | tr -d ' ')"
printf 'Frontend Studio v10.2 + API installed in: %s\n' "$TARGET"
printf 'Native skills installed/present: %s (expected 14 in fresh workspace)\n' "$count"
printf 'University Library API doc: %s\n' "$TARGET/$DOC_REL"
printf 'Verified contract SHA256: '; sha256sum "$TARGET/$DOC_REL" | cut -d' ' -f1
printf 'Existing Vue/Vuetify starter: '; [[ -f "$TARGET/templates/vue-vuetify-starter/package.json" ]] && echo PRESENT || echo 'ABSENT (not part of this skills package)'
printf 'Existing projects: not touched\n'
if [[ "$BACKED" == 1 ]]; then printf 'Backups: %s\n' "$BACKUP"; fi
printf 'Next: cd "%s" && claude\n' "$TARGET"
