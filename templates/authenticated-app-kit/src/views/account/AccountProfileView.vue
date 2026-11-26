<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = computed(() => props.locale === 'ar')
const sampleName = ref('Demo Customer')
const sampleEmail = ref('demo@example.invalid')
const displayName = ref(sampleName.value)
const displayEmail = ref(sampleEmail.value)
const notice = ref('')

function savePreview() {
  notice.value = ''
  if (!displayName.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(displayEmail.value)) {
    notice.value = ar.value ? 'راجع الاسم والبريد الإلكتروني.' : 'Check your name and email address.'
    return
  }
  sampleName.value = displayName.value.trim()
  sampleEmail.value = displayEmail.value.trim()
  notice.value = ar.value
    ? 'تم تحديث المعاينة محليًا فقط. لم تُحفَظ البيانات على أي خادم.'
    : 'Updated in this local preview only. Nothing was saved on a server.'
}
</script>

<template>
  <section>
    <p class="text-overline text-medium-emphasis">DEMO</p>
    <h1 class="text-h4 mb-3">{{ ar ? 'الملف الشخصي' : 'Profile' }}</h1>
    <p class="text-body-2 text-medium-emphasis mb-4">
      {{ ar ? 'هذه بيانات مثال لا تخص حسابًا حقيقيًا.' : 'These sample fields do not belong to a real account.' }}
    </p>
    <v-card variant="outlined" max-width="650" rounded="lg" class="pa-4">
      <form @submit.prevent="savePreview">
        <v-text-field v-model="displayName" autocomplete="off" :label="ar ? 'الاسم التجريبي' : 'Sample name'" required />
        <v-text-field v-model="displayEmail" autocomplete="off" type="email" :label="ar ? 'البريد التجريبي' : 'Sample email'" required />
        <v-alert v-if="notice" variant="tonal" color="info" class="mb-4" role="status">{{ notice }}</v-alert>
        <v-btn type="submit" color="primary">{{ ar ? 'تحديث المعاينة محليًا' : 'Update local preview' }}</v-btn>
      </form>
    </v-card>
  </section>
</template>
