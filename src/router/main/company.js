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
    showSubMenu: true
  },
  children: [
    {
      path: 'list',
      name: 'company.list',
      component: List,
      meta: {
        name: 'List company'
      }
    },
    {
      path: 'create',
      name: 'company.create',
      component: Create,
      meta: {
        name: 'Create company'
      }
    },
    {
      path: 'edit',
      name: 'company.edit',
      component: Edit,
      meta: {
        name: 'Edit company',
      }
    }
  ]
}

export default routes
