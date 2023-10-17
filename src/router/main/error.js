import NotFound from '@/views/NotFound.vue'
import ServerError from '@/views/ServerError.vue'

const routes = [
  {
    path: '/error/404',
    name: 'error-400',
    component: NotFound,
    meta: {
      isShowOnMenu: false
    }
  },
  {
    path: '/error/500',
    name: 'error-500',
    component: ServerError,
    meta: {
      isShowOnMenu: false
    }
  },
]

export default routes
