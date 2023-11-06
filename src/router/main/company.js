import List from '@/views/company/List.vue'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import Create from '@/views/company/Create.vue'
import Edit from '@/views/company/Edit.vue'
import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  ClearOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons-vue'

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
            icon: 'HomeOutlined',
            icon1: SearchOutlined
          },
          {
            name: 'Tạo mới',
          }
        ]
      }
    },
    {
      path: ':id/edit',
      name: 'company.edit',
      component: Edit,
      meta: {
        name: 'Edit company',
        parentName: 'company',
        title: 'Chỉnh sửa công ty/Cửa hàng',
        breadcrumbs: [
          {
            name: 'Công ty/Cửa hàng',
            route: 'company.list',
            icon: 'HomeOutlined',
            icon1: SearchOutlined
          },
          {
            name: 'Chỉnh sửa',
          }
        ]
      }
    },
  ]
}

export default routes
