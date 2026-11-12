import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { type BackdropTheme, chapterById, DETECTIVE_CHAPTER, levelsScreen, TINY_BOY_CHAPTER, TRAVEL_CHAPTER, TREASURY_CHAPTER } from '../levels/chapters.ts'
import { caseById } from '../levels/detective/cases.ts'
import { levelById } from '../levels/index.ts'
import { styledLevel } from '../levels/picture-style.ts'
import { timeTravelLevelById } from '../levels/time-travel/index.ts'
import { isUpcoming } from '../levels/upcoming.ts'
import { preloadBackdrop } from '../services/backdrops.ts'
import { preloadTinyBoyBanners } from '../services/banners.ts'
import { preloadPictures, waitAtMost } from '../services/images.ts'
import { useProgressStore } from '../stores/progress.ts'
import { usePurchaseStore } from '../stores/purchase.ts'
import { useSettingsStore } from '../stores/settings.ts'
import AboutView from '../views/AboutView.vue'
import AnachronismLevelView from '../views/AnachronismLevelView.vue'
import CaseView from '../views/CaseView.vue'
import ChapterView from '../views/ChapterView.vue'
import DetectiveView from '../views/DetectiveView.vue'
import DuoView from '../views/DuoView.vue'
import HomeView from '../views/HomeView.vue'
import LevelMapView from '../views/LevelMapView.vue'
import LevelView from '../views/LevelView.vue'
import MatchView from '../views/MatchView.vue'
import MemoryLevelView from '../views/MemoryLevelView.vue'
import PassportView from '../views/PassportView.vue'
import SettingsView from '../views/SettingsView.vue'
import TimeTravelView from '../views/TimeTravelView.vue'
import TinyBoyView from '../views/TinyBoyView.vue'
import TravelView from '../views/TravelView.vue'
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
    // "Memory" (docs/memory-mode.md): numbered levels of the 'memory' category with their own screen.
    {
      path: '/memory/:id(\\d+)',
      name: 'memory',
      component: MemoryLevelView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    // "Find the odd one out" (docs/anachronism-mode.md): no unlock order; all eras but the first need the purchase.
    { path: '/time-travel', name: 'eras', component: TimeTravelView },
    { path: '/time-travel/:id', name: 'time-travel', component: AnachronismLevelView, props: true },
    // "Travel" (docs/world-travel-mode.md): numbered levels of the 'travel' category, listed on a world map.
    { path: '/travel', name: 'travel', component: TravelView },
    { path: '/travel/passport', name: 'passport', component: PassportView },
    // "Detective" (docs/detective-mode.md): numbered levels of the 'detective' category, grouped into cases.
    { path: '/detective', name: 'detective', component: DetectiveView },
    { path: '/detective/:case', name: 'case', component: CaseView, props: true },
    // "Tiny boy": numbered levels of the 'tinyBoy' category, listed as picture banners.
    { path: '/tiny-boy', name: 'tiny-boy', component: TinyBoyView },
    { path: '/duo', name: 'duo', component: DuoView },
    {
      path: '/duo/:id(\\d+)',
      name: 'match',
      component: MatchView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/settings', name: 'settings', component: SettingsView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global guard (not beforeEnter): beforeEnter is skipped when only params change, e.g. /level/1 → /level/99.
// Unknown chapter → worlds, "travel" → its world map, "detective" → its cases (an unknown case too), "tiny boy" → its banners, the treasury → game modes. Unknown level → home; paid level not bought → purchase
// screen; not reached yet → its chapter's grid (or the world map). Two-player matches need no order, only the purchase for paid levels.
// Unknown "find the odd one out" level → home, a paid one not bought → purchase screen. A "memory" level plays only on its own
// screen (/level/<id> leads there), no other level does.
router.beforeEach((to, from) => {
  if (to.name === 'chapter') {
    if (to.params.chapter === TRAVEL_CHAPTER.id) return { name: 'travel' }
    if (to.params.chapter === DETECTIVE_CHAPTER.id) return { name: 'detective' }
    if (to.params.chapter === TINY_BOY_CHAPTER.id) return { name: 'tiny-boy' }
    if (to.params.chapter === TREASURY_CHAPTER.id) return { name: 'levels' }
    return chapterById(String(to.params.chapter)) ? true : { name: 'worlds' }
  }
  if (to.name === 'case') return caseById(String(to.params.case)) ? true : { name: 'detective' }
  const progress = useProgressStore()
  // Offer the full game over the current screen; a direct link to the level lands on the home screen.
  const offerPurchase = () => {
    usePurchaseStore().dialogOpen = true
    return from.matched.length ? false : { name: 'home' }
  }
  if (to.name === 'time-travel') {
    const era = timeTravelLevelById(String(to.params.id))
    if (!era) return { name: 'home' }
    return progress.needsPurchase(era.number) ? offerPurchase() : true
  }
  if (to.name !== 'level' && to.name !== 'match' && to.name !== 'memory') return true
  const id = Number(to.params.id)
  const level = levelById(id)
  // Hidden levels (levels/upcoming.ts) play only in developer mode.
  if (!level || (isUpcoming(id) && !useSettingsStore().developer)) return { name: 'home' }
  if ((to.name === 'memory') !== !!level.memory)
    return level.memory && to.name === 'level' ? { name: 'memory', params: { id } } : { name: 'home' }
  if (progress.needsPurchase(id)) return offerPurchase()
  if (to.name === 'match') return true
  return progress.isUnlocked(id) ? true : levelsScreen(level)
})

/** The backdrop a screen shows (`ScreenBackdrop` in its view), or none: levels and duels show only their pictures. */
function backdropOf(to: RouteLocationNormalized): BackdropTheme | undefined {
  switch (to.name) {
    case 'level':
    case 'memory':
    case 'match':
    case 'time-travel':
      return undefined
    case 'chapter':
      return chapterById(String(to.params.chapter))?.backdrop
    case 'tiny-boy':
      return TINY_BOY_CHAPTER.backdrop
    case 'detective':
    case 'case':
      return DETECTIVE_CHAPTER.backdrop
    default:
      return 'meadow'
  }
}

// A screen opens once its big pictures are downloaded and decoded (services/images.ts), as a game engine loads a
// scene: a picture level's (redesigned style, "tiny boy") show at once instead of a spinner over the board while the
// timer runs, a backdrop picture is there as the screen appears instead of popping in over its sky, and so are the
// photos of the "tiny boy" banners.
router.beforeResolve(async (to) => {
  const backdrop = backdropOf(to)
  if (backdrop) {
    const banners = to.name === 'tiny-boy' ? preloadTinyBoyBanners() : undefined
    return waitAtMost(Promise.all([preloadBackdrop(backdrop), banners]))
  }
  if (to.name !== 'level' && to.name !== 'match' && to.name !== 'memory') return
  const level = levelById(Number(to.params.id))
  if (level) await waitAtMost(preloadPictures(styledLevel(level, useSettingsStore().pictureStyle)))
})
