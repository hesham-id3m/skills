# Integration into an existing Vue 3 + Vuetify 3 starter

**Do not paste this blindly**. The existing starter may already include an `AppHeader`, `AppFooter`, login views, global locale/theme, brand config, and route meta. Adapt these examples to the current code rather than installing duplicate providers.

## 1. Decide routes based on type of project
For a customer storefront, relevant paths may be `/account`, `/account/orders`, `/account/wishlist`, `/account/profile`, `/account/settings`. Implement a route only if it has a corresponding working view; never create dead links. Admin/SaaS apps must have domain-specific internal routes instead.

## 2. Example router fragment (DEMO preview only)

```ts
// Adapt imports to your project's actual locations. Use dynamic imports for pages.
const accountPreviewRoutes = {
  path: '/account',
  component: () => import('@/layouts/AccountPreviewLayout.vue'),
  meta: { previewOnly: true },
  children: [
    { path: '', component: () => import('@/views/account/AccountHomeView.vue') },
    { path: 'orders', component: () => import('@/views/account/AccountOrdersView.vue') },
    { path: 'profile', component: () => import('@/views/account/AccountProfileView.vue') },
  ],
}

// In a Vue Router BEFORE EACH guard for this DEMO-ONLY area:
// if (to.matched.some(record => record.meta.previewOnly) && !useAccountPreview().previewActive.value) {
//   return '/login' // where a separate Preview Account (DEMO) entry is visible
// }
// This is UI navigation only. It is NOT an authentication or authorization boundary.
```

Avoid infinite redirect loops; `/login` must not itself require a preview flag. In real apps, use a verified auth state and enforce authorization on the server.

## 3. Wire a demo preview action without fake login
On the existing Login screen, keep its current honest 'not connected to auth API' message. Place `<PreviewAccountEntry :locale="locale" destination="/account" />` as a **separate** action. Never make submit/login/signup trigger this preview.

## 4. Dynamic locale
Components take `locale?: 'en'|'ar'` as an integration convenience. Pass the **reactive app-wide locale**, rather than relying on defaults. For a production-grade generated app merge labels into the existing typed EN/AR dictionary and use the shared i18n layer directly. Do not create an independently persisted account-specific locale.

## 5. Design
The example layout intentionally uses generic Vuetify. The design-director and ui-system references are authoritative for visual identity. Modify the copy/layout to match the target industry; do not ship example text or a forced customer sidebar in an admin SaaS project.

## 6. Tests after integration
- Build/typecheck and router navigation
- Unauthenticated direct `/account` link should not claim access
- Login submit without API reports not connected
- Separate demo preview entry navigates to `/account` with persistent DEMO banner
- Refresh and Exit preview (route after exit should be public)
- Shop and account route links work; mobile 320px, LTR/RTL and light/dark all usable

## 7. Dashboard-style account views (v10.2)
If users requested calm card/table-driven post-login overview, use `data-ui` and the optional `templates/dashboard-ui-kit/src/views/CustomerOverviewView.vue` as a **design/code reference**. Do not paste unrelated sample furniture orders into a different industry; adapt records and labels to the actual application. For Admin, use a separate `/admin` route and only the `admin-console` skill/kit when explicitly in scope. Both kits use demo data unless connected to real APIs.
