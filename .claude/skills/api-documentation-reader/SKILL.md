---
name: api-documentation-reader
description: Read and strictly follow the existing University Library System API_DOCUMENTATION.md when building, modifying, testing or integrating a Vue frontend with its Laravel backend. Invoke for university library projects, real API integration, endpoints, authentication, roles, permissions, book catalog, or borrowings. The Markdown contract is the source of truth; never invent routes or overwrite the documentation.
---

# API Documentation Reader — University Library System

## Purpose and authoritative source

This skill is a **reader and contract-enforcement skill**, not a new backend specification or generator template. **Do not edit, regenerate, reformat, translate, or summarize over** the source file:

`docs/contracts/university-library/API_DOCUMENTATION.md`

The file is copied byte-for-byte from the user-provided documentation. Find it relative to the frontend studio workspace root, even when working on a child project. If not found, stop API implementation and report the missing path; do not substitute guesses or online examples. A user-provided newer contract takes precedence only when explicitly designated by the user.

## Activation and reading process

1. Use this skill whenever the user requests a new frontend for the **university-library-system**, or asks to integrate a UI with its existing API.
2. Locate and read the original Markdown **before** deciding pages, actions, requests, or TypeScript types.
3. To keep context small, first read the overview, authentication, roles matrix, module index, response conventions and error handling. Then read every relevant module's detailed endpoint contract in focused chunks. For full-library projects, inspect all modules; avoid dumping the entire document or huge command outputs repeatedly.
4. Make a concise internal **endpoint inventory** for each implemented page: HTTP method, exact route, auth requirement, permission, inputs, response fields, error states and supported sort/filter/pagination fields. Derive it *only* from the Markdown.
5. If documentation is contradictory or silent, flag the uncertainty; do not invent endpoints, roles, permissions, file URLs, or missing response properties.
6. Keep the source contract unchanged and keep implementation in the **new frontend project directory**. Never modify the backend or other projects unless specifically asked.

## Integration contract — follow the document exactly

- **Backend**: Laravel, API prefix `/api/v1`; make the host configurable through `VITE_API_ORIGIN` (the documented local default origin is `http://localhost:8000`; append `/api/v1` exactly once in the shared API client). Never embed the dev URL in multiple components.
- **Auth**: Laravel Passport bearer token from documented login; attach `Authorization: Bearer <token>` only after authentication; use `GET /api/v1/auth/me` to resolve user identity and roles; call documented logout to revoke the current token. Do not log credentials/tokens or assume refresh-token APIs that are not documented.
- **No public signup**: accounts are created by Admin via documented user-management routes. Do not invent signup, self-password-reset, or profile-editing APIs.
- **Authorization**: adapt navigation and UI actions to the documented role/permission matrix for Admin, Librarian and Student. Frontend checks improve UX but **server-side permissions remain authoritative**; handle `401` and `403` separately. Do not claim client-side route guards enforce access control.
- **Responses**: parse the documented JSON envelope `{message, status_code, data, pagination?}`, use only documented resource fields, and handle field errors from `data.errors` on `422`. Handle `404`, business-rule `422`, and `500` without inventing success states.
- **Lists**: use documented server-side `search`, filters, `sortBy`, `sortDirection`, `per_page`, and pagination only where those query parameters are supported. Do not fake server-side sorting or totals.
- **Borrowing**: respect the documented state transitions and permissions. Submitting a borrowing requires `multipart/form-data`, `books[]`, and a university `id_card` file (jpg/jpeg/png/pdf up to 2 MB); let the HTTP client set multipart boundaries. Do not decrement inventory on request submission: only approved requests change availability, as documented.
- **Role management**: use the documented role/permission assignment endpoints; respect immutable Admin protections. Do not use the Users update endpoint to change a user's role.
- **Private files**: the `id_card.path` is metadata for a private storage path, **not** proof of a public download endpoint. Do not construct publicly reachable ID-card URLs.

## Frontend output expectations

Build a coherent Vue 3 + TypeScript + Vuetify 3 application using existing Studio skills (project-generator, design-director, data-ui, dashboard, authenticated-app and admin-console) as relevant. The documentation governs **API facts and workflows**, while the design skills govern **visual presentation**. Reuse the workspace starter when present, but the document is not code to copy into components.

- Student: catalog and borrowing flow with ID-card upload, own requests and status detail when allowed by the backend permissions.
- Librarian: borrowing workflow using documented staff endpoints and available actions.
- Admin: documented user, role, category, book and borrowing management with search/filter/sort/pagination; show only actions with supported endpoints/permissions.
- Create one typed API client/service layer, shared response/error parsing, authorization-aware route/menu configuration, loading/empty/error states and consistent action dialogs.
- Keep actual API data distinct from **explicitly labeled DEMO mode** if the backend is unavailable. Never silently replace failed network calls with fake successful data.

## Verification and reporting

- Run TypeScript checks and production build from the **new project's root**. Use the existing browser verification tools where available.
- When backend is reachable, verify health/auth and representative GET operations safely; do not execute destructive writes against unknown or production data without explicit permission. Use authorized test credentials only when provided.
- Report an endpoint coverage table (implemented / not implemented / unverified) and flag any route or data requirement unsupported by the documentation.
- An accessible frontend and a successful build do **not** prove live API integration. Say clearly whether real requests were exercised.
- Never commit or push unless requested.
