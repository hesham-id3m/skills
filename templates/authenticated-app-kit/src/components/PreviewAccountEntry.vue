<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAccountPreview } from '../composables/useAccountPreview'

const props = withDefaults(defineProps<{ locale?: 'en' | 'ar'; destination?: string }>(), {
  locale: 'en',
  destination: '/account',
})
const router = useRouter()
const { enterPreview } = useAccountPreview()

async function openPreview() {
  // This action intentionally does NOT submit a password or claim login success.
  enterPreview()
  await router.push(props.destination.startsWith('/') && !props.destination.startsWith('//') ? props.destination : '/account')
}
</script>

<template>
  <v-btn color="secondary" variant="outlined" @click="openPreview">
    {{ locale === 'ar' ? 'استعراض الحساب التجريبي (DEMO)' : 'Preview customer area (DEMO)' }}
  </v-btn>
</template>
