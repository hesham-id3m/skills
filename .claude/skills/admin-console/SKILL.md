---
name: admin-console
description: Build admin/backoffice areas, user management, role and permission assignments, user access governance, approval queues, audit logs and role-aware dashboards using Vue 3 Vuetify 3. Use when a brief mentions admin, administrator, management console, roles, permissions, RBAC, users, access levels, staff or privileged workflows. Do NOT invent an admin area for ordinary public or customer-only sites without product requirements.
---

# Admin Console — separate privileged workspace

Build a quiet professional admin area focused on real management tasks. Always activate `authenticated-app`, `dashboard` and `data-ui` alongside this skill. Load references only if pages are in scope:
- `references/admin-layout.md` — admin navigation, overview and page hierarchy
- `references/roles-permissions.md` — roles/capabilities, authorization and preview modes
- `references/user-management.md` — user list, invite/edit/deactivate/assign workflow
- `references/admin-actions-audit.md` — dangerous actions, confirmations, history and error states

## Requirements discovery, without fabricating policy
- If user supplies roles/capability matrix or API contract, implement it exactly. For one-line demo requests, define *illustrative* sample roles (admin/editor/viewer) and mark as DEMO, not the organization's actual policy.
- Create only admin modules relevant to the domain. For ecommerce, sensible administrative routes may be Overview, Products, Orders, Users, Roles; for SaaS, Teams/Projects/Approvals as actually required. Avoid an invented enterprise ERP.
- Admin UI is NOT a substitute for customer area. Separate customer routes (e.g. `/account`) from admin routes (`/admin`), even if they share theme/design tokens.
- Owner/Admin navigation is capability-filtered from one typed route/nav registry. Hide actions based on *capabilities*, not hard-coded display-name comparisons; backend must check every privileged request.
- Show 403/no access for forbidden, 404 for missing, session expiry separate. Never infer permission from user-controlled client storage. A frontend route guard is not a security boundary.
- No real auth/authorization API? Admin is clearly labeled **DEMO ADMIN PREVIEW** with sample data; no actual privilege or secure user administration. A separate preview entry may allow users to inspect sample role variants, not impersonate actual accounts.
- Follow data-ui references for KPI cards, toolbars, tables, actions, dialogs, dark mode, RTL/LTR and mobile.

## Minimum quality acceptance
- Admin Overview has task-relevant summaries and a primary management list/queue, not vanity numbers.
- Users page: search, role/status filter, legible table, row View/Edit/Deactivate actions if implemented; correct dialog and feedback, real permission checks when connected.
- Roles/Permissions page when required: role list, capability matrix, clear scope and save/cancel states, least-privilege defaults. Never implement irreversible permission changes as silent toggles.
- Explicit destructive action confirmation and activity/audit display only when data source supports it; demo audit must not be represented as server log.
- Every action has coherent loading/error/success states. Test admin and non-admin routes, forbidden actions, refresh, EN/AR RTL, light/dark and mobile.
