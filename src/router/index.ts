import { createRouter, createWebHistory } from 'vue-router'
import { levelById } from '../levels/index.ts'
import HomeView from '../views/HomeView.vue'
import LevelView from '../views/LevelView.vue'

// HTML5 history: Vite dev/preview and the Capacitor webview fall back to index.html for unknown paths.
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/level/:id(\\d+)',
      name: 'level',
      component: LevelView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global guard (not beforeEnter): beforeEnter is skipped when only params change, e.g. /level/1 → /level/99.
router.beforeEach((to) => (to.name !== 'level' || levelById(Number(to.params.id)) ? true : { name: 'home' }))
