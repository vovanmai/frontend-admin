import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { reactive, watch, h } from 'vue'
import {
  OrderedListOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'

const routes = [
  {
    path: '/companies',
    name: 'home',
    component: HomeView,
    meta: {
      icon: OrderedListOutlined,
      name: 'Công ty/Cửa hàng'
    }
  },
  {
    path: '/admins',
    name: 'sub',
    component: AboutView,
    meta: {
      icon: '<UserOutlined />',
      name: 'Quản trị viên'
    },
    children: [
      {
        path: '/sub1',
        name: 'sub1',
        component: AboutView,
        meta: {
          icon: '<OrderedListOutlined />',
          name: 'Sub1'
        }
      },
      {
        path: '/sub2',
        name: 'sub2',
        component: AboutView,
        meta: {
          icon: '<OrderedListOutlined />',
          name: 'Sub2'
        }
      }
    ]
  }
]

export default routes
