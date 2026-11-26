# API-integrated Frontend Acceptance Checks

## Offline / static (always available)

- Build: `npm run build` passes (TypeScript + Vite), and paths respect `VITE_API_ORIGIN` + `/api/v1` once.
- Router/UX: no Register, Forgot Password, invented order/payment or book cover API; all routes exist; Admin/Staff/Student menus reflect documented capabilities.
- Design: calm, structured, compact dashboard; meaningful KPI cards with source labeling; polished filters/tables/pagination/actions/confirmation dialogs; Arabic/English, RTL/LTR, light/dark, 320px and desktop.
- States: unauthenticated guard, unauthorized 403, unknown 404, validation 422, offline network, loading/empty, server 500; expired login token clears session.
- Security: token not committed/logged, private ID card files not leaked, no mutating endpoint called by automated smoke checks against unspecified production.

## Live checks — ONLY when the local/test backend is running and test accounts are supplied

- Login with valid test account returns `data.access_token`; `GET /auth/me` works. Bad credentials show server 422; logout revokes token.
- Student: book list/read and category filters; submit valid multi-book + jpg/png/pdf ID (max 2MB); verify `pending` in `/borrowings/my`; expect 422 with missing file, invalid extensions/size and unavailable books. Student cannot access Admin actions.
- Librarian: pending borrowing list, approve => `borrowed`; return => `returned`; reject another pending => `rejected`. Verify invalid transitions return 422 and UI refreshes after mutation.
- Admin: users listing/filter/pagination, user create with initial role; roles listing, permissions assignment; book/category CRUD; test Admin-protection errors and delete guards ONLY in a disposable test database.
- Cross-role: deliberately attempt unauthorized endpoints with designated test accounts and assert 403; UI route restrictions should reflect responses.
- Runtime conflicts: specifically check Student `GET /borrowings/{uuid}` vs seeded `borrowings-show` policy; document the observed status rather than overriding server rules.
- Browser: tests for EN/AR, RTL/LTR, dark/light, desktop/mobile, empty/loading/errors, form validation, upload, modal actions, pagination.

Document outcome in a coverage table: `verified live`, `verified local`, `not run`, `blocked`; never upgrade a static check to "API tested".
