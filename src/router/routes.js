import MainLayout from '@/components/layouts/MainLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import Login from '@/views/auth/Login.vue'
import mainRoutes from './main/index'
import AuthRequest from '@/http/requests/Auth'
import { useAuthStore } from '@/stores/auth'
const routes = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'company.list' },
    component: MainLayout,
    children: mainRoutes,
    beforeEnter: async () => {
      try {
        const authStore = useAuthStore()
        const { data } = await AuthRequest.profile()
        authStore.setUser(data)
      } catch (error) {
      }
    }
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'auth.login' },
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: Login
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/error/404",
  }
]

export default routes
