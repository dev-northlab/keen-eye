import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n/index.ts'
import { router } from './router/index.ts'
import { playSfx } from './services/audio.ts'
import { useProgressStore } from './stores/progress.ts'
import { useSettingsStore } from './stores/settings.ts'
import './style.css'

const app = createApp(App).use(createPinia()).use(i18n)
// Saved progress and settings are loaded before routing: the level guard needs them.
await Promise.all([useProgressStore().load(), useSettingsStore().load()])
app.use(router).mount('#app')

// Button press sound for the whole UI.
document.addEventListener('click', (e) => {
  if ((e.target as Element).closest?.('button:not(:disabled)')) playSfx('click')
})
