<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '@/i18n'
import { createRules } from '@/utils/validation'
import AuthShell from '@/components/auth/AuthShell.vue'

const { t } = useI18n()
const rules = computed(() => createRules(t))

const form = ref()
const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const showPassword = ref(false)
const submitting = ref(false)
const demoStatus = ref(false)

async function submit(): Promise<void> {
  const { valid } = await (form.value as { validate: () => Promise<{ valid: boolean }> }).validate()
  if (!valid) return
  submitting.value = true
  // Demo mode: no registration backend. Honest status, no account created.
  await new Promise((r) => setTimeout(r, 400))
  submitting.value = false
  demoStatus.value = true
}
</script>

<template>
  <main>
    <AuthShell :title="t('auth.signup.title')" :subtitle="t('auth.signup.sub')">
      <v-card-text>
        <v-alert v-if="demoStatus" type="info" variant="tonal" density="compact" class="mb-4">
          {{ t('auth.demoStatus.signup') }}
        </v-alert>

        <v-form v-else ref="form" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            :label="t('auth.signup.name')"
            :rules="[rules.required]"
            autocomplete="name"
            class="mb-1"
          />
          <v-text-field
            v-model="email"
            :label="t('auth.email')"
            :rules="[rules.required, rules.email]"
            type="email"
            autocomplete="email"
            class="mb-1"
          />
          <v-text-field
            v-model="password"
            :label="t('auth.password')"
            :rules="[rules.required, rules.password]"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            class="mb-1"
          >
            <template #append-inner>
              <v-icon
                :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                tabindex="0"
                role="button"
                :aria-label="showPassword ? t('auth.hidePassword') : t('auth.showPassword')"
                @click="showPassword = !showPassword"
                @keydown.enter="showPassword = !showPassword"
                @keydown.space.prevent="showPassword = !showPassword"
              />
            </template>
          </v-text-field>
          <v-text-field
            v-model="confirm"
            :label="t('auth.signup.confirm')"
            :rules="[rules.required, rules.confirmPassword(() => password)]"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
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
            {{ t('auth.signup.submit') }}
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-6">
        <span class="switch-line">
          {{ t('auth.signup.haveAccount') }}
          <RouterLink to="/login" class="minor-link">{{ t('auth.toLogin') }}</RouterLink>
        </span>
      </v-card-actions>
    </AuthShell>
  </main>
</template>

<style scoped>
.minor-link {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.minor-link:hover,
.minor-link:focus-visible {
  text-decoration: underline;
}

.switch-line {
  width: 100%;
  text-align: center;
  font-size: 13.5px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.switch-line .minor-link {
  margin-inline-start: 6px;
}
</style>
