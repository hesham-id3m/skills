import type { MessageKey } from '@/i18n/messages'

/**
 * ── THE customization point ────────────────────────────────────────────────
 * Single shared brand + navigation + feature configuration consumed by the
 * header, footer and views. Change the brand here, not in components.
 *
 * Everything a new project must touch first:
 *   1. `brand` below (name, tagline, logo, storage prefix)
 *   2. the palette in `src/plugins/vuetify.ts`
 *   3. the dictionaries in `src/i18n/messages.ts` (EN + AR stay in parity)
 *   4. the matching localStorage key in `index.html` (theme pre-paint)
 *
 * Design authority: the workspace skill references
 * (`frontend-skills/references/<skill>/SKILL.md`, routed by
 * `frontend-skills/SKILLS.md`). This starter's neutral branding, palette and
 * demo home page are infrastructure placeholders — never a final design.
 */
export const brand = {
  name: 'Starter',
  tagline: 'Vue 3 + Vuetify 3 starter',
  logoSrc: '/favicon.svg',
  /** Original vector mark; ascending-blocks motif (replace with your logo). */
  /** localStorage key prefix (`${prefix}.theme`, `${prefix}.locale`).
   *  Keep in sync with the inline pre-paint script in `index.html`. */
  storagePrefix: 'starter',
} as const

/** Feature switches for optional shell parts. */
export const features = {
  /** Show Sign in / Create account actions in the header, drawer and footer.
   *  The auth routes/views stay registered; this only hides the entry points. */
  auth: true,
} as const

export interface NavItem {
  /** Message key resolved against the typed i18n dictionaries. */
  labelKey: MessageKey
  /** Router target; may include a hash anchor (e.g. '/#features'). */
  to: string
}

/** Header + drawer navigation. */
export const mainNav: NavItem[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.features', to: '/#features' },
]

export interface ResourceLink {
  labelKey: MessageKey
  /** Absolute external URL (opens in a new tab, rel="noopener"). */
  href: string
}

/** Footer second column — real, documented targets only. */
export const resourceLinks: ResourceLink[] = [
  { labelKey: 'footer.vueDocs', href: 'https://vuejs.org/guide/introduction.html' },
  { labelKey: 'footer.vuetifyDocs', href: 'https://vuetifyjs.com/en/getting-started/installation/' },
  { labelKey: 'footer.routerDocs', href: 'https://router.vuejs.org/' },
]
