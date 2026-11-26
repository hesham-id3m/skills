import type { Locale } from '@/types'

/**
 * Locale-aware number formatting for domain views. Arabic renders with
 * Arabic-Indic digits; every other locale uses the `en-US` grouping.
 * (Reusable pattern carried over from the reference implementation.)
 */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(value)
}
