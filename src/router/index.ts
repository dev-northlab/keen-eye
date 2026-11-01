import { createRouter, createWebHistory } from 'vue-router'
import { levelById } from '../levels/index.ts'
import { useProgressStore } from '../stores/progress.ts'
import HomeView from '../views/HomeView.vue'
import LevelMapView from '../views/LevelMapView.vue'
import LevelView from '../views/LevelView.vue'
import SettingsView from '../views/SettingsView.vue'

// HTML5 history: Vite dev/preview and the Capacitor webview fall back to index.html for unknown paths.
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/levels', name: 'levels', component: LevelMapView },
    {
      path: '/level/:id(\\d+)',
      name: 'level',
      component: LevelView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global guard (not beforeEnter): beforeEnter is skipped when only params change, e.g. /level/1 → /level/99.
router.beforeEach((to) => {
  if (to.name !== 'level') return true
  const id = Number(to.params.id)
  if (!levelById(id)) return { name: 'home' }
  return useProgressStore().isUnlocked(id) ? true : { name: 'levels' }
})
