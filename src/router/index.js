import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import { useAppStore } from '@/stores/app'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to) => {
  const app = useAppStore()
  // app.setLoading()
})

router.afterEach((to, from) => {})

export default router
