<script setup lang="ts">
import { computed } from 'vue'
import DashboardMetricCard from '../components/DashboardMetricCard.vue'
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = computed(() => props.locale === 'ar')
const demoQueue = [
  { id:'DEMO-201', en:'Review new access request', ar:'مراجعة طلب صلاحية جديد', status:'Pending' },
  { id:'DEMO-202', en:'Check catalog update', ar:'مراجعة تحديث الكتالوج', status:'Open' },
]
</script>
<template>
  <section class="dashboard-page" :dir="ar ? 'rtl' : 'ltr'">
    <div class="mb-5"><div class="text-caption text-medium-emphasis">{{ ar ? 'لوحة الإدارة · DEMO' : 'Admin workspace · DEMO' }}</div><h1 class="text-h4 font-weight-bold">{{ ar ? 'نظرة عامة على الإدارة' : 'Admin overview' }}</h1><p class="text-body-2 text-medium-emphasis">{{ ar ? 'هذه معاينة غير متصلة بأي نظام صلاحيات حقيقي.' : 'Sample workspace only. No real authentication or permission backend.' }}</p></div>
    <v-alert class="mb-5" type="warning" variant="tonal" density="compact" :text="ar ? 'الصلاحيات والبيانات هنا للمعاينة فقط، وليست حماية حقيقية.' : 'Preview only: capabilities and records are not real access control.'" />
    <v-row class="mb-3">
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'المهام التجريبية' : 'Sample tasks'" :value="demoQueue.length" :hint="ar ? 'من قائمة مثال فقط' : 'Illustrative queue'" icon="mdi-format-list-checks" /></v-col>
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'طلبات تحتاج مراجعة' : 'Review needed'" :value="demoQueue.filter(x => x.status === 'Pending').length" :hint="ar ? 'نموذج فقط' : 'Preview only'" icon="mdi-clock-alert-outline" /></v-col>
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'حالة الاتصال' : 'API connection'" :value="ar ? 'غير متصل' : 'Offline'" :hint="ar ? 'لا توجد API' : 'No backend configured'" icon="mdi-cloud-off-outline" /></v-col>
    </v-row>
    <v-card variant="flat" border rounded="lg"><v-card-text class="pa-5"><h2 class="text-h6 mb-3">{{ ar ? 'قائمة العمل النموذجية' : 'Sample work queue' }}</h2><v-list lines="two" bg-color="transparent"><v-list-item v-for="task in demoQueue" :key="task.id" :title="ar ? task.ar : task.en" :subtitle="task.id" prepend-icon="mdi-checkbox-blank-circle-outline"><template #append><v-chip size="small" variant="tonal">{{ ar ? (task.status === 'Pending' ? 'معلق' : 'مفتوح') : task.status }}</v-chip></template></v-list-item></v-list></v-card-text></v-card>
  </section>
</template>
<style scoped>.dashboard-page{max-width:1280px;margin-inline:auto;padding:24px 16px 40px}</style>
