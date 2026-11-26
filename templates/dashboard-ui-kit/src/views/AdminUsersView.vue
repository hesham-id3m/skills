<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardActionDialog from '../components/DashboardActionDialog.vue'

type PreviewRole = 'admin' | 'editor' | 'viewer'
type PreviewStatus = 'active' | 'disabled'
interface DemoUser { id: string; name: string; role: PreviewRole; status: PreviewStatus }
const props = withDefaults(defineProps<{ locale?: 'en' | 'ar' }>(), { locale: 'en' })
const ar = computed(() => props.locale === 'ar')
const users = ref<DemoUser[]>([
  { id: 'DEMO-USER-01', name: 'Sample user A', role: 'editor', status: 'active' },
  { id: 'DEMO-USER-02', name: 'Sample user B', role: 'viewer', status: 'active' },
  { id: 'DEMO-USER-03', name: 'Sample user C', role: 'admin', status: 'disabled' },
])
const search = ref('')
const roleFilter = ref<string>('all')
const demoPersona = ref<'admin' | 'viewer'>('admin')
const canEdit = computed(() => demoPersona.value === 'admin') // DEMO ONLY. NOT access control.
const filtered = computed(() => users.value.filter(u => (roleFilter.value === 'all' || u.role === roleFilter.value) && `${u.name} ${u.id} ${u.role}`.toLowerCase().includes(search.value.toLowerCase().trim())))
const headers = computed(() => [
  { title: ar.value ? 'المستخدم' : 'User', key: 'name' },
  { title: ar.value ? 'المعرف' : 'ID', key: 'id' },
  { title: ar.value ? 'الدور' : 'Role', key: 'role' },
  { title: ar.value ? 'الحالة' : 'Status', key: 'status' },
  { title: ar.value ? 'الإجراءات' : 'Actions', key: 'actions', sortable: false },
])
const roleItems = computed(() => [
  { title: ar.value ? 'مدير (تجريبي)' : 'Admin (demo)', value: 'admin' },
  { title: ar.value ? 'محرر (تجريبي)' : 'Editor (demo)', value: 'editor' },
  { title: ar.value ? 'مشاهد (تجريبي)' : 'Viewer (demo)', value: 'viewer' },
])
const roleFilters = computed(() => [{ title: ar.value ? 'كل الأدوار' : 'All roles', value: 'all' }, ...roleItems.value])
const editing = ref(false)
const targetId = ref('')
const draftRole = ref<PreviewRole>('viewer')
const confirming = ref(false)
const targetStatusId = ref('')
const notice = ref('')
const snackbar = ref(false)
function showNotice(msg: string) { notice.value = msg; snackbar.value = true }
function editUser(user: DemoUser) {
  if (!canEdit.value) return
  targetId.value = user.id
  draftRole.value = user.role
  editing.value = true
}
function saveRole() {
  if (!canEdit.value) return
  const user = users.value.find(x => x.id === targetId.value)
  if (!user) return
  user.role = draftRole.value
  editing.value = false
  showNotice(ar.value ? 'تم تغيير الدور في المعاينة فقط؛ لم يتم الحفظ على سيرفر.' : 'Demo role changed locally; not saved to a server.')
}
function requestStatus(user: DemoUser) {
  if (!canEdit.value) return
  targetStatusId.value = user.id
  confirming.value = true
}
function confirmStatus() {
  const user = users.value.find(x => x.id === targetStatusId.value)
  if (user && canEdit.value) user.status = user.status === 'active' ? 'disabled' : 'active'
  confirming.value = false
  showNotice(ar.value ? 'تغيّر وضع المستخدم تجريبيًا فقط، بدون حفظ فعلي.' : 'Demo status changed locally; no backend update was made.')
}
</script>

<template>
  <section class="dashboard-page" :dir="ar ? 'rtl' : 'ltr'">
    <div class="d-flex align-start justify-space-between flex-wrap ga-3 mb-5">
      <div><div class="text-caption text-medium-emphasis">{{ ar ? 'إدارة · DEMO' : 'Administration · DEMO' }}</div><h1 class="text-h4 font-weight-bold">{{ ar ? 'إدارة المستخدمين' : 'User management' }}</h1><div class="text-body-2 text-medium-emphasis">{{ ar ? 'جدول وأدوار وإجراءات تجريبية فقط.' : 'Preview-only table, roles and actions.' }}</div></div>
      <v-btn color="primary" variant="flat" prepend-icon="mdi-account-plus-outline" @click="showNotice(ar ? 'الدعوة تتطلب API — لم تُرسل أي رسالة.' : 'Invite requires an API — no invitation was sent.')">{{ ar ? 'دعوة مستخدم' : 'Invite user' }}</v-btn>
    </div>
    <v-alert type="warning" variant="tonal" density="compact" class="mb-5" :text="ar ? 'هذه معاينة إدارية غير آمنة: الأدوار في المتصفح ليست نظام صلاحيات.' : 'DEMO ONLY: browser-side roles do not authorize access to real users or operations.'" />
    <v-card rounded="lg" border variant="flat">
      <v-card-text class="pa-5 pb-2">
        <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
          <div><h2 class="text-h6">{{ ar ? 'المستخدمون (تجريبي)' : 'Users (sample)' }}</h2><span class="text-caption text-medium-emphasis">{{ filtered.length }} / {{ users.length }}</span></div>
          <v-select v-model="demoPersona" density="compact" variant="outlined" hide-details style="max-width:240px; min-width:190px" :label="ar ? 'وضع المعاينة' : 'Preview persona'" :items="[{title:ar ? 'مدير تجريبي':'Demo admin',value:'admin'},{title:ar ? 'مشاهد تجريبي':'Demo viewer',value:'viewer'}]" />
        </div>
        <div class="d-flex flex-wrap ga-3 mb-4">
          <v-text-field v-model="search" clearable density="compact" variant="outlined" hide-details prepend-inner-icon="mdi-magnify" style="max-width:320px; min-width:190px" :label="ar ? 'بحث باسم أو معرف' : 'Search name or ID'" />
          <v-select v-model="roleFilter" density="compact" variant="outlined" hide-details :items="roleFilters" item-title="title" item-value="value" style="max-width:220px; min-width:160px" :label="ar ? 'تصفية الدور' : 'Filter role'" />
          <v-btn variant="text" @click="search = ''; roleFilter = 'all'">{{ ar ? 'مسح الفلاتر' : 'Clear filters' }}</v-btn>
        </div>
      </v-card-text>
      <v-data-table :headers="headers" :items="filtered" item-value="id" :items-per-page="5" density="comfortable">
        <template #item.id="{ item }"><span dir="ltr" class="text-body-2">{{ item.id }}</span></template>
        <template #item.role="{ item }"><v-chip size="small" variant="tonal">{{ roleItems.find(r => r.value === item.role)?.title || item.role }}</v-chip></template>
        <template #item.status="{ item }"><v-chip size="small" :color="item.status === 'active' ? 'success' : 'secondary'" variant="tonal">{{ ar ? (item.status === 'active' ? 'نشط' : 'موقوف') : (item.status === 'active' ? 'Active' : 'Disabled') }}</v-chip></template>
        <template #item.actions="{ item }">
          <v-menu v-if="canEdit"><template #activator="{ props: menuProps }"><v-btn v-bind="menuProps" icon="mdi-dots-horizontal" variant="text" size="small" :aria-label="ar ? 'إجراءات المستخدم' : 'User actions'" /></template>
            <v-list density="compact"><v-list-item prepend-icon="mdi-pencil-outline" :title="ar ? 'تعديل الدور' : 'Change role'" @click="editUser(item)" /><v-list-item :prepend-icon="item.status === 'active' ? 'mdi-account-off-outline' : 'mdi-account-check-outline'" :title="ar ? (item.status === 'active' ? 'إيقاف تجريبي' : 'تفعيل تجريبي') : (item.status === 'active' ? 'Disable (demo)' : 'Activate (demo)')" @click="requestStatus(item)" /></v-list>
          </v-menu><span v-else class="text-caption text-medium-emphasis">{{ ar ? 'عرض فقط' : 'View only' }}</span>
        </template>
        <template #no-data><div class="pa-6 text-medium-emphasis">{{ ar ? 'لا توجد نتائج. جرّب مسح الفلاتر.' : 'No results. Clear filters and try again.' }}</div></template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="editing" max-width="480"><v-card rounded="lg"><v-card-title class="text-h6 pa-5 pb-1">{{ ar ? 'تغيير الدور (DEMO)' : 'Change role (DEMO)' }}</v-card-title><v-card-text class="px-5"><p class="mb-4 text-body-2 text-medium-emphasis">{{ ar ? 'تعديل محلي للتوضيح فقط؛ لن يتم تحديث السيرفر.' : 'Local preview only — no server update.' }}</p><v-select v-model="draftRole" variant="outlined" :items="roleItems" item-title="title" item-value="value" :label="ar ? 'الدور الجديد' : 'New role'" /></v-card-text><v-card-actions class="pa-5 pt-0 justify-end ga-2"><v-btn variant="text" @click="editing = false">{{ ar ? 'إلغاء' : 'Cancel' }}</v-btn><v-btn color="primary" variant="flat" @click="saveRole">{{ ar ? 'تطبيق تجريبي' : 'Apply demo change' }}</v-btn></v-card-actions></v-card></v-dialog>
    <DashboardActionDialog v-model="confirming" :title="ar ? 'تغيير حالة المستخدم؟' : 'Change user status?'" :message="ar ? 'سيتم تغيير الحالة داخل هذه المعاينة فقط.' : 'Status will change inside this preview only.'" :confirm-text="ar ? 'تأكيد التغيير' : 'Confirm demo change'" :cancel-text="ar ? 'إلغاء' : 'Cancel'" destructive @confirm="confirmStatus" />
    <v-snackbar v-model="snackbar" timeout="4500">{{ notice }}<template #actions><v-btn variant="text" @click="snackbar = false">{{ ar ? 'إغلاق' : 'Close' }}</v-btn></template></v-snackbar>
  </section>
</template>
<style scoped>.dashboard-page{max-width:1280px;margin-inline:auto;padding:24px 16px 40px}</style>
