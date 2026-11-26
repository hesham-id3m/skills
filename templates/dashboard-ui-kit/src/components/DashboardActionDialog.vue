<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  destructive?: boolean
  busy?: boolean
}>(), { destructive: false, busy: false })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; confirm: [] }>()
const open = ref(props.modelValue)
watch(() => props.modelValue, (v) => { open.value = v })
watch(open, (v) => emit('update:modelValue', v))
</script>

<template>
  <v-dialog v-model="open" max-width="480" :persistent="busy" aria-modal="true">
    <v-card rounded="lg">
      <v-card-title class="text-h6 pa-5 pb-2">{{ title }}</v-card-title>
      <v-card-text class="px-5 pb-4 text-body-2">{{ message }}</v-card-text>
      <v-card-actions class="px-5 pb-5 ga-2 justify-end">
        <v-btn variant="text" :disabled="busy" @click="open = false">{{ cancelText }}</v-btn>
        <v-btn :color="destructive ? 'error' : 'primary'" variant="flat" :loading="busy" @click="emit('confirm')">{{ confirmText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
