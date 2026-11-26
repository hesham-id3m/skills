<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardMetricCard from '../components/DashboardMetricCard.vue'
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = computed(() => props.locale === 'ar')
const search = ref('')
const sampleOrders = [
  { id: 'DEMO-104', itemEn: 'Living room chair', itemAr: 'كرسي غرفة المعيشة', date: '2026-11-20', status: 'Pending' },
  { id: 'DEMO-103', itemEn: 'Wooden side table', itemAr: 'طاولة جانبية خشبية', date: '2026-11-14', status: 'Completed' },
  { id: 'DEMO-102', itemEn: 'Dining chair', itemAr: 'كرسي سفرة', date: '2026-11-09', status: 'Completed' },
]
const filtered = computed(() => sampleOrders.filter(o => `${o.id} ${o.itemEn} ${o.itemAr}`.toLowerCase().includes(search.value.trim().toLowerCase())))
const headers = computed(() => [
  { title: ar.value ? 'الطلب' : 'Order', key: 'id' },
  { title: ar.value ? 'المنتج' : 'Item', key: 'item' },
  { title: ar.value ? 'التاريخ' : 'Date', key: 'date' },
  { title: ar.value ? 'الحالة' : 'Status', key: 'status', sortable: false },
])
</script>

<template>
  <section class="dashboard-page" :dir="ar ? 'rtl' : 'ltr'">
    <div class="d-flex align-start justify-space-between flex-wrap ga-3 mb-5">
      <div>
        <div class="text-caption text-medium-emphasis mb-1">{{ ar ? 'منطقة العميل · DEMO' : 'Customer workspace · DEMO' }}</div>
        <h1 class="text-h4 font-weight-bold mb-1">{{ ar ? 'نظرة عامة على حسابك' : 'Account overview' }}</h1>
        <p class="text-body-2 text-medium-emphasis">{{ ar ? 'بيانات تجريبية فقط — لا يوجد تسجيل دخول حقيقي أو طلبات فعلية.' : 'Sample data only — no real signed-in account or orders.' }}</p>
      </div>
      <v-btn variant="flat" color="primary" to="/shop" prepend-icon="mdi-storefront-outline">{{ ar ? 'تصفح المتجر' : 'Browse shop' }}</v-btn>
    </div>
    <v-alert type="info" variant="tonal" density="compact" class="mb-5" :text="ar ? 'هذه معاينة للحساب. العمليات والبيانات ليست متصلة بسيرفر.' : 'Account preview: actions and records are not connected to a server.'" />
    <v-row class="mb-3">
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'طلبات نموذجية' : 'Sample orders'" :value="sampleOrders.length" :hint="ar ? 'من بيانات المعاينة فقط' : 'Preview records only'" icon="mdi-package-variant-closed" /></v-col>
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'طلبات نموذجية معلقة' : 'Sample pending'" :value="sampleOrders.filter(o => o.status === 'Pending').length" :hint="ar ? 'للشرح فقط' : 'For illustration only'" icon="mdi-clock-outline" /></v-col>
      <v-col cols="12" sm="6" lg="4"><DashboardMetricCard :label="ar ? 'عناصر المفضلة' : 'Saved items'" value="—" :hint="ar ? 'غير متصلة ببيانات فعلية' : 'No connected data'" icon="mdi-heart-outline" /></v-col>
    </v-row>
    <v-card border rounded="lg" variant="flat">
      <v-card-text class="pa-5 pb-2 d-flex flex-wrap justify-space-between align-center ga-3">
        <div><h2 class="text-h6 font-weight-medium">{{ ar ? 'طلبات حديثة (تجريبية)' : 'Recent orders (sample)' }}</h2><div class="text-caption text-medium-emphasis">{{ ar ? 'من بيانات نموذجية وليست حسابك' : 'Illustrative orders, not your account history' }}</div></div>
        <v-text-field v-model="search" :label="ar ? 'بحث في الطلبات' : 'Search orders'" prepend-inner-icon="mdi-magnify" density="compact" variant="outlined" hide-details style="max-width:260px; min-width:180px" clearable />
      </v-card-text>
      <v-data-table :headers="headers" :items="filtered.map(o => ({ ...o, item: ar ? o.itemAr : o.itemEn }))" item-value="id" :items-per-page="5" density="comfortable" class="px-2 pb-2">
        <template #item.id="{ item }"><span dir="ltr" class="font-weight-medium">{{ item.id }}</span></template>
        <template #item.status="{ item }"><v-chip size="small" :color="item.status === 'Completed' ? 'success' : 'warning'" variant="tonal">{{ ar ? (item.status === 'Completed' ? 'مكتمل' : 'معلق') : item.status }}</v-chip></template>
        <template #no-data><div class="pa-6 text-medium-emphasis">{{ ar ? 'لا توجد نتائج. جرّب تعديل البحث.' : 'No matching orders. Try another search.' }}</div></template>
      </v-data-table>
    </v-card>
  </section>
</template>
<style scoped>.dashboard-page{max-width:1280px;margin-inline:auto;padding:24px 16px 40px}</style>
