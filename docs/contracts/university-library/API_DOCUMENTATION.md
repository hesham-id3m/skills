# university-library-system — API Documentation

Version: 1.0 — generated from the actual implementation (routes, controllers, form requests, resources, services, seeders).

## 1. Project API Overview

| Item | Value |
|------|-------|
| Project | university-library-system |
| API version | v1 |
| Base URL | `http://localhost:8000` (local `php artisan serve`; use the configured deployment URL in other environments) |
| API prefix | `/api/v1` |
| Authentication | Laravel Passport Bearer access tokens (`api` guard) |
| Authorization | Spatie Laravel Permission (role/permission based, `api` guard) |
| Response format | JSON — `{message, status_code, data, pagination?}` |
| Supported languages | `en` (default), `ar` via the `Accept-Language` header |
| Pagination defaults | `per_page` = 15, `sortBy` = `id`, `sortDirection` = `desc` |

A borrowing request is created by a student with one or more books and a mandatory university ID card upload; librarians approve/reject requests and confirm returns; the admin manages users, roles, books, and categories. All accounts are admin-created — there is no public registration.

### Response structure

Every response (success, validation failure, business error) uses the same envelope:

```json
{
  "message": "Books created successfully.",
  "status_code": 200,
  "data": {}
}
```

Paginated list responses additionally include `pagination`:

```json
{
  "message": "Books retrieved successfully.",
  "status_code": 200,
  "data": [ /* ... */ ],
  "pagination": {
    "path": "http://localhost:8000/api/v1/books",
    "per_page": 15,
    "current_page": 1,
    "next_page_url": "http://localhost:8000/api/v1/books?page=2",
    "prev_page_url": null,
    "total": 42,
    "last_page": 3
  }
}
```

Appending `all=1` to a list request omits the `pagination` block. Note: the effective page size is `per_page`; the legacy `paginate` query parameter is honored as a fallback by `Helpers::getPagination()` when `per_page` is absent.

## 2. Authentication

- Mechanism: Laravel Passport (OAuth2 personal access tokens), guard `api`.
- Token type: Bearer access token.
- Obtaining a token: `POST /api/v1/auth/login` with email/password → `data.access_token`.
- Sending the token: `Authorization: Bearer <access_token>` header on every protected request.
- Token lifetime/revocation: `POST /api/v1/auth/logout` revokes the token used for the current request.
- Public endpoints (no authentication): `POST /api/v1/auth/login`, `GET /api/v1/documentation`, Swagger UI (`/api/documentation`).
- No credentials, secrets, or tokens are hardcoded anywhere in this project or this document; seeded credentials are environment-configurable (`ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD`).

## 3. Permissions Overview

### Naming convention

`{module}-{action}` in kebab-case (e.g. `borrowings-bulk-delete`). 38 permissions are seeded by `RolesAndPermissionsSeeder`. Every protected endpoint is guarded by permission middleware (`permission:{name}`) on the `api` guard. Requests without the required permission receive `403`.

### Role → permission matrix (as seeded)

| Permission group | Admin | Librarian | Student |
|---|---|---|---|
| `users-*` (6: list, show, create, update, delete, bulk-delete) | ✓ | — | — |
| `roles-list/show/create/update/delete/bulk-delete` | ✓ | — | — |
| `roles-list-permissions`, `roles-assign-permissions`, `roles-remove-permissions`, `roles-assign-users`, `roles-remove-users` | ✓ | — | — |
| `categories-list/show` | ✓ | ✓ | ✓ |
| `categories-create/update/delete/bulk-delete` | ✓ | — | — |
| `books-list/show` | ✓ | ✓ | ✓ |
| `books-create/update/delete/bulk-delete` | ✓ | — | — |
| `borrowings-list/show/approve/reject/return` | ✓ | ✓ | — |
| `borrowings-create` (submit request + ID card) | ✓ | — | ✓ |
| `borrowings-my` (own requests listing) | ✓ | — | ✓ |
| `borrowings-delete/bulk-delete` | ✓ | — | — |

The `Admin` role is always synced with every permission and is protected: it cannot be renamed, deleted, or stripped of permissions, and it cannot be removed from a user. Permission changes clear the Spatie permission cache immediately.

### Ownership scoping

`GET /api/v1/borrowings/{uuid}` requires `borrowings-show`, but users who do **not** hold `borrowings-list` (i.e. students) can only retrieve their own borrowing records; a foreign UUID yields 404.

## 4. Modules Index

| Module | Purpose | Endpoints | Resources | Related modules |
|---|---|---|---|---|
| Authentication | Login, logout, profile | 3 | UserShowResource | Users, Roles (roles on profile) |
| Documentation | Public markdown API docs | 1 | — (serves file) | — |
| Users | Admin-created accounts | 6 (CRUD + bulk) | UserList/Show | Roles (initial role), Borrowings (delete guard) |
| Roles & Permissions | Roles CRUD, permission catalog, assignments | 11 | RoleList/Show, PermissionList/Show | Users |
| Categories | Book categories | 6 (CRUD + bulk) | CategoryList/Show | Books |
| Books | Library catalog | 6 (CRUD + bulk) | BookList/Show | Categories, Borrowings |
| Borrowings | Borrowing requests, approval flow, returns | 9 | BorrowingList/Show | Users (student), Books, Files (ID card) |

## 5. Module Documentation

### 5.1 Authentication module

#### 5.1.1 Login

- **Action:** Login — `POST /api/v1/auth/login`
- **Auth:** Public (no token required)
- **Permission:** none
- **Description:** Authenticates by email/password and issues a Passport access token.

**Request headers:** `Accept: application/json`, `Content-Type: application/json`. Optional `Accept-Language`.

**Request body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `email` | string | required | `string`, `email` |
| `password` | string | required | `string` |

```json
{ "email": "admin@example.local", "password": "secret1234" }
```

**Success — 200**

```json
{
  "message": "User logged in successfully.",
  "status_code": 200,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
    "token_type": "Bearer",
    "user": {
      "uuid": "5f0b...",
      "name": "Admin",
      "email": "admin@example.local",
      "roles": ["Admin"],
      "email_verified_at": null,
      "created_at": "2026-01-01T00:00:00.000000Z",
      "updated_at": "2026-01-01T00:00:00.000000Z"
    }
  }
}
```

**Errors**

- `422` — invalid credentials (`data.errors` from validation when fields missing; wrong credentials return the message `These credentials do not match our records.`).

```json
{ "message": "These credentials do not match our records.", "status_code": 422, "data": {} }
```

- `422` — validation failure (standard Laravel errors rendered in the approved envelope, `data.errors` keyed by field).
- `500` — token issuance failure: `"Unexpected error occurred."`

**Business workflow:** looks up the user by email, verifies the password hash, creates a Passport personal access token named `API Token` for the `api` guard, and returns the plain-text token once (it cannot be retrieved again). No transaction needed (no business tables written).

#### 5.1.2 Logout

- **Action:** Logout — `POST /api/v1/auth/logout`
- **Auth:** required (`auth:api`)
- **Permission:** none (any authenticated user)
- **Body:** none

**Success — 200:** `{"message": "User logged out successfully.", "status_code": 200, "data": []}`

**Errors:** `401` unauthenticated; `500` server error.

**Workflow:** revokes the OAuth access token row used by the current request; the token stops working immediately.

#### 5.1.3 Profile (Me)

- **Action:** Me — `GET /api/v1/auth/me`
- **Auth:** required
- **Permission:** none

**Success — 200:** message `User profile retrieved successfully.`, `data` = UserShowResource of the authenticated user (with role names).

**Errors:** `401` unauthenticated; `500` server error.

### 5.2 Documentation endpoint

- **Action:** Show API documentation — `GET /api/v1/documentation`
- **Auth:** Public. **Permission:** none.
- **Description:** Serves `docs/API_DOCUMENTATION.md` (this file) as the response payload so frontend/mobile clients can read the API contract without authentication.
- **Success — 200:** the markdown content. **Errors:** `404` when the file is missing; `500` server error.

### 5.3 Users module

All endpoints require `Authorization: Bearer`. Standard headers for JSON requests: `Accept: application/json`, `Content-Type: application/json`.

#### 5.3.1 List users

- `GET /api/v1/users` — permission `users-list`.
- **Query parameters**

| Parameter | Type | Required | Default | Allowed | Description |
|---|---|---|---|---|---|
| `sortBy` | string | no | `id` | `id, name, email, created_at` | Sort column (unknown values fall back to `id`) |
| `sortDirection` | string | no | `desc` | `asc, desc` | Sort direction |
| `per_page` | integer | no | `15` | ≥1 | Page size |
| `role` | string | no | — | existing role name | Only users having this role |
| `search` | string | no | — | — | LIKE match on name or email |

- **Success — 200:** message `Users retrieved successfully.`; `data` = array of **UserListResource**; `pagination` block included.

```json
{
  "message": "Users retrieved successfully.",
  "status_code": 200,
  "data": [
    {
      "uuid": "9c2d...",
      "name": "Sara Student",
      "email": "sara@example.local",
      "roles": ["Student"],
      "created_at": "2026-01-05T10:00:00.000000Z"
    }
  ],
  "pagination": { "path": "…/api/v1/users", "per_page": 15, "current_page": 1, "next_page_url": null, "prev_page_url": null, "total": 1, "last_page": 1 }
}
```

- **Errors:** `401` unauthenticated, `403` missing permission, `500` server error.

#### 5.3.2 Create user

- `POST /api/v1/users` — permission `users-create`.
- **Body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | string | required | `max:255` |
| `email` | string | required | `email`, `max:255`, unique in `users.email` |
| `password` | string | required | `min:8` (hashed by the model cast) |
| `role` | string | required | must exist in `roles.name` |

```json
{ "name": "Omar Librarian", "email": "omar@example.local", "password": "secret1234", "role": "Librarian" }
```

- **Success — 200:** message `Users created successfully.`, `data` = UserShowResource.
- **Errors:** `422` validation (duplicate email, unknown role, weak password); `401/403/500` as above.
- **Workflow:** inside `DB::transaction` the account row is created and the requested role assigned (`assignRole`). There is no public registration — accounts exist only through this endpoint.

#### 5.3.3 Show user

- `GET /api/v1/users/{uuid}` — permission `users-show`.
- **Path param:** `uuid` (string, required) — looked up in `users.uuid`; unknown → 404.
- **Success — 200:** message `Users retrieved successfully.`, `data` = UserShowResource (uuid, name, email, roles, email_verified_at, created_at, updated_at).
- **Errors:** `404` `{ "message": "The requested item was not found.", "status_code": 404, "data": {} }`.

#### 5.3.4 Update user

- `PUT /api/v1/users/{uuid}` — permission `users-update`.
- **Body (all optional, at least one typical):**

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | string | sometimes | `max:255` |
| `email` | string | sometimes | `email`, `max:255`, unique ignoring the addressed user |
| `password` | string | sometimes | `min:8` |

- **Success — 200:** `Users updated successfully.` + UserShowResource.
- **Errors:** `422` validation; `404` unknown uuid.
- **Workflow:** role changes are intentionally not part of this endpoint — use the Roles module assign/remove endpoints (§5.4.9–5.4.10).

#### 5.3.5 Delete user

- `DELETE /api/v1/users/{uuid}` — permission `users-delete`.
- **Success — 200:** `Users deleted successfully.`, `data: []`.
- **Errors:** `404` unknown uuid; `422` business guards:

```json
{ "message": "You cannot delete your own account.", "status_code": 422, "data": {} }
```
```json
{ "message": "This user has pending or active borrowing requests and cannot be deleted.", "status_code": 422, "data": {} }
```

- **Workflow:** transactional delete with two guards — an admin cannot delete their own account, and a user with `pending`/`borrowed` borrowing requests cannot be deleted (would orphan active loans). Deleting a user cascades to their borrowing rows and ID card rows at the DB level (ON DELETE CASCADE); note that stored ID card *files* of such borrowings are not swept by this endpoint — deleting borrowing records through the Borrowings module is the path that removes files.

#### 5.3.6 Bulk delete users

- `DELETE /api/v1/users/bulk-delete` — permission `users-bulk-delete`.
- **Body:** `{"uuids": ["<uuid>", "..."]}` — array, required.
- **Success — 200:** `Users deleted successfully.`, `data: []`.
- **Errors:** `404` if **any** uuid does not exist (all-or-nothing, nothing deleted); `422` if any target fails a deletion guard.
- **Workflow:** single transaction; count of found users must match the unique uuids supplied, every user passes the guards, then all are deleted.

### 5.4 Roles & Permissions module

#### 5.4.1 List roles

- `GET /api/v1/roles` — permission `roles-list`.
- **Query:** `sortBy` (`id, name, created_at`), `sortDirection`, `per_page`, `search` (LIKE on role name).
- **Success — 200:** `Roles retrieved successfully.`; `data` = **RoleListResource** items:

```json
{ "uuid": "1a2b...", "name": "Librarian", "users_count": 2, "created_at": "2026-01-01T00:00:00.000000Z" }
```

(`users_count` present because the listing always counts users.)

#### 5.4.2 Create role

- `POST /api/v1/roles` — permission `roles-create`.
- **Body:** `name` (required, string, `max:255`, unique in `roles.name`).
- **Success — 200:** `Roles created successfully.` + RoleShowResource.
- **Workflow:** role created on the default guard (`api`); Spatie permission cache cleared.

#### 5.4.3 Show role

- `GET /api/v1/roles/{uuid}` — permission `roles-show`.
- **Success — 200:** `Roles retrieved successfully.` + **RoleShowResource** (uuid, name, `permissions` array of `{uuid, name}`, `users_count`, timestamps).

#### 5.4.4 Update role (rename)

- `PUT /api/v1/roles/{uuid}` — permission `roles-update`.
- **Body:** `name` (required, unique ignoring this role).
- **Success — 200:** `Roles updated successfully.` + RoleShowResource.
- **Errors:** `422` `The Admin role is protected and cannot be modified or deleted.` when renaming Admin; `422` validation; `404`.

#### 5.4.5 Delete role

- `DELETE /api/v1/roles/{uuid}` — permission `roles-delete`.
- **Success — 200:** `Roles deleted successfully.`
- **Errors:** `422` Admin protected; `404`.
- **Workflow:** user and permission pivot rows are detached first, then the role is deleted, inside one transaction; permission cache cleared.

#### 5.4.6 Bulk delete roles

- `DELETE /api/v1/roles/bulk-delete` — permission `roles-bulk-delete`.
- **Body:** `{"uuids": [...]}`; all-or-nothing; Admin in the list → `422` and nothing is deleted.

#### 5.4.7 List permissions

- `GET /api/v1/roles/permissions` — permission `roles-list-permissions`. (Static path defined before `/{uuid}`.)
- **Query:** `sortBy` (`id, name, created_at`), `sortDirection`, `per_page`, `search` (LIKE on permission name).
- **Success — 200:** `Roles retrieved successfully.`; `data` = **PermissionListResource** items: `{uuid, name, created_at}`.

#### 5.4.8 Permission detail

Not implemented as a standalone endpoint — the permission catalog is exposed via §5.4.7 (list) only, and which roles hold a permission is visible through the role detail endpoint (§5.4.3). (`PermissionShowResource` exists in the codebase per the standard two-resources-per-module rule but is not currently returned by any route.)

#### 5.4.9 Assign permissions to a role

- `POST /api/v1/roles/{uuid}/permissions` — permission `roles-assign-permissions`.
- **Body:** `permissions` (required array `min:1`, each an existing `permissions.name`).

```json
{ "permissions": ["books-list", "books-show"] }
```

- **Success — 200:** `Roles updated successfully.` + RoleShowResource (updated permission set).
- **Errors:** `422` — Admin protection when removing is attempted via §5.4.10 (this endpoint merges and is allowed even on Admin); validation errors for unknown permission names; `404` unknown role uuid.
- **Workflow:** `givePermissionTo` inside a transaction; permission cache cleared.

#### 5.4.10 Remove permissions from a role

- `DELETE /api/v1/roles/{uuid}/permissions` — permission `roles-remove-permissions`.
- **Body:** same shape as §5.4.9.
- **Success — 200:** `Roles updated successfully.` + RoleShowResource.
- **Errors:** `422` `The Admin role is protected…` — permissions can never be removed from Admin; `404`.
- **Workflow:** `revokePermissionTo` inside a transaction; cache cleared.

#### 5.4.11 Assign role to user

- `POST /api/v1/roles/{uuid}/users` — permission `roles-assign-users`.
- **Body:** `user_uuid` (required, exists in `users.uuid`).
- **Success — 200:** `Roles updated successfully.` + RoleShowResource.
- **Workflow:** `assignRole` inside a transaction; cache cleared.

#### 5.4.12 Remove role from user

- `DELETE /api/v1/roles/{uuid}/users` — permission `roles-remove-users`.
- **Body:** `user_uuid` (required, exists).
- **Success — 200:** `Roles updated successfully.` + RoleShowResource.
- **Errors:** `422` `The Admin role cannot be removed from users.`; `404`.
- **Workflow:** `removeRole` inside a transaction; cache cleared. Every user keeps at least the roles they have; removing a user's only non-admin role is allowed (the account simply loses that role's permissions).

### 5.5 Categories module

Standard CRUD + bulk delete; all require Bearer auth.

| Action | Endpoint | Permission |
|---|---|---|
| List | `GET /api/v1/categories` | `categories-list` |
| Create | `POST /api/v1/categories` | `categories-create` |
| Show | `GET /api/v1/categories/{uuid}` | `categories-show` |
| Update | `PUT /api/v1/categories/{uuid}` | `categories-update` |
| Delete | `DELETE /api/v1/categories/{uuid}` | `categories-delete` |
| Bulk delete | `DELETE /api/v1/categories/bulk-delete` | `categories-bulk-delete` |

**List query:** `sortBy` (`id, name, created_at`), `sortDirection`, `per_page`, `search` (LIKE on name).

**Create/Update body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | string | create: required / update: sometimes | `max:255`, unique in `categories.name` (update ignores the addressed category) |
| `description` | string | nullable | `max:255` |

```json
{ "name": "Computer Science", "description": "CS textbooks and references" }
```

**Success messages:** `Categories created/updated/retrieved/deleted successfully.` (all 200).

**Show response** — CategoryShowResource:

```json
{
  "uuid": "7fd2...",
  "name": "Computer Science",
  "description": "CS textbooks and references",
  "books_count": 12,
  "created_at": "2026-01-02T09:00:00.000000Z",
  "updated_at": "2026-01-02T09:00:00.000000Z"
}
```

**Bulk delete:** body `{"uuids": [...]}`, all-or-nothing (any unknown uuid → 404, nothing deleted), single transaction.

**Workflow:** deleting a category cascades to its books (ON DELETE CASCADE) and, through books, to `borrow_items` rows. There is no "category in use" guard — the admin is expected to manage the catalog accordingly.

### 5.6 Books module

Standard CRUD + bulk delete; all require Bearer auth.

| Action | Endpoint | Permission |
|---|---|---|
| List | `GET /api/v1/books` | `books-list` |
| Create | `POST /api/v1/books` | `books-create` |
| Show | `GET /api/v1/books/{uuid}` | `books-show` |
| Update | `PUT /api/v1/books/{uuid}` | `books-update` |
| Delete | `DELETE /api/v1/books/{uuid}` | `books-delete` |
| Bulk delete | `DELETE /api/v1/books/bulk-delete` | `books-bulk-delete` |

**List query**

| Parameter | Type | Required | Default | Allowed | Description |
|---|---|---|---|---|---|
| `sortBy` | string | no | `id` | `id, title, author, total_copies, available_copies, created_at` | Sort column |
| `sortDirection` | string | no | `desc` | `asc, desc` | Sort direction |
| `per_page` | integer | no | `15` | ≥1 | Page size |
| `category` | string (uuid) | no | — | existing category uuid | Only books of this category |
| `search` | string | no | — | — | LIKE match on title or author |
| `available` | boolean | no | — | `true/false` | `true` → only books with `available_copies > 0`; `false` → only books with none available |

**Create body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `title` | string | required | `max:255` |
| `author` | string | required | `max:255` |
| `description` | string | nullable | `max:255` |
| `category_uuid` | string | required | must exist in `categories.uuid` |
| `total_copies` | integer | required | `min:1` |
| `available_copies` | integer | nullable | `min:0`; defaults to `total_copies` when omitted |

```json
{ "title": "Introduction to Algorithms", "author": "Cormen et al.", "category_uuid": "7fd2...", "total_copies": 5 }
```

**Update body:** same fields, all `sometimes` (except nullable `description`); copies consistency is enforced against merged values.

**Success — 200 messages:** `Books created/updated/retrieved/deleted successfully.`

**Show response** — BookShowResource:

```json
{
  "uuid": "b31c...",
  "title": "Introduction to Algorithms",
  "author": "Cormen et al.",
  "description": null,
  "total_copies": 5,
  "available_copies": 5,
  "category": { "uuid": "7fd2...", "name": "Computer Science" },
  "created_at": "2026-01-03T08:30:00.000000Z",
  "updated_at": "2026-01-03T08:30:00.000000Z"
}
```

(List resource omits `description` and `updated_at`.)

**Errors:** `404` unknown book/category uuid; `422` validation; `422` business rule:

```json
{ "message": "Available copies cannot exceed total copies.", "status_code": 422, "data": {} }
```

**Workflow:** category resolved from `category_uuid` inside the transaction; `available_copies` defaults to `total_copies` on create; `available_copies ≤ total_copies` asserted on create and update (`book_copies_constraint`). Deleting a book cascades to its `borrow_items` rows. Students browse this module read-only (`books-list`, `books-show`).

### 5.7 Borrowings module (core business flow)

Status values (`App\Enums\BorrowingStatus`, stored as strings): `pending`, `borrowed`, `returned`, `rejected`. `is_overdue` is derived: status `borrowed` **and** now > `due_date`.

| Action | Endpoint | Permission |
|---|---|---|
| My requests | `GET /api/v1/borrowings/my` | `borrowings-my` |
| List (staff) | `GET /api/v1/borrowings` | `borrowings-list` |
| Submit request | `POST /api/v1/borrowings` | `borrowings-create` |
| Show | `GET /api/v1/borrowings/{uuid}` | `borrowings-show` (+ ownership scoping) |
| Approve | `POST /api/v1/borrowings/{uuid}/approve` | `borrowings-approve` |
| Reject | `POST /api/v1/borrowings/{uuid}/reject` | `borrowings-reject` |
| Confirm return | `POST /api/v1/borrowings/{uuid}/return` | `borrowings-return` |
| Delete | `DELETE /api/v1/borrowings/{uuid}` | `borrowings-delete` |
| Bulk delete | `DELETE /api/v1/borrowings/bulk-delete` | `borrowings-bulk-delete` |

#### 5.7.1 Submit borrowing request

- `POST /api/v1/borrowings` — `multipart/form-data` (file upload).
- **Headers:** `Authorization: Bearer`, `Accept: application/json`, `Content-Type: multipart/form-data` (set automatically by HTTP clients when uploading; do not hand-set the boundary).
- **Body**

| Field | Type | Required | Rules |
|---|---|---|---|
| `books` | array | required | `min:1`, `distinct` (no duplicates) |
| `books.*` | string | required | each must exist in `books.uuid` |
| `id_card` | file | required | `mimes:jpg,jpeg,png,pdf`, `max:2048` KB (2 MB) — the student's university ID card |

```bash
curl -X POST "$BASE/api/v1/borrowings" \
  -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" \
  -F "books[]=<book-uuid-1>" -F "books[]=<book-uuid-2>" \
  -F "id_card=@/path/to/student-id.png"
```

- **Success — 200:** `Borrowings created successfully.` + BorrowingShowResource; record status `pending`.

```json
{
  "message": "Borrowings created successfully.",
  "status_code": 200,
  "data": {
    "uuid": "c4f9...",
    "status": "pending",
    "is_overdue": false,
    "borrowed_at": null,
    "due_date": null,
    "returned_at": null,
    "id_card": { "path": "id-cards/9e7b6c1e-….png", "original_name": "student-id.png" },
    "student": { "uuid": "9c2d...", "name": "Sara Student", "email": "sara@example.local" },
    "books": [
      { "uuid": "b31c...", "title": "Introduction to Algorithms", "author": "Cormen et al." }
    ],
    "created_at": "2026-01-10T12:00:00.000000Z",
    "updated_at": "2026-01-10T12:00:00.000000Z"
  }
}
```

- **Errors**
  - `422` validation: missing/duplicate books, bad uuids, missing or oversized (or wrong-type) ID card.
  - `422` business: `{"message": "One or more of the requested books are not available.", "status_code": 422}` when a book has `available_copies < 1`.
  - `422` `The university ID card file is invalid.` when the resolved content type is not jpg/png/pdf.
  - `404` any unknown book uuid (all-or-nothing — the request is not created).
  - `401/403/500` as usual.
- **Business workflow**
  1. Books resolved by uuid; count mismatch → 404 before anything is written.
  2. Early availability check (re-checked under row locks at approval).
  3. The ID card is stored **before** the DB transaction on the private `local` disk under `id-cards/` with a server-generated UUID filename (extension derived from validated content type; original filename kept only as metadata). If the transaction fails, the stored file is deleted (best-effort, logged).
  4. Transaction: `borrowings` row created (`user_id` = authenticated student, status `pending`, ID card path + original name) and one `borrow_items` row per book (unique per borrowing+book).
  5. No copies are decremented yet — only approval affects availability.

#### 5.7.2 My requests

- `GET /api/v1/borrowings/my` — permission `borrowings-my` (students).
- Same query parameters and response shape as the staff list, but always scoped to the authenticated user (`user_id`).
- **Success — 200:** `Borrowings retrieved successfully.` + BorrowingListResource items + pagination.

```json
{
  "uuid": "c4f9...",
  "status": "borrowed",
  "is_overdue": false,
  "borrowed_at": "2026-01-12T09:00:00.000000Z",
  "due_date": "2026-01-26T09:00:00.000000Z",
  "returned_at": null,
  "student": { "uuid": "9c2d...", "name": "Sara Student" },
  "books": [ { "uuid": "b31c...", "title": "Introduction to Algorithms" } ],
  "created_at": "2026-01-10T12:00:00.000000Z"
}
```

#### 5.7.3 List (staff)

- `GET /api/v1/borrowings` — permission `borrowings-list`.
- **Query**

| Parameter | Type | Required | Default | Allowed | Description |
|---|---|---|---|---|---|
| `sortBy` | string | no | `id` | `id, status, borrowed_at, due_date, returned_at, created_at` | Sort column |
| `sortDirection` | string | no | `desc` | `asc, desc` | Sort direction |
| `per_page` | integer | no | `15` | ≥1 | Page size |
| `status` | string | no | — | `pending, borrowed, returned, rejected` | Exact status filter |
| `student` | string (uuid) | no | — | existing user uuid | Requests of one student |
| `overdue` | boolean | no | — | `true/false` | `true` → active loans past due; `false` → everything else |

- Success/errors as §5.7.2 (staff see all students' requests).

#### 5.7.4 Show

- `GET /api/v1/borrowings/{uuid}` — permission `borrowings-show`.
- **Ownership scoping:** users without `borrowings-list` (students) can only open their own records; another student's uuid → `404`.
- **Success — 200:** `Borrowings retrieved successfully.` + BorrowingShowResource (adds `id_card.path`/`id_card.original_name`, student `email`, book `author` vs. the list resource).

#### 5.7.5 Approve

- `POST /api/v1/borrowings/{uuid}/approve` — permission `borrowings-approve` (librarian/admin).
- **Body:** none.
- **Success — 200:** `Borrowings approved successfully.` + BorrowingShowResource (status `borrowed`).
- **Errors**
  - `422` `This action is not allowed for the borrowing's current status.` — request is not `pending` (already approved/rejected/returned).
  - `422` book availability under lock: `One or more of the requested books are not available.`
  - `404` unknown uuid.
- **Business workflow** (single transaction):
  1. Load borrowing with items; assert status `pending`.
  2. `SELECT … FOR UPDATE` on each item's book row (race-safe against parallel approvals).
  3. Any book with `available_copies < 1` → abort 422, nothing changed.
  4. Decrement `available_copies` per book.
  5. Status → `borrowed`, `borrowed_at = now()`, `due_date = now() + 14 days`.

#### 5.7.6 Reject

- `POST /api/v1/borrowings/{uuid}/reject` — permission `borrowings-reject`.
- **Success — 200:** `Borrowings rejected successfully.` (status `rejected`).
- **Errors:** `422` invalid status transition (only `pending` can be rejected); `404`.
- **Workflow:** status flip only — no counters were ever touched for a pending request.

#### 5.7.7 Confirm return

- `POST /api/v1/borrowings/{uuid}/return` — permission `borrowings-return`.
- **Success — 200:** `Borrowings returned successfully.` (status `returned`, `returned_at = now()`).
- **Errors:** `422` invalid status transition (only `borrowed` can be returned); `404`.
- **Workflow** (single transaction): assert status `borrowed`; row-lock the books; increment `available_copies` per book; set status/`returned_at`. Late returns are accepted and simply carry the actual timestamp — the overdue flag remains visible in history via `is_overdue`.

#### 5.7.8 Delete

- `DELETE /api/v1/borrowings/{uuid}` — permission `borrowings-delete`.
- **Success — 200:** `Borrowings deleted successfully.`; the ID card file is removed from storage **after** the transaction commits.
- **Errors:** `404` unknown uuid; `422` `An active borrowing cannot be deleted before its return is confirmed.` (status `borrowed`).
- **Workflow:** transactional delete with the active-loan guard (prevents availability corruption); cascade removes `borrow_items`; post-commit best-effort file cleanup (storage failures are logged, never surfaced as DB errors).

#### 5.7.9 Bulk delete

- `DELETE /api/v1/borrowings/bulk-delete` — permission `borrowings-bulk-delete`.
- **Body:** `{"uuids": [...]}`; all-or-nothing existence check + the same active-loan guard on every record; single transaction; ID card files cleaned up after commit.

### Borrowing lifecycle summary

```
Student                        Librarian                      System
  │ POST /borrowings (books+ID)   │                              │
  │──────────────────────────►  pending                        │
  │                              │ POST …/approve  ──────► borrowed (−copies, due = +14d)
  │                              │ POST …/reject   ──────► rejected
  │                              │ POST …/return   ──────► returned (+copies)
```

## 6. Collections and Resources

| Resource | Module | Used by | Fields |
|---|---|---|---|
| **UserListResource** | Users | users index | `uuid, name, email, roles[] (names), created_at` |
| **UserShowResource** | Users | users show/store/update, auth me/login | adds `email_verified_at, updated_at` |
| **RoleListResource** | Roles & Permissions | roles index | `uuid, name, users_count (when counted), created_at` |
| **RoleShowResource** | Roles & Permissions | role show + all role mutations | adds `permissions[] {uuid, name}` (when loaded), `updated_at` |
| **PermissionListResource** | Roles & Permissions | permissions index | `uuid, name, created_at` |
| **PermissionShowResource** | Roles & Permissions | (defined per the two-resources rule; not returned by any current route) | would add `roles[] {uuid, name}` (when loaded), `updated_at` |
| **CategoryListResource** | Categories | categories index | `uuid, name, description, created_at` |
| **CategoryShowResource** | Categories | category show/store/update | adds `books_count (when counted), updated_at` |
| **BookListResource** | Books | books index | `uuid, title, author, total_copies, available_copies, category {uuid, name} (when loaded), created_at` |
| **BookShowResource** | Books | book show/store/update | adds `description, updated_at` |
| **BorrowingListResource** | Borrowings | index + my | `uuid, status (string value), is_overdue, borrowed_at, due_date, returned_at, student {uuid, name} (when loaded), books[] {uuid, title} (when loaded), created_at` |
| **BorrowingShowResource** | Borrowings | show/store/approve/reject/return | adds `id_card {path, original_name}`, student `email`, books `author`, `updated_at` |

Conditional fields (`whenLoaded`/`whenCounted`) appear only when the service eager-loaded the relation; the documented service behaviors above always load them for the relevant endpoints.

## 7. Relationships and Data Dependencies

| From | To | Type | Reference field | Required | API surface |
|---|---|---|---|---|---|
| Book | Category | belongsTo | `category_uuid` in requests → `categories.uuid` | required | create/update book, `category` filter, nested in book resources |
| Borrowing | User (student) | belongsTo | `user_id` (internal); student uuid in `student` filter | required | create sets it to the authenticated user; `student` filter on staff list |
| BorrowItem | Borrowing | belongsTo | internal `borrowing_id` | required | created with the request; cascade-deleted |
| BorrowItem | Book | belongsTo | `books[]` uuids in requests → `books.uuid` | required | create request; books nested in resources |
| User | Role | many-to-many (Spatie) | `role` (name) on create; `user_uuid` on assign/remove | required at create | users create; roles assign/remove user |
| Role | Permission | many-to-many (Spatie) | `permissions[]` (names) | optional | roles assign/remove permissions |

## 8. Pagination and Sorting

- Parameters: `sortBy` (default `id`), `per_page` (default 15), `sortDirection` (`asc|desc`, default `desc`).
- Sorting columns are whitelisted per module (documented per list endpoint); unknown columns fall back to `id`, unknown directions fall back to `desc`. `orderBy` is always applied before `paginate`.
- Metadata block `pagination` (path, per_page, current_page, next_page_url, prev_page_url, total, last_page) is attached to list responses by `Helpers::getPaginationMeta()`; `all=1` suppresses it.

## 9. Error Handling Conventions

| Scenario | Status | Message source |
|---|---|---|
| Validation failure | 422 | Laravel validator, rendered in the approved envelope (`data.errors` keyed by field), message `The given data was invalid.` |
| Unauthenticated | 401 | `Unauthenticated.` |
| Missing permission | 403 | Spatie `UnauthorizedException` (permission name included by the framework) |
| Unknown uuid (single + bulk) | 404 | `The requested item was not found.` |
| Business rule violations | 422 | Specific localized messages (see per-endpoint sections; keys in `lang/en/messages.php`, translated for `ar`) |
| Unexpected server error | 500 | `Unexpected error occurred.` (details logged, never exposed) |

All messages honor the `Accept-Language` header (`en` default, `ar` supported) for the localized keys.

## 10. Swagger/OpenAPI

Machine-readable docs are generated by L5-Swagger from the controller annotations and describe the same endpoints, permissions (`x={"required-permission": …}`), parameters, and response codes as this file:

- Swagger UI: `GET /api/documentation`
- Raw OpenAPI 3.0 JSON: `GET /docs/api-docs.json`
- Regenerate after annotation changes: `php artisan l5-swagger:generate`
