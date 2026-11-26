<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme, useLocale as useVuetifyLocale, useRtl } from 'vuetify'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useI18n } from '@/i18n'
import { applyDocumentDirection } from '@/i18n'
import type { MessageKey } from '@/i18n/messages'

const route = useRoute()
const { t, locale } = useI18n()
const theme = useTheme()
const vuetifyLocale = useVuetifyLocale()
const { isRtl } = useRtl()

/**
 * The single settings watcher: one place that applies the shared locale
 * state to Vuetify and the document. Header controls only mutate state.
 */
watch(
  locale,
  (next) => {
    vuetifyLocale.current.value = next
    isRtl.value = next === 'ar'
    applyDocumentDirection(next)
  },
  { immediate: true },
)

/** Keep the stored theme dataset in sync (initial paint comes from index.html). */
watch(
  () => theme.global.name.value,
  (next) => {
    document.documentElement.dataset.appTheme = next
  },
  { immediate: true },
)

const pageTitle = computed(() => {
  const key = route.meta?.titleKey as MessageKey | undefined
  const base = key ? t(key) : t('brand.name')
  return `${base} · ${t('brand.name')}`
})

watch(pageTitle, (next) => {
  document.title = next
}, { immediate: true })
</script>

<template>
  <v-app>
    <AppHeader />

    <v-main>
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>
