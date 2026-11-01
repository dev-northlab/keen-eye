import { createRouter, createWebHistory } from 'vue-router'
import { chapterById } from '../levels/chapters.ts'
import { levelById } from '../levels/index.ts'
import { useProgressStore } from '../stores/progress.ts'
import ChapterView from '../views/ChapterView.vue'
import HomeView from '../views/HomeView.vue'
import LevelMapView from '../views/LevelMapView.vue'
import LevelView from '../views/LevelView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import SettingsView from '../views/SettingsView.vue'

// HTML5 history: Vite dev/preview and the Capacitor webview fall back to index.html for unknown paths.
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/levels', name: 'levels', component: LevelMapView },
    { path: '/levels/:chapter', name: 'chapter', component: ChapterView, props: true },
    {
      path: '/level/:id(\\d+)',
      name: 'level',
      component: LevelView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/full-game', name: 'purchase', component: PurchaseView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global guard (not beforeEnter): beforeEnter is skipped when only params change, e.g. /level/1 → /level/99.
// Unknown chapter → chapter map. Unknown level → home; paid level not bought → purchase screen;
// not reached yet → its chapter's grid.
router.beforeEach((to) => {
  if (to.name === 'chapter') return chapterById(String(to.params.chapter)) ? true : { name: 'levels' }
  if (to.name !== 'level') return true
  const id = Number(to.params.id)
  const progress = useProgressStore()
  const level = levelById(id)
  if (!level) return { name: 'home' }
  if (progress.needsPurchase(id)) return { name: 'purchase' }
  return progress.isUnlocked(id) ? true : { name: 'chapter', params: { chapter: level.chapter } }
})
