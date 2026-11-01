import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n/index.ts'
import { router } from './router/index.ts'
import { playSfx } from './services/audio.ts'
import { exitApp, initBackButton } from './services/backButton.ts'
import { useProgressStore } from './stores/progress.ts'
import { usePurchaseStore } from './stores/purchase.ts'
import { useSettingsStore } from './stores/settings.ts'
import './style.css'

const app = createApp(App).use(createPinia()).use(i18n)
// Saved progress, settings and purchase are loaded before routing: the level guard needs them.
await Promise.all([useProgressStore().load(), useSettingsStore().load(), usePurchaseStore().load()])
// Price and the cached purchase are refreshed from the store in the background.
usePurchaseStore().sync()
app.use(router).mount('#app')

// Android back: from the home screen it closes the app, from any other screen it goes home
// (the level screen handles it itself: pause first).
initBackButton(() => (router.currentRoute.value.name === 'home' ? exitApp() : router.push({ name: 'home' })))

// Button press sound for the whole UI.
document.addEventListener('click', (e) => {
  if ((e.target as Element).closest?.('button:not(:disabled)')) playSfx('click')
})
