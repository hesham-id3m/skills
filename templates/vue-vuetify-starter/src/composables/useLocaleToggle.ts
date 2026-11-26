import { useI18n } from '@/i18n'

/**
 * Single locale toggle used by the header and auth screens. It only mutates
 * the shared locale state; App.vue's watcher applies it to Vuetify and the
 * document, so there is exactly one place that applies settings.
 */
export function useLocaleToggle() {
  const { locale, setLocale } = useI18n()

  function toggleLocale(): void {
    setLocale(locale.value === 'en' ? 'ar' : 'en')
  }

  return { toggleLocale }
}
