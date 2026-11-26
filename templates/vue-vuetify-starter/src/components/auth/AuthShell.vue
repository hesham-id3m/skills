<script setup lang="ts">
import { brand } from '@/config/brand'
import { useI18n } from '@/i18n'

/** Focused branded shell shared by the three auth screens. */
defineProps<{ title: string; subtitle: string }>()
const { t } = useI18n()
</script>

<template>
  <div class="auth-shell">
    <div class="auth-panel">
      <RouterLink to="/" class="auth-brand" :aria-label="t('header.logoAria')">
        <img :src="brand.logoSrc" :alt="t('brand.logoAlt')" width="34" height="34" />
        <span class="auth-brand-name">{{ t('brand.name') }}</span>
      </RouterLink>

      <v-card variant="outlined" rounded="xl" class="auth-card">
        <v-card-item class="pt-6">
          <v-card-title class="auth-title">{{ title }}</v-card-title>
          <v-card-subtitle class="auth-subtitle">{{ subtitle }}</v-card-subtitle>
        </v-card-item>
        <slot />
      </v-card>

      <p class="auth-demo-line">{{ t('footer.note') }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: calc(100vh - 72px - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
}

.auth-panel {
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Brand stays physically left of the name in both locales. */
.auth-brand {
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 24px;
}

.auth-brand-name {
  font-size: 18px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

.auth-card {
  width: 100%;
  background: rgb(var(--v-theme-surface));
}

.auth-title {
  font-size: 20px;
  font-weight: 700;
  white-space: normal;
}

.auth-subtitle {
  white-space: normal;
  margin-top: 4px;
  font-size: 13.5px;
}

.auth-demo-line {
  margin-top: 16px;
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface-variant));
  text-align: center;
}

@media (max-width: 600px) {
  .auth-shell {
    min-height: auto;
    padding: 32px 16px;
  }
}
</style>
