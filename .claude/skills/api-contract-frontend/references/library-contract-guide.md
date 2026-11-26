# University Library — screen to API contract guide

Full and final authority: `docs/contracts/university-library/API_DOCUMENTATION.md`.
Backend: Laravel API under `/api/v1`. Login uses Passport bearer token; user roles/permissions use Spatie.
No public registration. There are only three relevant roles seeded: Admin, Librarian, Student; actual permissions can change at runtime, so API responses decide.

## Routes and workflows

| Audience | Main screens | Service endpoints | Notes |
| --- | --- | --- | --- |
| Everyone | Sign in | `POST /auth/login` | No signup/reset API; after login read role names from `data.user.roles` |
| Authenticated | Profile/session | `GET /auth/me`, `POST /auth/logout` | Profile is read-only through documented auth endpoint |
| Student | Book catalog, book detail | `GET /books`, `GET /books/{uuid}`, `GET /categories` | No book/category mutation |
| Student | Borrow books, My requests | `POST /borrowings` multipart, `GET /borrowings/my` | Must send `books[]` and `id_card`; validate 2MB jpg/jpeg/png/pdf |
| Librarian | Borrowing queue, detail | `GET /borrowings`, `GET /borrowings/{uuid}` | Filter `status`, `student`, `overdue`; server pagination |
| Librarian | Approve/reject/return | `POST /borrowings/{uuid}/approve`, `/reject`, `/return` | Only approved state transitions; confirm and refresh data |
| Admin | Manage books/categories | CRUD `/books`, `/categories` | Categories deletion can cascade to books |
| Admin | Manage users | CRUD `/users`, `/users/bulk-delete` | Creating user requires name/email/password/role; no self-delete or active borrower delete |
| Admin | Manage roles/permissions | CRUD `/roles`, `GET /roles/permissions`, role permission/user assign/remove | Admin role protected, do not remove Admin privileges |
| Admin | Borrowings management | list/detail/approve/reject/return/delete/bulk-delete | Active borrowing cannot be deleted before return |

## Data mapping guardrails

- HTTP envelopes are `{message, status_code, data, pagination?}` for ALL JSON responses; `data` is not necessarily an object (may be list/[]).
- Login: `data.access_token`, `data.user.roles`; auth profile uses `UserShowResource`.
- List items are slimmer than detail items. A book list lacks detail `description` and `updated_at`. A borrowing list lacks private ID-card path.
- Library does not offer a download endpoint for uploaded ID cards. Never turn private `id_card.path` into public URL or link; display only safe metadata if needed.
- Borrowing states are `pending`, `borrowed`, `returned`, `rejected`; `is_overdue` derives from `borrowed` and the due date.
- Approve: only pending, decrements available copies and sets due date now+14d. Return: only borrowed, restores copies.
- The student `borrowings-show` permission discrepancy exists in docs: seeded Student lacks it, whereas ownership scope describes behavior for users lacking `borrowings-list`. Treat `/borrowings/my` as reliable and use runtime 403 observations before showing detail actions.
- `roles-list-permissions` is Admin-only; do not fabricate a public permissions endpoint. A frontend role matrix is only an initial visibility policy; server `403` is authoritative.
- Avoid per-user/staff analytics unless composed from real query totals. No official aggregated dashboard endpoints appear in this contract.

## API response/status

- 401: expired/missing token -> clear current token in memory and redirect to sign-in.
- 403: show access denied.
- 404: show not found; may conceal other users' records.
- 422: show field `data.errors` and/or localized business error `message`.
- 500: show safe retry, never display stack traces.
- When server is offline, don't swap mock data into a view labeled "live".
