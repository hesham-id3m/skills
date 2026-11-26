import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { brand } from '@/config/brand'

const STORAGE_KEY = `${brand.storagePrefix}.theme`

/** Real Vuetify theme state with persistence; defaults to OS preference. */
export function useAppTheme() {
  const theme = useTheme()
  const isDark = computed(() => theme.global.name.value === 'dark')

  function toggleTheme(): void {
    const next = isDark.value ? 'light' : 'dark'
    theme.global.name.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.dataset.appTheme = next
    } catch {
      /* non-fatal */
    }
  }

  return { isDark, toggleTheme }
}
