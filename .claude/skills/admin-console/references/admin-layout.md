# Admin layout and information architecture

- Use a scoped `/admin` shell distinct from `/account`; share central brand/theme/locale and typed UI components, but keep navigation sets separate.
- Calm responsive layout: compact persistent app bar for desktop; 240–280px sidebar when >3 work areas; mobile drawer with accessible menu. Breadcrumbs/title + relevant action; content has sensible max width and 16–32px margins.
- Example module map only when domain justifies: Overview, Orders, Catalog, Customers, Users, Roles & Permissions, Settings. Never create empty navigation or unsupported menu items.
- Overview: management KPI cards derived from actual/sample records, task queue/recent events, attention-needed items; no unrelated sales hero.
- Avoid tables in overview when a compact actionable list better serves the task. Admin detail pages own dense data tools.
- Scope navigation and actions by capability: `users.read`, `users.update`, `roles.read`, `roles.update`, etc. Apply business contract's own names if supplied.
- Admin's theme is a tonal variation of application's design system, not a wholly new brand; clear hover/active/focus states and page context.
