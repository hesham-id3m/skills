import { computed, ref, type ComputedRef } from 'vue'
import { ar, en, type MessageKey } from './messages'
import type { Locale } from '@/types'
import { brand } from '@/config/brand'

const dictionaries = { en, ar } as const

const STORAGE_KEY = `${brand.storagePrefix}.locale`

export function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    /* storage unavailable — fall through */
  }
  return 'en'
}

export function applyDocumentDirection(locale: Locale): void {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
}

const locale = ref<Locale>(readInitialLocale())

export interface UseI18n {
  t: (key: MessageKey, params?: Record<string, string | number>) => string
  locale: ComputedRef<Locale>
  isAr: ComputedRef<boolean>
  setLocale: (locale: Locale) => void
}

export function useI18n(): UseI18n {
  function t(key: MessageKey, params?: Record<string, string | number>): string {
    let text: string = dictionaries[locale.value][key] ?? en[key] ?? key
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replaceAll(`{${name}}`, String(value))
      }
    }
    return text
  }

  const isAr = computed(() => locale.value === 'ar')

  function setLocale(next: Locale): void {
    locale.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* non-fatal */
    }
    applyDocumentDirection(next)
  }

  return { t, locale: computed(() => locale.value), isAr, setLocale }
}
