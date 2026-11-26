<script setup lang="ts">
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
</script>

<template>
  <section>
    <p class="text-overline text-medium-emphasis">DEMO</p>
    <h1 class="text-h4 mb-4">{{ props.locale === 'ar' ? 'طلباتي' : 'My orders' }}</h1>
    <v-card variant="outlined" rounded="lg" class="pa-6 text-center">
      <v-icon size="48" color="secondary" icon="mdi-package-variant-closed" class="mb-3" />
      <h2 class="text-h6 mb-2">{{ props.locale === 'ar' ? 'لا توجد طلبات' : 'No orders yet' }}</h2>
      <p class="text-body-2 text-medium-emphasis mb-3">
        {{ props.locale === 'ar'
          ? 'المعاينة لا تحتوي على سجل طلبات حقيقي. ستظهر هنا الطلبات بعد توصيل الـ API.'
          : 'This is a frontend preview, not a real order history. Real orders require an API.' }}
      </p>
      <v-btn to="/shop" color="primary" variant="flat">{{ props.locale === 'ar' ? 'تصفح المتجر' : 'Browse shop' }}</v-btn>
    </v-card>
  </section>
</template>
