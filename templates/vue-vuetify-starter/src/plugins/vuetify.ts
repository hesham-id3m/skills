import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { readInitialLocale } from '@/i18n'
import { brand } from '@/config/brand'

/**
 * CUSTOMIZE THE BRAND PALETTE HERE.
 * Restrained 3-role palette: indigo (primary), slate (secondary),
 * neutral surfaces. Shared by light and dark themes; every other token is
 * a generic Material semantic color, so only `primary`/`secondary` (and
 * their `on-*` pairs) are brand-specific. The `index.html` `theme-color`
 * meta should match the light primary.
 */
const lightTheme = {
  dark: false,
  colors: {
    primary: '#4355B9',
    secondary: '#46505A',
    background: '#F5F6F8',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#F0F2F4',
    'surface-variant': '#E9ECEF',
    'surface-container-lowest': '#FFFFFF',
    'surface-container-low': '#F7F8FA',
    'surface-container': '#F2F4F6',
    'surface-container-high': '#EBEEF1',
    'surface-container-highest': '#E4E8EC',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-background': '#1A2027',
    'on-surface': '#1A2027',
    'on-surface-variant': '#4E5A64',
    outline: '#D5DBE1',
    'outline-variant': '#E2E7EB',
    error: '#B3261E',
    'on-error': '#FFFFFF',
    info: '#1668A8',
    'on-info': '#FFFFFF',
    success: '#1E7B45',
    'on-success': '#FFFFFF',
    warning: '#9A6A00',
    'on-warning': '#FFFFFF',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#A5B4FC',
    secondary: '#9FB0BE',
    background: '#0F1418',
    surface: '#161C22',
    'surface-bright': '#232C34',
    'surface-light': '#2B353E',
    'surface-variant': '#212A32',
    'surface-container-lowest': '#12181D',
    'surface-container-low': '#191F26',
    'surface-container': '#1E252D',
    'surface-container-high': '#28313A',
    'surface-container-highest': '#323C46',
    'on-primary': '#1A2151',
    'on-secondary': '#10171D',
    'on-background': '#E4E9EE',
    'on-surface': '#E4E9EE',
    'on-surface-variant': '#A6B2BC',
    outline: '#46535E',
    'outline-variant': '#333E48',
    error: '#F2B8B5',
    'on-error': '#3B0A08',
    info: '#9CC5F0',
    'on-info': '#082144',
    success: '#7DC99B',
    'on-success': '#0D2917',
    warning: '#E8C268',
    'on-warning': '#2E2200',
  },
}

function initialThemeName(): string {
  try {
    const stored = localStorage.getItem(`${brand.storagePrefix}.theme`)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* non-fatal */
  }
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

const initialLocale = readInitialLocale()

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: initialThemeName(),
    themes: { light: lightTheme, dark: darkTheme },
  },
  locale: {
    locale: initialLocale,
    fallback: 'en',
    rtl: { ar: true },
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { elevation: 0 },
    VTextField: { variant: 'outlined' },
    VSelect: { variant: 'outlined' },
  },
})
