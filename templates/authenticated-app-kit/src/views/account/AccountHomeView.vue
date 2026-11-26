<script setup lang="ts">
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = () => props.locale === 'ar'
</script>

<template>
  <section>
    <p class="text-overline text-medium-emphasis">DEMO</p>
    <h1 class="text-h4 mb-3">{{ ar() ? 'حسابك' : 'Your account' }}</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      {{ ar() ? 'هذه معاينة لمنطقة العميل. لا يوجد مستخدم مسجّل دخول فعليًا.' : 'Explore a customer-account preview. No real account is signed in.' }}
    </p>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card variant="outlined" rounded="lg" height="100%">
          <v-card-title>{{ ar() ? 'الطلبات' : 'Orders' }}</v-card-title>
          <v-card-text>{{ ar() ? 'لا توجد طلبات فعلية. يمكن استعراض حالة الطلبات التجريبية عند توفرها.' : 'No real orders are available in preview mode.' }}</v-card-text>
          <v-card-actions>
            <v-btn to="/account/orders" color="primary" variant="text">{{ ar() ? 'عرض الطلبات' : 'View orders' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card variant="outlined" rounded="lg" height="100%">
          <v-card-title>{{ ar() ? 'تصفح المنتجات' : 'Browse products' }}</v-card-title>
          <v-card-text>{{ ar() ? 'يمكنك متابعة تصفح المتجر دون حساب فعلي.' : 'Keep shopping without a real account.' }}</v-card-text>
          <v-card-actions>
            <v-btn to="/shop" color="primary" variant="text">{{ ar() ? 'الذهاب للمتجر' : 'Go to shop' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
