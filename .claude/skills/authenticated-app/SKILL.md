---
name: authenticated-app
description: Build the REAL post-login frontend experience for stores, SaaS apps, dashboards, portals and membership sites: signed-in app layout, account home, profile, settings, orders/activity, role-aware navigation, routes, loading/empty/error states, session and logout. Use whenever a brief includes login, signup, sign-in, user accounts, member area, customer dashboard, admin portal or an application where users work after signing in. For frontend-only projects without an auth API, build a clearly labeled explicit DEMO PREVIEW (not fake authentication).
---

# Authenticated App — the experience after sign-in

## Mission
A login form is an entry point, not the application. Design and implement the screens that users actually need AFTER authentication. Infer the smallest coherent signed-in sitemap from the application's domain, user roles and real workflows. Never add generic account pages without domain relevance.

## Load relevant references, not all at once
- `references/app-layout.md` — every authenticated application
- `references/auth-flow.md` — login/signup/logout/route guard or preview behavior
- `references/navigation-access.md` — route, roles and access decisions
- `references/states-and-feedback.md` — loading, failures, empty and session expiry
- `references/user-profile.md` and `references/account-settings.md` — only when editable profile/settings are in scope
- For retail use `references/storefront-account.md`; for internal tools use `references/internal-app.md`
- **For all account overview, data-heavy and post-login dashboards**, load `.claude/skills/data-ui/SKILL.md` and its appropriate references. For privileged admin pages load `.claude/skills/admin-console/SKILL.md` too.
- Also honor existing `ui-system` auth form references and archetype's skill. Do not copy their descriptions into this file.

## Classify access before building
| Access mode | Trigger | Behavior |
|---|---|---|
| **Real authenticated** | Actual API/session contract is provided | Integrate it; server authorization is authoritative; handle loading, denied, expiry and logout |
| **Demo preview only** | No auth API, frontend prototype requested | Show a separately labeled **Preview account area (DEMO)** action; DEMO preview state may enter sample internal screens but is never described as login/signup success, a verified identity or secured access |
| **Public only** | No account/portal requirement (e.g. brochure company site) | Do not invent signup, protected routes or internal pages |

Never use an arbitrary email/password to simulate a real login. Never persist passwords, JWTs in localStorage, or fabricate successful backend operations. For demo-only mode, preview is not security: do not call it authentication or use it to protect sensitive data.

## Per-archetype signed-in sitemap
- **Storefront**: `/account` overview; `/account/orders` and `/account/orders/:id` if orders are relevant; `/account/wishlist` if wishlist exists or is built to work; `/account/profile`; `/account/addresses` only if buying/delivery workflows warrant it; `/account/settings` if there are actual settings. Cart should remain usable when signed out. Never claim actual orders/payments without API.
- **SaaS / portal**: `/app` or `/workspace` overview, domain-specific work list/detail/action pages, user preferences and profile; invitations, teams and billing ONLY if explicitly required or supported.
- **Internal/admin**: task-focused overview, filtered table/detail, create/edit flows when in scope, explicit role-aware navigation. Do not display admin actions to customers. Display gating is UX only; backend enforces permissions.
- **Services/marketing**: no signed-in area unless brief includes customer portal/membership/account workflow.

## Build contract
1. Determine roles, source of session truth, routes and minimal post-login destination. Build a small internal sitemap, not every conceivable page.
2. Implement a single shared session/auth adapter (or explicit demo preview adapter) and one source of truth for nav/role state. Distinguish `loading`, `anonymous`, `authenticated`, `expired`, `forbidden`, and `preview` as relevant; avoid ambiguous booleans.
3. Reuse starter's router, theme, locale and shell. Signed-in layout can differ from public layout but must keep the same brand tokens, accessible interactions, EN/AR, RTL/LTR, light/dark, responsive 320px and sensible mobile nav. Do not nest a second `<v-app>`.
4. Make the first post-login page a well-composed **dashboard-style overview** when the domain benefits from it: 2–4 meaningful status/summary cards, contextual next action, and relevant list/table/activity. Prefer neutral surfaces, strong hierarchy and clean spacing; customer overview does not become an admin panel. Give each route real purpose and observable behavior. At minimum: domain-specific overview, list/detail where relevant, profile or user menu, settings if meaningful, and exit/logout or exit preview. Use empty/loading/error states.
5. In demo preview, label all account/order/profile data **DEMO** and provide an explicit exit. The actual login/signup buttons should say integration unavailable unless wired to the backend. Use the `templates/authenticated-app-kit/` examples as OPTIONAL code references when present; adapt them to the project's conventions, do not blindly copy conflicting router or i18n state.
6. Verify deep-link behavior, navigation, negative access path, refresh, logout/exit, 320/375/768/1440, both themes and EN/AR. Never claim an unrun test passed.

## Acceptance criteria
FAIL if sign-in silently redirects to a fake authenticated area; if a route is accessible as a supposedly protected page with no guard/API; if preview is misrepresented as real authorization; if logout only changes button text; if account UI is generic regardless of domain; or if mobile/RTL navigation fails.

## Output report
List actual post-login routes and interactions, which operations are DEMO vs API-wired, access control limitations, and test outcomes. No commits/pushes/deploy without user request.
