# RBAC / permissions: contract and frontend boundaries

Model distinct concepts:
- `User` identifies a backend-verified actor.
- `Role` is a named set of capabilities (may be scoped to tenant/team/resource).
- `Permission/Capability` is a stable machine-readable operation (`orders.read`, `users.update`, `roles.assign`).
- `Assignment` ties verified user to role and optional scope. Do not assume one role per user if backend supports multiples.

## UI
- Design a typed capability registry and route/action metadata. Derive menu visibility and button states from one effective-capabilities check (not duplicated string checks across components).
- Role matrix lists groups/modules by rows and Read/Create/Update/Delete/Approve by columns only if relevant. Group permissions, show descriptions, dependent permissions and sensitive capability warnings. Role label/name editing and member count need real sources or DEMO labels.
- Show permission dependencies and explicit Save/Discard (not auto-apply every checkbox); confirm high-impact role changes and explain affected users.
- Distinguish role management (`roles.manage`) from user-role assignment (`users.assignRole`). Avoid privilege escalation in preview logic and real backend.
- Server defines effective capabilities and enforces them on every API. Frontend only mirrors to improve UX; client tampering never grants permission.
- No backend? use fictional safe sample roles/capabilities, mark DEMO and local-only, never call preview secure.
- Test capability matrix: customer denied /viewer read-only / editor limited edit / administrator allowed, including direct URL access and forbidden mutation. Explicitly test tenant/resource scope when provided.
