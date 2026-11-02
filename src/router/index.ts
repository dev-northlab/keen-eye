import { createRouter, createWebHistory } from 'vue-router'
import { chapterById } from '../levels/chapters.ts'
import { levelById } from '../levels/index.ts'
import { timeTravelLevelById } from '../levels/time-travel/index.ts'
import { useProgressStore } from '../stores/progress.ts'
import AboutView from '../views/AboutView.vue'
import AnachronismLevelView from '../views/AnachronismLevelView.vue'
import ChapterView from '../views/ChapterView.vue'
import DuoView from '../views/DuoView.vue'
import HomeView from '../views/HomeView.vue'
import LevelMapView from '../views/LevelMapView.vue'
import LevelView from '../views/LevelView.vue'
import MatchView from '../views/MatchView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import SettingsView from '../views/SettingsView.vue'
import TimeTravelView from '../views/TimeTravelView.vue'
import WorldsView from '../views/WorldsView.vue'

// HTML5 history: Vite dev/preview and the Capacitor webview fall back to index.html for unknown paths.
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    // Game modes; "spot the difference" opens its worlds, each world its level grid.
    { path: '/levels', name: 'levels', component: LevelMapView },
    { path: '/worlds', name: 'worlds', component: WorldsView },
    { path: '/levels/:chapter', name: 'chapter', component: ChapterView, props: true },
    {
      path: '/level/:id(\\d+)',
      name: 'level',
      component: LevelView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    // "Find the odd one out" (docs/anachronism-mode.md): open to everyone, no unlock order.
    { path: '/time-travel', name: 'eras', component: TimeTravelView },
    { path: '/time-travel/:id', name: 'time-travel', component: AnachronismLevelView, props: true },
    { path: '/duo', name: 'duo', component: DuoView },
    {
      path: '/duo/:id(\\d+)',
      name: 'match',
      component: MatchView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/full-game', name: 'purchase', component: PurchaseView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global guard (not beforeEnter): beforeEnter is skipped when only params change, e.g. /level/1 → /level/99.
// Unknown chapter → worlds. Unknown level → home; paid level not bought → purchase screen;
// not reached yet → its chapter's grid. Two-player matches need no order, only the purchase for paid levels.
// Unknown "find the odd one out" level → home.
router.beforeEach((to) => {
  if (to.name === 'chapter') return chapterById(String(to.params.chapter)) ? true : { name: 'worlds' }
  if (to.name === 'time-travel') return timeTravelLevelById(String(to.params.id)) ? true : { name: 'home' }
  if (to.name !== 'level' && to.name !== 'match') return true
  const id = Number(to.params.id)
  const progress = useProgressStore()
  const level = levelById(id)
  if (!level) return { name: 'home' }
  if (progress.needsPurchase(id)) return { name: 'purchase' }
  if (to.name === 'match') return true
  return progress.isUnlocked(id) ? true : { name: 'chapter', params: { chapter: level.chapter } }
})
