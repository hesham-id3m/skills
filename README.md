# Frontend Studio v10.2 — Complete Skills Bundle

هذه حزمة موحّدة من **آخر نسخة بنيناها**: v10.2 Dashboard & Admin (12 Native Claude Skills) + `api-contract-frontend` + `api-documentation-reader` (14 Skills total).

## Contents
- `.claude/skills/` — all 14 Native Claude Code skills and their reference files.
- `CLAUDE.md` — workspace contract with a mandatory **contract-first** API gate.
- `tools/` and `evals/` — existing media/verification and evaluation tools.
- `templates/authenticated-app-kit/` and `templates/dashboard-ui-kit/` — **examples**, not a standalone Vite starter.
- `docs/contracts/university-library/API_DOCUMENTATION.md` — original user-supplied contract copied **byte-for-byte**.
- `prompts/UNIVERSITY_LIBRARY_PROJECT.md` — example prompt from the API integration addon.

**Important:** `templates/vue-vuetify-starter/` is NOT included in this bundle, since it was created locally in your earlier workspace, not provided in the v10.2 package. Installer preserves it if already present. For a new workspace, copy your verified starter separately if it still exists; otherwise Claude may scaffold from scratch.

## Install on Ubuntu
Extract the zip into Downloads, then enter the extracted folder:

```bash
cd ~/Downloads/Frontend-Studio-v10.2-Complete
bash install.sh ~/Downloads/university-library-v2
```

Then run:

```bash
cd ~/Downloads/university-library-v2
find .claude/skills -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l
claude
```

Expected count: **14**. Folder `.claude` is hidden in Ubuntu; press **Ctrl+H** in file manager.

If your old verified Vue/Vuetify starter still exists at `~/frontend-studio-v10/templates/vue-vuetify-starter/`, you may copy it into the *new* workspace:

```bash
mkdir -p ~/Downloads/university-library-v2/templates/vue-vuetify-starter
rsync -a --exclude=node_modules --exclude=dist --exclude=.git \
  ~/frontend-studio-v10/templates/vue-vuetify-starter/ \
  ~/Downloads/university-library-v2/templates/vue-vuetify-starter/
```

## Key behavior for University Library
- Backend is **local on another computer** and is not necessarily reachable. Its documented `http://localhost:8000` refers to the machine running the Laravel server, **not automatically the browser/frontend machine**. Configure `VITE_API_ORIGIN` at deployment or when LAN access is available; for cross-device local testing also configure firewall, CORS and server bind address safely.
- Backend offline does **not** excuse demo-only services. Implement real frontend API code, mark live tests UNVERIFIED.
- All University Library accounts are admin-created; no public signup. All permissions and borrowing workflows are defined by the contract.
- The installer does **not** modify existing generated projects, run npm/Claude, connect to a server, or commit anything.
- Existing files replaced by this installer are backed up inside `.frontend-studio-backups/` in the target. It refuses to replace a differing existing `API_DOCUMENTATION.md`.

## Example prompt

```text
Create a NEW University Library frontend in a new maktaba-v2 folder.
Use api-contract-frontend and api-documentation-reader skills and follow
docs/contracts/university-library/API_DOCUMENTATION.md exactly.
The Laravel backend is currently local on another computer, not connected.
Implement the documented real API services and role-based UIs now; do not
substitute seed data. Keep the API origin configurable, run build and
contract-based tests, and report API endpoint coverage and unverified live
tests separately. Do not modify the docs, other projects, or commit/push.
```
