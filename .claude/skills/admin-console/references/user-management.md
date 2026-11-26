# User management UX

- Users list with visible useful columns: name/identifier, role(s), status, last active when supported. Search, role/status filter, sort and pagination. Sample data is labeled DEMO; no real email/phone claims.
- Actions can include View, Change role, Disable/Reactivate, Invite; only implement actions with meaningful behavior. A real invite needs backend; in DEMO explain `Preview only — no invitation sent`.
- Change-role dialog: show current role, select permitted next roles, explain impact, validate, Save/Cancel; on server response display success/failure. For local preview say change is not persisted.
- Disable/delete requires explicit confirmation naming actor and consequences. Do not bury critical action in a single unconfirmed icon tap.
- Avoid sensitive account details in metrics/sample rows. Don't expose user information without server-granted access.
- Mobile: card/row layout with name + status + role + overflow actions; full data table at desktop; keyboard action menus, RTL, dark.
