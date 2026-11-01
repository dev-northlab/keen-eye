import { App } from '@capacitor/app'
import { onBeforeUnmount, onMounted } from 'vue'

// Android system back button. Screens with their own behavior register a handler while mounted;
// otherwise the fallback given to initBackButton runs. Never fires in a desktop browser.

type Handler = () => void

const handlers: Handler[] = []

export function initBackButton(fallback: Handler): void {
  App.addListener('backButton', () => (handlers.at(-1) ?? fallback)()).catch(() => {})
}

export function exitApp(): void {
  App.exitApp().catch(() => {})
}

/** Handles the back button while the calling component is mounted. */
export function useBackButton(handler: Handler): void {
  onMounted(() => handlers.push(handler))
  onBeforeUnmount(() => {
    const i = handlers.lastIndexOf(handler)
    if (i >= 0) handlers.splice(i, 1)
  })
}
