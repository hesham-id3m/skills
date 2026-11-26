# Header — independent spec

- Use shared `AppHeader` and brand config from the verified starter. Mount on first render; never a blank toolbar. Re-skin visually per domain.
- Desktop physical zones in both locales: **logo + brand LEFT**, meaningful navigation CENTER, working controls RIGHT. An outer `direction:ltr` grid can pin physical zones; set text `dir` correctly inside cells. Do not let RTL flip the brand/action positions.
- Mobile: brand LEFT, actions and working menu RIGHT. At <=400 px collapse low priority controls into menu; don't overlap title at 320 px.
- `v-app-bar` and `v-navigation-drawer` must be **siblings** inside `v-app`, not nested (known Vuetify drawer bug). `v-main` respects app bar spacing.
- Only show search/cart/auth actions if underlying routes and behaviors exist. Cart badge reflects actual local state, not fake count.
- Real active-link logic: router path and hash anchors must not mark all anchors active. Drawer closes after navigation; test keyboard/escape and 375/320 px.
- Logo may be an original local SVG; product/catalog PHOTOS must not be SVG illustrations. All controls accessible with labels and focus states.
