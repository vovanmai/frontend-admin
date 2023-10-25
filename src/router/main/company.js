import List from '@/views/company/List.vue'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import Create from '@/views/company/Create.vue'
import Edit from '@/views/company/Edit.vue'

const routes = {
  path: '/companies',
  name: 'company',
  redirect: { name: 'company.list' },
  component: EmptyLayout,
  meta: {
    name: 'Công ty/Cửa hàng',
    isShowSubMenu: false,
    icon: 'HomeOutlined'
  },
  children: [
    {
      path: 'list',
      name: 'company.list',
      component: List,
      meta: {
        name: 'List company',
        parentName: 'company',
        title: 'Danh sách công ty/Cửa hàng',
        breadcrumbs: [
          {
            name: 'Công ty/Cửa hàng',
            route: 'company.list',
            icon: 'HomeOutlined'
          },
          {
            name: 'Danh sách',
          }
        ]
      }
    },
    {
      path: 'create',
      name: 'company.create',
      component: Create,
      meta: {
        name: 'Create company',
        parentName: 'company',
        title: 'Tạo mới công ty/Cửa hàng',
        breadcrumbs: [
          {
            name: 'Công ty/Cửa hàng',
            route: 'company.list',
            icon: 'HomeOutlined'
          },
          {
            name: 'Tạo mới',
          }
        ]
      }
    },
    {
      path: 'edit',
      name: 'company.edit',
      component: Edit,
      meta: {
        name: 'Edit company',
        parentName: 'company',
      }
    }
  ]
}

export default routes
