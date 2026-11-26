# Integration (do not blindly copy over existing app)

1. Read `data-ui` + `authenticated-app`; read `admin-console` only if admin, roles or permissions are in scope.
2. Keep existing root Vuetify `<v-app>`, `useAppTheme`, app-wide locale and route guard. Copy only chosen views and shared components into your source folders. No nested `<v-app>`.
3. Pass reactive `:locale="locale"` (EN/AR) to kit examples or convert labels into your project's typed i18n dictionaries. Keep consistent brand, theme and spacing.
4. Customer `/account` and admin `/admin` must have different nav registries if both exist; server grants real permissions, and backend must authorize each API. Frontend-only DEMO previews never expose real user data or become permission boundaries.
5. Place a persistent `DEMO`/`Preview — no real account signed in` message on sample views. Do not make login submit navigate into a fake session. Use v10.1 `PreviewAccountEntry.vue` for the separate demo entry if needed.
6. For real API replace all `demo*` arrays with API responses, error/loading/empty states, server-side pagination and effective-permission data from verified session. Don't send invites/update roles/disable accounts without real endpoints.
7. Add only real routes and actions. Example dynamic routes: `/account`, `/account/orders`, `/admin`, `/admin/users`, `/admin/roles`. Admin route must not appear in customer nav unless authorized; sample routes must be preview-labeled.
8. Run `npm run build`, existing browser harness, keyboard/RTL/dark/mobile checks; test edit dialog Save vs Cancel, row sorting/search/filter, admin capability matrix Apply/Discard and unauthorized deep link handling. Record actual test results, not assumed results.
