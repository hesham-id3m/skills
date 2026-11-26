# Shared components and conventions

- Maintain restrained tokens: primary brand, neutral surfaces, purposeful accent and semantic feedback. Centralize theme palette, contrast, spacing, radii, font scales. Build both dark and light themes intentionally.
- Use Vuetify v-btn/v-card/v-img/v-text-field/v-select/v-alert/v-dialog/v-skeleton-loader as needed; no cosmetic fake controls. One primary action per region.
- Forms: visible labels, typed values, contextual errors, submitting/disabled status, 44px usable touch targets and focus ring. Never send credentials to unverified API.
- Product cards: real photographic local assets, correct item association, consistent media ratio, concise meaningful information. Use skeleton/empty/error states honestly.
- Explicit typed locale keys for dynamic labels; no unchecked string interpolation, translation keys or TypeScript `baseUrl` copied from obsolete recipes.
- Accessible reduced motion; no animations on every card. Asset dimensions and lazy loading prevent layout shifts.

## Shared data components (v10.2)
For cards, data tables, status chips, toolbar filters, row menus, forms, confirmation dialogs and feedback **load `data-ui`**. Keep one semantic token and bilingual component system; avoid implementing slightly different dialog/table components independently in each page.
