import MainLayout from '@/components/layouts/MainLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import Login from '@/views/auth/Login.vue'
import mainRoutes from './main/index'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'company.list' },
    component: MainLayout,
    children: mainRoutes
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
