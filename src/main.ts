import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n/index.ts'
import { router } from './router/index.ts'
import { playSfx } from './services/audio.ts'
import { initBackButton } from './services/backButton.ts'
import { vibrateTap } from './services/haptics.ts'
import { useDuoStore } from './stores/duo.ts'
import { useProgressStore } from './stores/progress.ts'
import { usePurchaseStore } from './stores/purchase.ts'
import { useSettingsStore } from './stores/settings.ts'
import './style.css'

const app = createApp(App).use(createPinia()).use(i18n)
// Saved progress, settings and purchase are loaded before routing: the level guard needs them.
await Promise.all([useProgressStore().load(), useSettingsStore().load(), usePurchaseStore().load(), useDuoStore().load()])
// Price and the cached purchase are refreshed from the store in the background.
usePurchaseStore().sync()
app.use(router).mount('#app')

// Android back goes home from any screen without a handler of its own (the level pauses first, the home screen asks
// before closing the app).
initBackButton(() => router.push({ name: 'home' }))

// Button press sound and a calm tick for the whole UI.
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest?.('button:not(:disabled)')) return
  playSfx('click')
  vibrateTap()
})
