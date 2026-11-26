---
name: data-ui
description: Design high-quality calm data-heavy interfaces for Vue 3 Vuetify 3. ALWAYS use when building dashboard overviews, KPI cards, tables, filters, row actions, forms, confirmation dialogs, drawers, CRUD interfaces, operations screens or post-login account pages. Applies to customer and admin dashboards. Load only the references for components in scope.
---

# Data UI — functional, calm, polished

This skill owns the quality of data presentation and action feedback. It DOES NOT decide which business pages exist or grant access to data. A usable dashboard is not four unrelated cards and a marketing banner.

## Reference selector (load as needed)
- `references/overview-cards.md`: overview, KPIs, summary cards, actionable sections
- `references/tables-filters.md`: lists, tables, search, filtering, sorting, pagination, selection, mobile density
- `references/actions-dialogs.md`: row actions, create/edit/detail flows, modals, confirmation, validation and notifications
- `references/design-tokens.md`: quiet palette, typography, surface levels, spacing, hover, responsive and RTL
- `references/states.md`: skeletons, zero states, errors, success and permission-denied states

## Cross-cutting contract
1. Start with the user's top tasks and the entity data model, then select UI patterns. Do not invent KPIs that cannot be computed from supplied or explicitly DEMO records.
2. Standard default: compact page heading + contextual primary action, meaningful metric/summary cards if useful, then the most important work table/queue. Never require stats cards when the domain has no meaningful metrics.
3. Use native Vuetify 3 (`v-card`, `v-data-table`/`v-data-table-server`, `v-dialog`, `v-menu`, `v-form`, `v-snackbar`, `v-chip`) with existing theme. Do not add a second UI library.
4. Real interactions: table filters/search/page, dialog close/submit/cancel, loading/disabled, validation, detail navigation, feedback. Unwired CRUD buttons must say unavailable; no cosmetic fake controls.
5. For no-API data use explicit preview/sample labels near data and action; local changes are temporary and must not look server-persisted.
6. All states EN/AR RTL/LTR, 320/375/768/1440, keyboard and dark/light. Keep desktop information density and mobile usability.
7. Use single source of table query state. For remote datasets: server-side search/sort/page and total; do not client-filter one page and label it a complete dataset.

## Finish quality gate
Review screenshot of overview, full/empty table, open action menu, create/edit dialog and delete confirmation in both light/dark and RTL/LTR. Visual QA must label any untested state UNVERIFIED.
