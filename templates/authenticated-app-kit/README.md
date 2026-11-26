# Authenticated App Kit — optional, design-neutral Vue examples

This is an **optional example kit**, not a complete replacement starter template. It is an additive source collection for generated projects with meaningful customer/member areas. The v10.1 installer copies this kit to `templates/authenticated-app-kit/` and **does not automatically alter** your proven `templates/vue-vuetify-starter/` or existing projects.

## What is included
- `src/composables/useAccountPreview.ts`: explicit demo-only preview state, stored in `sessionStorage` without user identity/password/token. **Not an authentication implementation.**
- `src/components/PreviewAccountEntry.vue`: explicitly enters the customer area as **DEMO PREVIEW**, separately from the real login form.
- `src/layouts/AccountPreviewLayout.vue`: responsive customer account navigation and visible DEMO banner, no nested `v-app`, with EN/AR labels supplied as props.
- `src/views/account/AccountHomeView.vue`, `AccountOrdersView.vue`: functional sample overview and honest empty orders state.
- `integration.md`: examples of how to integrate with an *existing* Vue Router, global localization and design system.

## How Claude should reuse it
1. Read the target starter's existing auth, router, i18n, theme, cart/catalog and layout interface first. Only copy files that fit that architecture. Avoid duplicate locale/theme stores.
2. Keep all account routes consistent with the archetype; if it is a grocery/furniture store, add other routes such as wishlist, product links, addresses only where you actually implement them. SaaS/internal apps require *different* task-specific pages, do NOT copy customer account routes blindly.
3. Wire locale prop to the existing reactive `locale` state; do not hardcode `'en'`. Merge all labels with the existing EN/AR dictionaries when integrating into a real generated project.
4. This kit is for **frontend-only previews without a real auth API**. For real auth APIs, replace preview state entirely with a verified session adapter and backend-authorized routes.
5. Never use the Login or Signup submit button to enter preview; that would misrepresent demo state as successful authentication.
6. After wiring, run build and browser verification of both languages/themes, anonymous direct routes, entry/exit demo, page refresh and 320px responsive behavior.

The kit uses only Vue 3, Vue Router and Vuetify 3; no new runtime dependencies are needed on the approved stack. It is **not** guaranteed to be drop-in compatible with a customized starter without the integration changes documented here.

## v10.2 dashboard UI option
For polished card/table overviews and the optional admin console, see `templates/dashboard-ui-kit/` and `.claude/skills/data-ui/` and `.claude/skills/admin-console/`. Existing account kit remains focused on preview entry, layout and base customer pages. Do not replace verified starter files just to adopt the examples.
