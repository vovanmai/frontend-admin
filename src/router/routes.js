import MainLayout from '../components/layouts/MainLayout.vue'
import mainRoutes from './main/index'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'company.list' },
    component: MainLayout,
    meta: {},
    children: mainRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/error/404",
  }
]

export default routes
