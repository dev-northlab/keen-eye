import { App } from '@capacitor/app'
import { onBeforeUnmount, onMounted } from 'vue'

// Android system back button. Screens with their own behavior register a handler while mounted;
// otherwise the fallback given to initBackButton runs. Never fires in a desktop browser.

type Handler = () => void

const handlers: Handler[] = []

export function initBackButton(fallback: Handler): void {
  App.addListener('backButton', () => (handlers.at(-1) ?? fallback)()).catch(() => {})
}

/** Closes the app (Android; iOS forbids it, and the back button that leads here never fires there or in a browser). */
export function exitApp(): void {
  App.exitApp().catch(() => {})
}

/** Handles the back button until the returned function is called (e.g. while a popup is open). */
export function pushBackHandler(handler: Handler): () => void {
  handlers.push(handler)
  return () => {
    const i = handlers.lastIndexOf(handler)
    if (i >= 0) handlers.splice(i, 1)
  }
}

/** Handles the back button while the calling component is mounted. */
export function useBackButton(handler: Handler): void {
  let remove = () => {}
  onMounted(() => (remove = pushBackHandler(handler)))
  onBeforeUnmount(() => remove())
}
