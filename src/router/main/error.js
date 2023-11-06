import NotFound from '@/views/NotFound.vue'
import ServerError from '@/views/ServerError.vue'
import Forbidden from '@/views/Forbidden.vue'
import ManyRequestError from '@/views/ManyRequestError.vue'

const routes = [
  {
    path: '/error/403',
    name: 'error.403',
    component: Forbidden,
    meta: {
      isShowOnMenu: false
    }
  },
  {
    path: '/error/404',
    name: 'error.404',
    component: NotFound,
    meta: {
      isShowOnMenu: false
    }
  },
  {
    path: '/error/429',
    name: 'error.429',
    component: ManyRequestError,
    meta: {
      isShowOnMenu: false
    }
  },
  {
    path: '/error/500',
    name: 'error.500',
    component: ServerError,
    meta: {
      isShowOnMenu: false
    }
  },
]

export default routes
