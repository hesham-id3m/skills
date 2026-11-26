<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAccountPreview } from '../composables/useAccountPreview'

const props = withDefaults(defineProps<{
  locale?: 'en' | 'ar'
  // Pass real, available target routes only. Do not create dead navigation.
  links?: Array<{ to: string; en: string; ar: string; icon: string }>
}>(), {
  locale: 'en',
  links: () => [
    { to: '/account', en: 'Overview', ar: 'نظرة عامة', icon: 'mdi-view-dashboard-outline' },
    { to: '/account/orders', en: 'Orders', ar: 'الطلبات', icon: 'mdi-package-variant-closed' },
    { to: '/account/profile', en: 'Profile', ar: 'الملف الشخصي', icon: 'mdi-account-outline' },
  ],
})
const router = useRouter()
const { exitPreview } = useAccountPreview()

async function leavePreview() {
  exitPreview()
  await router.replace('/')
}
</script>

<template>
  <!-- Place inside the existing root v-app > v-main. DO NOT create another v-app. -->
  <v-container fluid class="py-6 px-4" :dir="props.locale === 'ar' ? 'rtl' : 'ltr'">
    <v-alert color="info" variant="tonal" type="info" class="mb-5" role="status">
      <strong>DEMO</strong> —
      {{ props.locale === 'ar'
        ? 'هذه معاينة واجهة حساب وليست جلسة تسجيل دخول حقيقية. كل البيانات المعروضة تجريبية.'
        : 'Account UI preview only. You are not signed in; displayed account data is sample content.' }}
      <template #append>
        <v-btn size="small" variant="outlined" @click="leavePreview">
          {{ props.locale === 'ar' ? 'إنهاء المعاينة' : 'Exit preview' }}
        </v-btn>
      </template>
    </v-alert>

    <v-row>
      <v-col cols="12" md="3" lg="2">
        <nav :aria-label="props.locale === 'ar' ? 'صفحات الحساب التجريبي' : 'Preview account navigation'">
          <div class="d-flex flex-wrap ga-2 d-md-none mb-4">
            <RouterLink v-for="item in props.links" :key="item.to" :to="item.to" custom v-slot="{ navigate, isActive }">
              <v-btn size="small" :color="isActive ? 'primary' : undefined" :variant="isActive ? 'flat' : 'outlined'" @click="navigate">
                <v-icon start :icon="item.icon" />{{ props.locale === 'ar' ? item.ar : item.en }}
              </v-btn>
            </RouterLink>
          </div>
          <v-list class="d-none d-md-block" density="comfortable" nav rounded="lg">
            <v-list-item v-for="item in props.links" :key="item.to" :to="item.to" :prepend-icon="item.icon"
              :title="props.locale === 'ar' ? item.ar : item.en" rounded="lg" />
          </v-list>
        </nav>
      </v-col>
      <v-col cols="12" md="9" lg="10">
        <RouterView v-slot="{ Component }">
          <component :is="Component" :locale="props.locale" />
        </RouterView>
      </v-col>
    </v-row>
  </v-container>
</template>
