import type { useI18n } from '@/i18n'

/**
 * Shared form validation helpers for Vuetify `rules`. Create them from the
 * active `t` so messages re-translate when the locale changes.
 */
type TFn = ReturnType<typeof useI18n>['t']
export type Rule = (value: string) => true | string

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface FieldRules {
  required: Rule
  email: Rule
  password: Rule
  confirmPassword: (other: () => string) => Rule
}

export function createRules(t: TFn): FieldRules {
  return {
    required: (v) => (v ?? '').trim().length > 0 || t('rules.required'),
    email: (v) => EMAIL_RE.test((v ?? '').trim()) || t('rules.email'),
    password: (v) => (v ?? '').length >= 8 || t('rules.passwordMin', { n: 8 }),
    confirmPassword: (other) => (v) => (v ?? '') === other() || t('rules.passwordMatch'),
  }
}
