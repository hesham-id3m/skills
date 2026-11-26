# Vue Vuetify Starter

A reusable, bilingual (English LTR / Arabic RTL) **Vue 3 + TypeScript + Vuetify 3 +
Vue Router** starter template, extracted from the latest completed **AutoHub v8**
reference implementation. It ships a working application shell — branded header,
footer, light/dark themes, real RTL, three honest (UI-only) auth screens and a
config-driven brand — with all domain content removed.

Run it:

```bash
npm install
npm run dev        # dev server
npm run build      # vue-tsc typecheck + production build
npm run preview    # serve dist on http://localhost:4173
npm run verify     # browser harness (needs `npx vite preview --port 4310` running)
```

## What is included

| Area | Files | Notes |
| --- | --- | --- |
| App shell | `src/App.vue`, `src/main.ts`, `src/style.css` | Header + `v-main`/`RouterView` + footer; single settings watcher applies locale/theme; document-title from route meta |
| Brand config | `src/config/brand.ts` | **The customization point**: name, tagline, logo, storage prefix, nav, footer resource links, `features.auth` switch |
| Theme | `src/plugins/vuetify.ts` | Light/dark semantic token palettes (neutral indigo default), persisted theme with OS-preference default |
| i18n / RTL | `src/i18n/`, `src/composables/useLocaleToggle.ts` | Flat typed EN/AR dictionaries with **typechecked key parity**; persisted locale; `dir`/`lang` applied in one place |
| Header | `src/components/layout/AppHeader.vue` | Brand physically LEFT in both locales, centered nav, locale/theme/auth actions, mobile drawer |
| Footer | `src/components/layout/AppFooter.vue` | Brand column, quick links, resources column, dynamic `© {year} {name}` |
| Auth screens | `src/views/auth/`, `src/components/auth/AuthShell.vue` | Login / Sign up / Forgot password with shared validation; **honest demo states — never fake a successful sign-in** |
| Routing | `src/router/index.ts` | `/`, `/login`, `/signup`, `/forgot-password`, 404; hash-anchor + saved-position scroll behavior |
| Utilities | `src/utils/validation.ts`, `src/utils/format.ts` | Locale-aware form rules; locale-aware number formatting |
| Verification | `scripts/verify.mjs` | puppeteer-core + system Chrome harness: LTR/RTL, light/dark, anchor nav, auth validation + honest states, 404, drawer, 1440/375/320 px overflow checks |

## Design neutrality contract

This starter is **reusable technical infrastructure only**. The neutral
"Starter" branding, indigo/slate palette and demo home page are placeholders
that prove the shell works — they are **never** the final design of a
generated project.

- Visual design authority lives in the workspace skill references
  (`../../frontend-skills/references/<skill>/SKILL.md`, routed by
  `../../frontend-skills/SKILLS.md`). Read the applicable references before
  building or restyling any UI.
- Every new project copies this template, then immediately rebrands it
  (see checklist below) and replaces `HomeView` with domain content designed
  per the references.
- Keep domain-specific design out of this template. Infrastructure fixes
  (shell, i18n, theme plumbing, router, verification harness) flow back here;
  design decisions stay in project copies and the references.

## Customization checklist for a new project

1. **`src/config/brand.ts`** — name, tagline, logo file, `storagePrefix`, `mainNav`,
   `resourceLinks`, and the `features.auth` switch (hides header/drawer/footer auth
   entry points without deleting the views).
2. **`public/favicon.svg`** — replace the placeholder mark with the project logo.
3. **`src/plugins/vuetify.ts`** — swap the `primary`/`secondary` palette values
   (light + dark) and matching `theme-color` meta in `index.html`.
4. **`index.html`** — title, description, and the localStorage key in the inline
   pre-paint script (`starter.theme`) must match `brand.storagePrefix`.
5. **`src/i18n/messages.ts`** — replace shell strings and add domain keys; every
   key must exist in **both** `en` and `ar` (the typecheck enforces parity).
   Add any new nav/footer labels as `MessageKey`s referenced from `brand.ts`.
6. **`src/router/index.ts`** — add domain routes with `meta.titleKey`.
7. Replace `src/views/HomeView.vue` with the real landing.

Notes:

- No photography is bundled by design — real imagery is project-specific and
  should be sourced per the workspace imagery skill and placed in `public/images/`.
- Auth is intentionally UI-only: submissions show an honest "not connected yet"
  notice instead of pretending an account was created or a session started.
- `package-lock.json` pins the exact dependency versions proven by the AutoHub v8
  reference build (Vite 8, Vuetify 3.13, TypeScript 6.0, vue-tsc 3.3).

## Provenance

Extracted from `Frontend-Skills-v8/autohub` (verified building before extraction).
Shell/layout/auth/theme/i18n/router/verification code was carried over; vehicle
catalog, vehicle images, saved-vehicles feature, test-drive dialog and inventory/
detail views were deliberately removed. The home page and favicon are new,
domain-neutral placeholders.

No commits or pushes without explicit user approval.
