# Dashboard UI Kit — OPTIONAL Vue 3 + Vuetify 3 examples (v10.2)

Contains reference-quality **DEMO** screens for calm, data-rich authenticated experiences:

- `src/components/DashboardMetricCard.vue` — responsive summary card.
- `src/components/DashboardActionDialog.vue` — accessible, confirmable short action.
- `src/views/CustomerOverviewView.vue` — customer dashboard with a simple recent-orders sample table.
- `src/views/AdminOverviewView.vue` — admin task-oriented dashboard with summary metrics and sample queue.
- `src/views/AdminUsersView.vue` — searchable/sortable sample users table, status filters, row actions, edit role dialog and local-only feedback.
- `src/views/AdminRolesView.vue` — illustrative editable role/capability matrix with explicit Apply/Discard; never secure authorization.

These are **component examples, not a runnable separate app** and not an auth implementation. Copy only the relevant components/views into an existing Vue 3 + Vuetify 3 project; adapt route names, theme tokens, app-wide i18n and actual domain entities. You must run your project's build/browser tests after integration. They are self-contained via relative imports for ease of adaptation; they do not include a second UI library, external data or fabricated backend responses.

Do not claim `v-data-table` filtering/pagination happened on a server; all sample records are local. Once API is supplied, replace the demo state with server-backed `v-data-table-server`, query/loading/error state, capability and session adapters. Never persist passwords, JWTs or fake capabilities.

**Scoping:** account route `/account` is separate from admin route `/admin` if privileged UI is requested. Ordinary customer websites must not acquire an admin console automatically. Existing `templates/authenticated-app-kit` is still available for demo-preview entry, shell and basic forms; these files complement, not replace, it.
