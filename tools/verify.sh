#!/usr/bin/env bash
# Frontend Studio v10 — reusable, low-noise project verification.
set -Eeuo pipefail
if [[ "${1:-}" == "--help" || $# -lt 1 ]]; then
  cat <<'HELP'
Usage: bash tools/verify.sh PROJECT_PATH [--no-browser]
Runs available lint and build scripts, then runs the existing npm verify
script against a single preview server if installed. Leaves logs in
PROJECT_PATH/.quality-reports/ (not in the shared template).
Does not install dependencies, create a new browser harness, or claim
that visual screenshot inspection happened.
HELP
  [[ $# -ge 1 ]] || exit 2
  exit 0
fi
PROJECT="$(cd "$1" && pwd)"
NO_BROWSER="${2:-}"
if [[ "$NO_BROWSER" != "" && "$NO_BROWSER" != "--no-browser" ]]; then
  echo "Unknown option: $NO_BROWSER" >&2; exit 2
fi
if [[ ! -f "$PROJECT/package.json" ]]; then echo "ERROR: no package.json in $PROJECT" >&2; exit 2; fi
if [[ ! -d "$PROJECT/node_modules" ]]; then
  echo "ERROR: missing node_modules. Run npm ci (or npm install if no lockfile) in $PROJECT first." >&2; exit 2
fi
mkdir -p "$PROJECT/.quality-reports"
LOGDIR="$PROJECT/.quality-reports"
cd "$PROJECT"
# Query scripts without dumping entire package.json.
has_script() {
  node -e 'const p = require("./package.json"); process.exit(p.scripts && p.scripts[process.argv[1]] ? 0 : 1)' "$1"
}
run_step() {
  local title="$1"; shift
  echo "Running $title ..."
  if "$@" >"$LOGDIR/$title.log" 2>&1; then echo "PASS $title"; return 0;
  else echo "FAIL $title (tail below)" >&2; tail -n 24 "$LOGDIR/$title.log" >&2; return 1; fi
}
FAIL=0
if has_script lint; then run_step lint npm run lint || FAIL=1; else echo "SKIPPED lint (no npm script)"; fi
if has_script build; then run_step build npm run build || FAIL=1;
else echo "FAIL build (no npm script)" >&2; FAIL=1; fi
# Stop if production build failed. It cannot be considered browser-testable.
if (( FAIL != 0 )); then echo "Verification failed; see $LOGDIR" >&2; exit 1; fi
if [[ "$NO_BROWSER" == "--no-browser" ]]; then echo "SKIPPED browser (--no-browser)"; exit 0; fi
if ! has_script verify; then echo "SKIPPED browser (no npm run verify)"; exit 0; fi
if ! has_script preview; then echo "SKIPPED browser (no npm run preview)"; exit 0; fi
# Use existing template browser harness; no new generated test scripts.
echo "Starting preview at http://127.0.0.1:4173 ..."
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort > "$LOGDIR/preview.log" 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; wait "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT INT TERM
READY=0
for _ in {1..35}; do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then break; fi
  if node -e 'const s=require("net").connect(4173,"127.0.0.1");s.on("connect",()=>{s.destroy();process.exit(0)});s.on("error",()=>process.exit(1));setTimeout(()=>process.exit(1),700)' >/dev/null 2>&1; then READY=1; break; fi
  sleep 0.4
done
if (( READY == 0 )); then echo "FAIL preview did not start; see $LOGDIR/preview.log" >&2; exit 1; fi
# Existing verify.mjs may read its own documented URL/port. Keep defaults unless explicitly overridden by user.
run_step browser npm run verify || FAIL=1
if (( FAIL != 0 )); then echo "FAIL; logs: $LOGDIR" >&2; exit 1; fi
echo "PASS: all AVAILABLE automated checks. Human screenshot, design and image reviews NOT run by this script."
echo "Logs: $LOGDIR"
