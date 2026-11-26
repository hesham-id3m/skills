import { readonly, ref } from 'vue'

// DEMO-only workspace preview. This is NOT real login, authorization or identity.
// A real application MUST use a verified backend session and enforce access on its API.
const KEY = 'account.preview.demo.v1'

function readPreview(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

const previewActive = ref(readPreview())

function setStored(value: boolean): void {
  previewActive.value = value
  if (typeof window === 'undefined') return
  try {
    if (value) window.sessionStorage.setItem(KEY, '1')
    else window.sessionStorage.removeItem(KEY)
  } catch {
    // In private browsing with blocked storage, the active-tab ref still works.
  }
}

export function useAccountPreview() {
  return {
    previewActive: readonly(previewActive),
    enterPreview: () => setStored(true),
    exitPreview: () => setStored(false),
  }
}
