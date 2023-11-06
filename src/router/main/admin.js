import ListAdmin from '@/views/admin/List.vue'

const routes = {
  path: '/admins',
  name: 'admin',
  component: ListAdmin,
  meta: {
    name: 'Quản trị viên',
    icon: 'UserOutlined',
    breadcrumbs: [
      {
        name: 'Quản trị viên',
        route: 'admin',
        icon: 'UserOutlined'
      },
      {
        name: 'Danh sách',
      }
    ]
  },
}

export default routes
