---
name: dashboard
description: Build purposeful operations dashboards, account overviews, SaaS workspaces, management tables and backoffice Vue 3 Vuetify interfaces. Use for dashboards, internal apps, ERP/CRM, post-login overview screens and data-heavy products; pair with data-ui for visual consistency and admin-console when roles/admin management are in scope.
---

# Dashboard Archetype

This skill owns domain information architecture. `data-ui` owns presentation/interaction patterns for cards, tables, actions and dialogs. `authenticated-app` owns layout, entry/login/preview and session states; `admin-console` owns privileged management.

## Before implementation
- Identify actual role's top 2–4 tasks, entities and data source. Write a compact route/workflow matrix, not generic Overview / Analytics / Settings pages by reflex.
- Separate customer `/account` from staff `/app`/`/workspace` and privileged `/admin` when required; do not show admin tools to customers.
- First page is a polished working overview: relevant 2–4 summary/KPI cards if meaningful, attention-needed work list, scoped contextual CTA, recent table/activity. No public Hero or fake metrics.
- Data pages use toolbar search, well-defined filters, sort, pagination, status + row actions, compact dialogs and feedback; implement according to `data-ui` references.
- Without API use clearly labeled DEMO cards/records and local-only actions. Don't pretend sample roles can secure routes, or that client-only edits updated the database.
- Use domain-specific entity names and columns, English/Arabic/RTL, light/dark and mobile 320px behavior.

## Evidence
Check overview visual hierarchy, table filtering/sorting and empty/error, action menu + short form modal, dangerous-action confirmation, mobile alternative, permission hidden/denied and dark/RTL. Build/browser gate is owned by `visual-qa`; skipped checks are not passed.
