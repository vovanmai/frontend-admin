import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
    {
        path: '/companies',
        name: 'company.list',
        component: HomeView,
        meta: {
            icon: '<OrderedListOutlined />',
            name: 'Công ty/Cửa hàng'
        }
    },
    {
        path: '/admins',
        name: 'admin',
        component: AboutView,
        meta: {
            icon: '<UserOutlined />',
            name: 'Quản trị viên'
        }
    },
]

export default routes