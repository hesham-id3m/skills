---
name: storefront
description: Build premium Vue Vuetify e-commerce frontends such as groceries, perfume, mobiles, apparel, automotive shops, catalogues, product detail pages, carts and category searches. Use for stores, product listings, retail catalog or shopping interfaces.
---

# Storefront Archetype

## Default route contract
`/` considered editorial/home, `/shop` searchable/filterable catalog, `/product/:slug` details, `/cart` local persistent basket. Optionally `/login`, `/signup`, `/forgot-password` UI-only when account flow is useful and not excluded. Add categories only when represented in data.

## Actual usable interactions
- Real filtering, sort, category deeplinks, cart add/remove/quantity/subtotal and empty state. Shared typed product data with stable IDs and valid routes. Demo currency must be labeled, never imply actual available stock or live prices.
- Cart may persist in localStorage under brand-specific key. All sample products/prices/images explicitly labeled DEMO where appropriate. Do not invent checkout/payment success.
- Genuine images: provided catalog first. If none, a SMALL honest sample catalog with 4–8 distinct correct-product images; prioritize high quality rather than 19 downloads. Hero should look editorial and convincing, not a vector scene.
- Useful relevant storefront copy: prices, units, sizes and department names consistent with theme; do not invent regulatory or product guarantees.
- Build using Vuetify and shared UI. Images come through `asset-pipeline`; visually inspect crops and product identity.

## Verification
Test shop filters, product detail URL, cart state, stale localStorage handling, responsive cards, photo crops and EN/AR labels in both themes. Ensure every advertised CTA resolves to functionality.

## Customer account experience (v10.1)
For a storefront where accounts are in scope, activate `authenticated-app` alongside this skill. A usable storefront does not end at Login. Build account overview, profile and domain-relevant orders/wishlist/settings with real links and honest DEMO state if backend is absent. Orders or saved addresses are not mandatory if unrelated. See `authenticated-app/references/storefront-account.md`. Keep carts working while anonymous. Make account navigation compact; do not impose an admin dashboard/sidebar on retail customers.

## Customer dashboard overview (v10.2)
When account pages are included, design `/account` as a clean customer workspace: 2–4 cards only when computed from real or explicitly DEMO data, recent orders in a usable table/list, relevant next actions (browse orders, saved items), and compact profile/settings navigation. Use `data-ui`; never display management KPIs (revenue, employees, all-user counts) to customers.
An `/admin` route is **optional** and generated only when the brief explicitly or naturally includes store management, staff roles, permissions or admin panel. When included load `admin-console` and keep customer/admin surfaces independent.
