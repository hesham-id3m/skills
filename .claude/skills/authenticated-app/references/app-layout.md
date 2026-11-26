# Post-login app shell — domain-specific layout

- Distinguish public website shell, auth form shell, customer account shell and complex internal workspace shell; avoid one universal layout.
- Storefront customer: reuse public header/cart; use a compact account navigation (tabs at mobile, account menu/section rail at desktop), NOT a forced full-height admin sidebar.
- SaaS/ERP: app header + task navigation rail/sidebar only when multiple work areas warrant it. Preserve content priority over decoration; default desktop workspace and usable mobile navigation.
- Keep logo/name physically LEFT in the public header in AR and EN as required by `ui-system/references/header.md`; internal navigation may adapt to task needs while preserving consistent brand identity.
- Never nest `v-app` or `v-navigation-drawer` within an existing `v-main`; use one root `v-app`. Drawer is sibling of app-bar inside root when Vuetify app layout participates.
- Active nav labels match actual routes and roles. Skip dead links. On a small screen controls collapse safely; no body horizontal overflow at 320px.
- Share global theme/locale setting and token system. Every visible string requires EN/AR translation and proper `dir` handling (including mixed IDs, currencies and dates).
- Use section heading, context, breadcrumbs/back behavior as appropriate; primary action near relevant content, not gratuitous stats/hero sections.

## Dashboard-style overview quality (v10.2)
- The first account screen must feel like an intentional workspace: clear page heading, a useful summary/card row if meaningful, and one task-relevant recent-items list/table with an empty state; **never fill with placeholder vanity metrics**.
- Customer account uses public brand and a compact account navigation. Admin is a distinct privileged route/shell; don't show role controls to retail customers.
- Shared `data-ui` owns table, metric cards, dialog and status styles. Don't invent a parallel card design here. Avoid intense gradients, giant hero graphics and multiple floating action buttons.
