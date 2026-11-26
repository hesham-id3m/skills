# Internal SaaS/CRM/ERP signed-in space

- Select 2–4 primary workflows derived from the domain: e.g. inventory overview → items table → item detail/edit; CRM overview → leads list → lead detail.
- Distinguish user workspace from privileged admin management. Admin routes/actions appear only where role rules justify; backend authorization remains mandatory.
- Use compact navigation, search/filter/sort, useful data density, meaningful empty states; no public marketing hero inside signed-in workspace.
- Add account/profile/preferences, logout and session/error behavior, not meaningless 'My Orders' pages.
- For no-backend demo, expose clearly marked sample records and preview-only interaction outcomes; never claim persistence or permissions.

## Professional data UI (v10.2)
- Load `data-ui` for Overview KPI cards, filters, tables, dialogs and state patterns.
- If the product includes administrators or role/permission management, load `admin-console` and build distinct `/admin` routes plus navigation filtered by server-supplied capabilities. No admin impersonation from DEMO client state.
