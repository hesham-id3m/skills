---
name: api-contract-frontend
description: Build or update a Vue 3 TypeScript Vuetify frontend using an actual backend API contract, documentation Markdown, or OpenAPI specification. MUST use for new projects with API_DOCUMENTATION.md, Swagger, OpenAPI, REST endpoints, backend integration, authenticated dashboards, role-permission routes, or user requests to use an uploaded API document. Read the referenced API contract rather than inventing endpoints.
---

# Contract-first frontend integration

## Trigger & source of truth

For a new UI generated from API documentation, load this skill in addition to `project-generator`, `design-director`, `ui-system`, `authenticated-app`, `data-ui`, and `admin-console` as relevant. For the university library example, the authoritative contract is `docs/contracts/university-library/API_DOCUMENTATION.md` relative to the workspace root. **Read its section index first, then retrieve specific sections on demand**; do not dump the entire documentation repeatedly into the conversation.

The user brief and documented backend contracts determine functionality; never let an old demo template invent missing endpoints. If an accessible runtime API disagrees with the document, record the discrepancy rather than silently pretending success. Existing backend source/code changes require explicit scope from the user.

## Contract discovery gate: BEFORE implementing any pages

1. Locate the user-provided contract file or workspace docs; read overview, authentication, roles/permissions, module index and error conventions. Summarize a brief endpoint matrix: method, exact path, auth, role/permission, query/body, result shape, failure conditions.
2. Read per-module details only for screens under construction. Prefer local `GET /docs/api-docs.json` for machine-readable validation when the backend is running, but the supplied file remains the source unless drift is confirmed. Do not assume a running server merely because the docs say `http://localhost:8000`.
3. Make a route matrix with a role and required permission per page/action; derive UI visibility from documented role capabilities, but treat API `401/403` as final authority. Do not confuse frontend-hidden actions with authorization.
4. Distinguish `LIVE API CONNECTED`, `BUILD ONLY`, and `DEMO/OFFLINE` in final verification; never claim live API calls occurred if backend was not reachable.

## API client architecture

- Reuse the existing Vite/Vue/TypeScript/Vuetify starter; **create a new project folder**, never change a previously finished app unless asked explicitly.
- Set `VITE_API_ORIGIN` in `.env.example` (default local origin `http://localhost:8000`) and add the `/api/v1` prefix once in a centralized client; avoid duplicated paths and hardcoded environment URLs across components.
- **Resolve runtime configuration from supplied backend artifacts:** before declaring integration ready, inspect any supplied backend source/config, API documentation, OpenAPI/Swagger server URL, deployment config, or backend `.env.example`. Derive the browser-reachable origin and documented API prefix from that evidence, then create/update the frontend project's `.env` with only the non-secret `VITE_API_ORIGIN` value. Preserve `.env.example` as a safe template. Never copy backend secrets or use database/server-only variables in a Vite client. If the backend artifact does not expose a usable origin, leave a clearly marked placeholder and report the exact missing value instead of inventing one.
- Keep DEMO/OFFLINE preview as an explicit, separate mode for reviewing pages before the backend is connected. It is expected that Network is empty in that mode. Confirm that real login and a representative CRUD action bypass the demo handler and reach `${VITE_API_ORIGIN}/api/v1/...` after preview is exited.
- Typed API service functions per module (`auth`, `users`, `roles`, `categories`, `books`, `borrowings`); typed response wrapper `{ message, status_code, data, pagination? }` and typed list/detail resource variants; do not assume show-only fields are in list payloads.
- Handle `401` by clearing the in-memory session and returning to sign-in; `403` with permission-denied UI; `404` with not-found UI; `422` by mapping `data.errors` to inputs and displaying business-rule `message`; `500` with retry support. Provide loading, empty, error and success states.
- Send `Accept: application/json`, `Accept-Language: ar|en`, and `Authorization: Bearer <token>` only after login. Never commit or log access tokens, admin credentials, ID cards or private user data. Prefer memory-only token storage unless user deliberately approves a security-reviewed persistence strategy; note that a memory-only session ends on full page reload. API tokens are not cookies; don't assume refresh-token endpoint exists.
- For `multipart/form-data`, let the browser set the boundary; use `FormData` with each book UUID as `books[]` and the file as `id_card`.
- For lists, bind server-provided pagination, filters, sorting and search; don't fake database persistence. `all=1` omits the pagination object.
- Do not create frontend signup/password reset when not documented. No fabricated statistics endpoints, photo URLs, server actions or permission-fetch endpoints.

## Role-specific UX

- Prefer a quiet, information-dense dashboard: 2–4 meaningful KPI cards based only on real aggregated/list pagination values, tidy Vuetify tables, meaningful status chips, filters, row action menus, and confirm dialogs for destructive actions. If totals are only counts of loaded records, label them as current-page counts, not global metrics.
- **Student**: book catalog (browse/read-only), request borrowing with multi-book selection and university ID card file, own borrowing history. Be careful: the seeded permission table omits `borrowings-show` for Student even though ownership scoping is documented for the show endpoint. Do not assume student can open the detail endpoint; use the My list fields or test runtime permissions and report any discrepancy.
- **Librarian**: book/catalog lookup and borrowing queue; approve/reject pending, confirm return of borrowed, with confirmation and informative 422 handling; no book editing or user management unless backend permissions permit.
- **Admin**: books/categories CRUD, users and roles/permissions management, all borrowings; respect Admin role protections and delete guards, never offer bulk destructive operations without explicit confirmation.
- Separate `/admin`, `/staff`, `/student` layouts or route groups where appropriate; after successful login use `data.user.roles`/`GET /auth/me` to choose default landing. Do not infer arbitrary single-role behavior if user can have multiple roles.
- Authenticated UI requires actual login: no fake authenticated preview when real backend is available. If API unavailable, show a clearly labeled non-auth demo preview **separately** without claiming persisted changes.

## Mandatory scope & safety

Read `references/library-contract-guide.md`, `references/acceptance-checks.md` when building the university library app. Maintain precise documented route/method/parameter usage. Don't use production endpoints for destructive acceptance tests; use a test server/dataset or secure explicit approval. Confirm CORS/proxy origin when browser cannot reach Laravel (avoid modifying backend blindly). Build and browser-test routes, RTL/LTR, dark/light, responsive, errors and upload.

## Required deliverables

1. Working independent Vue project; `.env.example` and README with backend start and CORS instructions (no secrets).
2. Clear API integration with typed services, session state, role-aware routes, loading/errors/validation.
3. Admin, Librarian and Student paths whose available actions match the documented contract.
4. `npm run build` and existing browser checks, with **honest live API verification status**.
5. `PROJECT_STATUS.md` noting the contract path, endpoint coverage, blockers and assumptions if work needs continuation.
