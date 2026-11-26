<script setup lang="ts">
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <main class="section">
    <div class="page-shell empty">
      <v-icon icon="mdi-map-marker-off-outline" size="44" class="empty-icon" />
      <h1 class="empty-title">{{ t('notfound.title') }}</h1>
      <p class="empty-sub">{{ t('notfound.sub') }}</p>
      <v-btn color="primary" class="text-none" to="/">
        {{ t('notfound.action') }}
      </v-btn>
    </div>
  </main>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 96px 16px;
}

.empty-icon {
  color: rgb(var(--v-theme-on-surface-variant));
}

.empty-title {
  margin-top: 12px;
  font-size: 22px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

.empty-sub {
  margin: 6px 0 20px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 14px;
}
</style>
