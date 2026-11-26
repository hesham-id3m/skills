---
name: project-generator
description: Create a complete Vue 3 TypeScript Vuetify frontend from a short one-line business description. Use for every request to create/build/generate/start a new website, web app, online store, portfolio, SaaS UI, admin dashboard, or frontend project, even when skills are not mentioned.
---

# Autonomous Frontend Generation

## Mission
Convert one sentence into a complete, visually compelling, usable frontend. Work through design → proven infrastructure → implementation → evidence. Do not ask for minor defaults that can be safely inferred.

## Selective loading (no whole-library preload)
1. Read `.claude/skills/design-director/SKILL.md` and `.claude/skills/ui-system/SKILL.md` relative to workspace root.
2. Pick **one** archetype skill under `.claude/skills/`: `storefront/SKILL.md`, `business-site/SKILL.md`, or `dashboard/SKILL.md`. For SaaS choose the closest and customize.
3. **Post-login decision gate:** if the brief implies accounts, customer membership, sign-in, workspace, user dashboard, admin/intranet or an app people use after authenticating, read `.claude/skills/authenticated-app/SKILL.md` and only its relevant references. Public brochure sites do NOT get auth by default. For normal e-commerce where account UI is included, generate coherent account pages automatically.
4. **Data/UI decision gate:** for any KPI overview, account dashboard, inventory/orders table, CRUD screen, user list, activity table, modal or management view, read `.claude/skills/data-ui/SKILL.md` and the particular references needed; this is not limited to the `dashboard` archetype.
5. **Admin/permission decision gate:** when the brief requests admin panel, staff management, roles, permissions, approvals or privileged operations, read `.claude/skills/admin-console/SKILL.md` plus `authenticated-app` and `dashboard`. Do **not** invent admin management in every consumer storefront; in absence of an API create an explicitly labeled DEMO preview, not real privileged access.
6. For image-heavy sites read `.claude/skills/asset-pipeline/SKILL.md`; for all projects read `.claude/skills/visual-qa/SKILL.md` before final validation.
7. Read UI reference files only for components you implement or change. Do NOT read `skill-lab` for normal generation.


## API contract gate (required whenever documentation/backend is supplied)
- Before coding, read `.claude/skills/api-contract-frontend/SKILL.md`; for University Library also read `.claude/skills/api-documentation-reader/SKILL.md` and the exact `docs/contracts/university-library/API_DOCUMENTATION.md` file. A contract controls endpoints, models, roles, workflows and availability of signup/reset. Do not replace it with assumptions from demo UI kits.
- Derive an endpoint inventory and implement real typed HTTP services for all endpoints in requested scope. If full API coverage is requested, implement all documented endpoints and report each one's status; do not report build success as API coverage.
- If backend is on another computer/offline, still write API client, typed request/response models, Bearer auth, error handling and env configuration. Mark LIVE TESTING UNVERIFIED. Offline connectivity is not a reason to silently substitute in-memory seed/demo stores.
- When an API contract is in scope, prioritize contract-compliant UI, even if an existing Starter/demo kit includes fake flows. For University Library there is no public signup or reset endpoint, and borrowing uses multi-book `FormData` + mandatory `id_card`.
- Default to `VITE_API_ORIGIN` for host only (e.g. `http://localhost:8000`); append `/api/v1` once in a shared client. Never hardcode local host across components or claim a backend deployed.
- **Backend-to-env handoff:** when the user supplies backend source, an API file, an OpenAPI/Swagger document, a backend `.env` example, or a backend URL, inspect it before finalizing frontend configuration. Resolve the frontend's `VITE_API_ORIGIN` and API prefix from the supplied evidence and write the non-secret value into the new project's `.env` (also keep the same value documented in `.env.example` when appropriate). Never copy backend secrets, database credentials, signing keys, passwords, or tokens into the frontend. If the supplied files contain no usable HTTP origin, keep `.env` explicit and report exactly what value is still required; do not silently guess beyond the documented local default.
- Keep the explicit DEMO PREVIEW available for offline page review. Demo requests may bypass the network only while the user intentionally enters preview mode; normal login and normal app actions must use the resolved `.env` API origin. Label the two modes clearly and test that exiting preview restores real HTTP requests.
- Keep business-specific data in real services and optional *explicit* test fixtures; provide status matrices showing implemented services/UI, mocked-contract tests, and live backend tests separately.

## Execution phases
**A. Discover (short):** check workspace root, existing target folder, relevant endpoints and provided assets; inspect starter's `package.json`, router, brand/theme/i18n and verification entrypoints only. If target exists, do not overwrite it; continue only if user intended modification.

**B. Art direct (one short decision sheet):** define user, use case, sitemap, differentiated design idea, type/spacing/colors/imagery. Include the **post-login route matrix and destination**, a small overview data/actions specification and an admin role/capability matrix when applicable, if account flows exist: public routes vs authenticated vs preview-only, role and data source. Respect domain: grocery customer account ≠ SaaS workspace ≠ finance dashboard. Avoid a universal hero template.

**C. Initialize:** use `rsync -a --exclude=node_modules --exclude=dist --exclude=.git --exclude=coverage --exclude=test-results --exclude=playwright-report templates/vue-vuetify-starter/ <project>/` (if rsync unavailable use an equivalent exclude-aware copy). Verify target is newly created; install dependencies from the lockfile. The template is not final visual design.

**D. Build in three checkpoints:** (1) branding, Vuetify semantic theme, typed EN/AR dictionaries and app config; (2) functional app shell, actual route links, header/footer, mobile drawer; (3) domain screens, data flows, photos. At each checkpoint run the existing build script, fix now, and proceed. Never leave stale imported exports behind after changing brand/nav API.

**E. Assets:** one hero plus ~4–8 purposeful product/category images is a default budget, not a requirement to fetch a fixed number. Prefer genuine client-provided catalog or image assets. For sourced images obtain license/attribution, verify relevant crop and correct item. Avoid fetching 19 speculative images just because a category list is long.

**F. Functionality:** clickable links must resolve; cart/filter/search/sort must work locally if advertised. Auth without API must not report success. Use `data-ui` for real card/table/dialog patterns and `admin-console` for privileged routes only when in scope. If internal account pages are useful but APIs missing, provide a visibly labeled **separate demo preview** entry, not fake login/signup; implement working internal navigation, relevant views, back/refresh/exit and real empty/loading states. Connect real sessions and role rules only when APIs are provided. Use DEMO labels where data is provisional. No fake checkout/payment completion.

**G. Final gate:** run shared verifier and inspect results. Screenshot-review actual screenshots; if a gate cannot run say UNVERIFIED. When login, preview or private pages exist, test public→auth→internal/preview→exit/logout, direct unauthorized route, role visibility if known, profile/actions, overview card data validity, search/sort/filter, edit/confirm dialogs, role-based visibility when in scope, mobile RTL and dark. Summarize tradeoffs and blockers with evidence.

## Project output
Keep project locally runnable and standalone. If project resides under workspace root it can inherit workspace instructions for subsequent sessions. Do not duplicate the entire skills library per generated app. Add a small `PROJECT_STATUS.md` only if needed for failure recovery, never as substitute for implementation.
