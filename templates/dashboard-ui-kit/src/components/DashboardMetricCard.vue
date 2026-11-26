<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  value: string | number
  hint?: string
  icon?: string
  to?: string
}>(), { hint: '', icon: 'mdi-chart-box-outline' })
</script>

<template>
  <v-card rounded="lg" variant="flat" border class="dashboard-metric-card h-100">
    <v-card-text class="pa-5">
      <div class="d-flex align-center justify-space-between ga-3 mb-4">
        <span class="text-body-2 text-medium-emphasis">{{ label }}</span>
        <v-icon :icon="icon" size="20" color="medium-emphasis" aria-hidden="true" />
      </div>
      <div class="text-h4 font-weight-bold mb-1 dashboard-metric-value">{{ value }}</div>
      <div class="d-flex align-center justify-space-between ga-3">
        <span class="text-caption text-medium-emphasis">{{ hint }}</span>
        <v-btn v-if="to" :to="to" icon="mdi-arrow-up-right" size="x-small" variant="text" :aria-label="label" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.dashboard-metric-card { background: rgb(var(--v-theme-surface)); transition: border-color .16s ease; }
.dashboard-metric-card:hover { border-color: rgb(var(--v-theme-outline)); }
.dashboard-metric-value { letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
</style>
