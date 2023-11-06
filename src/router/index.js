import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to) => {
  // const app = useAppStore()
  // app.setLoading()
  document.title = (to.meta.title ?? 'Mana4.0') + '- Mana4.0'
})

router.afterEach((to, from) => {})

export default router
