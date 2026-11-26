<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '@/i18n'
import { createRules } from '@/utils/validation'
import AuthShell from '@/components/auth/AuthShell.vue'

const { t } = useI18n()
const rules = computed(() => createRules(t))

const form = ref()
const email = ref('')
const submitting = ref(false)
const demoStatus = ref(false)

async function submit(): Promise<void> {
  const { valid } = await (form.value as { validate: () => Promise<{ valid: boolean }> }).validate()
  if (!valid) return
  submitting.value = true
  // Demo mode: no recovery backend. Neutral honest status, nothing stored.
  await new Promise((r) => setTimeout(r, 400))
  submitting.value = false
  demoStatus.value = true
}
</script>

<template>
  <main>
    <AuthShell :title="t('auth.forgot.title')" :subtitle="t('auth.forgot.sub')">
      <v-card-text>
        <v-alert v-if="demoStatus" type="info" variant="tonal" density="compact" class="mb-4">
          {{ t('auth.demoStatus.forgot') }}
        </v-alert>

        <v-form v-else ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :label="t('auth.email')"
            :rules="[rules.required, rules.email]"
            type="email"
            autocomplete="email"
            class="mb-1"
          />

          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            block
            size="large"
            class="text-none mt-2"
            :loading="submitting"
          >
            {{ t('auth.forgot.submit') }}
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-6 justify-center">
        <RouterLink to="/login" class="minor-link">
          {{ t('auth.forgot.back') }}
        </RouterLink>
      </v-card-actions>
    </AuthShell>
  </main>
</template>

<style scoped>
.minor-link {
  font-size: 13.5px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.minor-link:hover,
.minor-link:focus-visible {
  text-decoration: underline;
}
</style>
