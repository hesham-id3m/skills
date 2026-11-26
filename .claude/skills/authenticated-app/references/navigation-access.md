# Routes, permissions, session state

Define a route matrix before implementing:
- Public: any visitor (home/shop/product; cart if applicable)
- Guest-only UI: login/signup/recovery; redirect away only if a REAL authenticated session is verified
- Auth-required: pages with personal data and authenticated operations
- Preview-only demo: sample pages that explicitly declare preview, never the real account record
- Role-specific: admin/operator/customer, only when supported by provided rules

Use `meta.requiresAuth`, `meta.previewAllowed`, and `meta.roles` or equivalent with deliberate semantics. Avoid treating preview mode as authorized access to real API data. Check permission in each backend API, not just menus.

No server? Do not invent authenticated identity or system permissions. For demo, show realistic but clearly fabricated local sample data without sensitive information; label DEMO at point of use.

Always ensure navigation targets exist and fallback behavior is explicit; use a consistent 403 vs 404 vs expired session experience.

## Capability-driven navigation (v10.2)
- Keep one typed navigation registry with `path`, `labelKey`, and optional `requiredCapability`. Compute visible items from verified API session's effective capabilities, never from user-editable localStorage role strings.
- Real auth-required routes use server-validated session, and API checks enforce authorization. In DEMO preview, capabilities are fictional toggles for UI demonstration only, clearly marked, never used to protect real resources.
- Test negative access for user/admin routes independently. Do not leak admin-only links or data into customer shell.
