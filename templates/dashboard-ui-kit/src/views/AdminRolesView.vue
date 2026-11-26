<script setup lang="ts">
import { computed, ref } from 'vue'
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = computed(() => props.locale === 'ar')
type Permission = 'users.read' | 'users.update' | 'orders.read' | 'orders.update' | 'roles.manage'
type Role = 'admin' | 'editor' | 'viewer'
const roleLabels: Record<Role, { en: string; ar: string }> = {
  admin: { en: 'Admin (demo)', ar: 'مدير تجريبي' },
  editor: { en: 'Editor (demo)', ar: 'محرر تجريبي' },
  viewer: { en: 'Viewer (demo)', ar: 'مشاهد تجريبي' },
}
const permissionLabels: { id: Permission; en: string; ar: string }[] = [
  { id: 'users.read', en: 'View users', ar: 'عرض المستخدمين' },
  { id: 'users.update', en: 'Modify users', ar: 'تعديل المستخدمين' },
  { id: 'orders.read', en: 'View orders', ar: 'عرض الطلبات' },
  { id: 'orders.update', en: 'Modify orders', ar: 'تعديل الطلبات' },
  { id: 'roles.manage', en: 'Manage roles', ar: 'إدارة الأدوار' },
]
const initial: Record<Role, Permission[]> = {
  admin: ['users.read','users.update','orders.read','orders.update','roles.manage'],
  editor: ['users.read','orders.read','orders.update'],
  viewer: ['orders.read'],
}
function cloneRoles(r: Record<Role, Permission[]>) { return { admin:[...r.admin], editor:[...r.editor], viewer:[...r.viewer] } }
const applied = ref<Record<Role, Permission[]>>(cloneRoles(initial))
const draft = ref<Record<Role, Permission[]>>(cloneRoles(initial))
const role = ref<Role>('editor')
const changed = computed(() => JSON.stringify(applied.value) !== JSON.stringify(draft.value))
const notice = ref('')
const snackbar = ref(false)
const roleOptions = computed(() => (Object.keys(roleLabels) as Role[]).map(k => ({title: ar.value ? roleLabels[k].ar : roleLabels[k].en, value:k})))
function has(id: Permission) { return draft.value[role.value].includes(id) }
function toggle(id: Permission, enabled: boolean) {
  if (role.value === 'admin') return // Immutable system role in this illustrative example.
  const set = new Set(draft.value[role.value])
  if (enabled) set.add(id); else set.delete(id)
  draft.value = { ...draft.value, [role.value]: permissionLabels.map(p => p.id).filter(p => set.has(p)) }
}
function apply() {
  applied.value = cloneRoles(draft.value)
  notice.value = ar.value ? 'تم تطبيق التغيير داخل المعاينة فقط؛ لم تُحفظ الصلاحيات على سيرفر.' : 'Demo matrix applied locally; permissions were not saved to a server.'
  snackbar.value = true
}
function discard() { draft.value = cloneRoles(applied.value) }
</script>

<template>
  <section class="dashboard-page" :dir="ar ? 'rtl' : 'ltr'">
    <div class="mb-5"><div class="text-caption text-medium-emphasis">{{ ar ? 'إدارة الوصول · DEMO' : 'Access management · DEMO' }}</div><h1 class="text-h4 font-weight-bold">{{ ar ? 'الأدوار والصلاحيات' : 'Roles & permissions' }}</h1><p class="text-body-2 text-medium-emphasis">{{ ar ? 'مثال توضيحي على صلاحيات الواجهة؛ ليس نظام صلاحيات حقيقي.' : 'Illustrative UI capabilities, not real backend authorization.' }}</p></div>
    <v-alert type="warning" variant="tonal" class="mb-5" density="compact" :text="ar ? 'الأدوار هنا تجريبية، وتغييرها لا يعطي أي صلاحية فعلية.' : 'Demo only: changing this matrix does not grant or revoke real access.'" />
    <v-card border rounded="lg" variant="flat">
      <v-card-text class="pa-5">
        <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4"><div><h2 class="text-h6">{{ ar ? 'مصفوفة الصلاحيات' : 'Permission matrix' }}</h2><p class="text-caption text-medium-emphasis">{{ ar ? 'اختر الدور ثم عدّل الصلاحيات للتجربة' : 'Choose a role and preview its capabilities' }}</p></div><v-select v-model="role" :items="roleOptions" item-title="title" item-value="value" variant="outlined" density="compact" hide-details style="max-width:230px;min-width:190px" :label="ar ? 'الدور' : 'Role'" /></div>
        <v-alert v-if="role === 'admin'" type="info" variant="tonal" density="compact" class="mb-4" :text="ar ? 'الدور الإداري محمي من التعديل في المثال.' : 'The demo Admin role is read-only in this example.'" />
        <v-table density="comfortable"><thead><tr><th scope="col">{{ ar ? 'الصلاحية' : 'Capability' }}</th><th scope="col" class="text-center">{{ ar ? 'مسموح (DEMO)' : 'Allowed (DEMO)' }}</th></tr></thead><tbody><tr v-for="perm in permissionLabels" :key="perm.id"><td><div class="font-weight-medium">{{ ar ? perm.ar : perm.en }}</div><span class="text-caption text-medium-emphasis" dir="ltr">{{ perm.id }}</span></td><td class="text-center"><v-checkbox-btn :model-value="has(perm.id)" :disabled="role === 'admin'" color="primary" :aria-label="ar ? perm.ar : perm.en" @update:model-value="v => toggle(perm.id, Boolean(v))" /></td></tr></tbody></v-table>
        <div class="d-flex align-center justify-end ga-3 mt-5"><v-btn variant="text" :disabled="!changed" @click="discard">{{ ar ? 'إلغاء التغييرات' : 'Discard changes' }}</v-btn><v-btn color="primary" variant="flat" :disabled="!changed" @click="apply">{{ ar ? 'تطبيق تجريبي' : 'Apply demo changes' }}</v-btn></div>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar" timeout="4500">{{ notice }}<template #actions><v-btn variant="text" @click="snackbar = false">{{ ar ? 'إغلاق' : 'Close' }}</v-btn></template></v-snackbar>
  </section>
</template>
<style scoped>.dashboard-page{max-width:1280px;margin-inline:auto;padding:24px 16px 40px}</style>
