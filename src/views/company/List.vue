<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100 card-search">
    <template #title>
      <h3><SearchOutlined />Tìm kiếm</h3>
    </template>
    <a-form
      ref="formRef"
      layout="vertical"
      :model="formSearch"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="code"
            label="Mã code"
            :rules="rules.code"
          >
            <a-input v-model:value="formSearch.code" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="name"
            label="Tên"
            :rules="rules.name"
          >
            <a-input v-model:value="formSearch.name" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
            label="Email"
            :rules="rules.email"
          >
            <a-input v-model:value="formSearch.email" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="tax_code"
            label="Mã số thuế"
            :rules="rules.tax_code"
          >
            <a-input v-model:value="formSearch.tax_code" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="representative"
            label="Người đại diện"
            :rules="rules.representative"
          >
            <a-input v-model:value="formSearch.representative" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="phone"
            label="Số điện thoại"
            :rules="rules.phone"
          >
            <a-input v-model:value="formSearch.phone" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="address"
            label="Địa chỉ"
            :rules="rules.address"
          >
            <a-input v-model:value="formSearch.address" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="start_date"
          >
            <template #label>
              <a-tooltip title="Ngày tạo">
                Ngày tạo
              </a-tooltip>
            </template>
            <a-range-picker
              class="w-100"
              :allow-empty="[true, true]"
              :presets="rangePresets()"
              v-model:value="formSearch.created_at"
              :placeholder="['Thời gian bắt đầu', 'Thời gian kết thúc']"
            />
          </a-form-item>
        </a-col>
        <a-col
          class="gutter-row d-flex align-item-end"
          :xs="{ span: 24}"
          :sm="{ span: 12}"
          :md="{ span: 12}"
          :lg="{ span: 6}"
          :xl="{ span: 6, offset: offsetCol }">
          <a-form-item>
            <a-space>
              <a-tooltip title="Tìm kiếm">
                <a-button
                  type="primary"
                  html-type="submit"
                ><SearchOutlined /></a-button>
              </a-tooltip>
              <a-tooltip title="Xóa/Reset">
                <a-button @click="resetForm" type="default"><ClearOutlined /></a-button>
              </a-tooltip>
              <a-button type="link" class="pl-01" @click="showMore">
                {{ isShowMore ? 'Ẩn' : 'Hiện' }}
                <DownOutlined v-show="!isShowMore" />
                <UpOutlined v-show="isShowMore" />
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <a-card :loading="false" size="small" class="mt-15 w-100">
    <template #title>
      <h3><UnorderedListOutlined class="pr-5" />Danh sách</h3>
    </template>
    <template #extra>
      <router-link :to="{ name: 'company.create' }">
        <a-button
          type="primary"
        ><PlusCircleOutlined />Tạo mới</a-button>
      </router-link>
    </template>
    <a-table
      :scroll="{ x: true }"
      :showSorterTooltip="false"
      :bordered="true"
      :columns="columns"
      :data-source="companyList"
      :loading="loading"
      :pagination="pagination"
      :sort-directions="['ascend', 'descend']"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-dropdown
            arrow
            placement="bottom"
          >
            <div class="action-menu">
              <img src="@/assets/img/icons/icon-action.svg" alt="">
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <router-link :to="{ name: 'company.edit', params: { id: record.id }}">
                    <EditOutlined />
                    <span class="ml-5">Chỉnh sửa</span>
                  </router-link>
                </a-menu-item>
                <a-menu-item>
                  <router-link :to="{ name: 'company.edit', params: { id: record.id }, query: { step: 3 }}">
                    <InfoCircleOutlined />
                    <span class="ml-5">Chi tiết</span>
                  </router-link>
                </a-menu-item>
                <a-menu-item @click="deleteCompany(record.id)">
                  <DeleteOutlined />
                  <span class="ml-5">Xóa</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Constant from '@/constants/constant'
import { showNotification, rangePresets } from '@/common/helper'
import { useRouter } from "vue-router";
const router = useRouter()
import { useAppStore } from '@/stores/app'
import companyRequest from '@/http/requests/Company'
const app = useAppStore()
import { isEmpty, pickBy, get, cloneDeep } from 'lodash';
import {
  Row as ARow,
  Col as ACol,
  Form as AForm,
  Card as ACard,
  FormItem as AFormItem,
  Input as AInput,
  Button as AButton,
  Space as ASpace,
  Tooltip as ATooltip,
  DatePicker as ADatePicker,
  RangePicker as ARangePicker,
  Table as ATable,
  Pagination as APagination,
  Menu as AMenu,
  MenuItem as AMenuItem,
  Dropdown as ADropdown,
  Popconfirm as APopconfirm,
  Tour as ATour,
  Modal,
} from 'ant-design-vue'
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
import { reactive, ref, computed, h } from 'vue';
import dayjs from 'dayjs';
const formRef = ref(null);

const formSearch = reactive({
  name: '',
  code: '',
  phone: '',
  tax_code: '',
  email: '',
  representative: '',
  address: '',
  created_at: [],
})

const pagination = reactive({
  total: null,
  current: 1,
  pageSize: 15,
  showTotal: (total, range) => `${range[0]}-${range[1]} của tổng ${total}`,
  pageSizeOptions: ['15', '30', '50', '100']
})

const rules = {
  code: [
    { max: 50, message: 'Không được lớn hơn 50 ký tự.'},
    { pattern: Constant.REGEX_CODE, message: 'Không đúng định dạng (bao gồm: a-zA-Z0-9-_)' },
  ],
  name: [
    { max: 100, message: 'Không được lớn hơn 100 ký tự.'},
  ],
  representative: [
    { max: 100, message: 'Không được lớn hơn 100 ký tự.'},
  ],
  email: [
    { type: 'email', message: 'Địa chỉ email không hợp lệ.' },
    { max: 100, message: 'Không được lớn hơn 100 ký tự.'},
  ],
  phone: [
    { pattern: Constant.REGEX_PHONE, message: 'Số điện thoại không hợp lệ.' },
  ],
  tax_code: [
    { pattern: Constant.REGEX_TAX_CODE, message: 'Mã số thuế không hợp lệ.' },
  ],
  address: [
    { max: 255, message: 'Không được lớn hơn 255 ký tự.'},
  ],
}

const offsetCol = ref(0)

const isShowMore = ref(false)

const loading = ref(false)

const companyList = ref([])

const showMore = () => {
  isShowMore.value = !isShowMore.value
  if (isShowMore.value) {
    offsetCol.value = 18
  } else {
    offsetCol.value = 0
  }
}
const onFinish = values => {
  if (loading.value) {
    return
  }
  loading.value = true
  let dataSearch = cloneDeep(formSearch)
  if (get(dataSearch, 'created_at.0')) {
    dataSearch.created_at_from = get(dataSearch, 'created_at.0').format('YYYY-MM-DD')
  }

  if (get(dataSearch, 'created_at.1')) {
    dataSearch.created_at_to = get(dataSearch, 'created_at.1').format('YYYY-MM-DD')
  }
  dataSearch.created_at = ''
  dataSearch = pickBy(dataSearch, (value) => { return value !== '' })
  router.push({name: 'company.list', query: dataSearch})
  getCompanies(dataSearch)
};
const onFinishFailed = errorInfo => {
};
const resetForm = () => {
  router.push({name: 'company.list'})
  formRef.value.resetFields();
  formSearch.code = ''
  formSearch.created_at = []
  formSearch.name = ''
  formSearch.phone = ''
  formSearch.tax_code = ''
  formSearch.email = ''
  formSearch.representative = ''
  formSearch.address = ''
  formSearch.start_date = ''
  pagination.pageSize = 15
  getCompanies()
};
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'Mã code',
    dataIndex: 'code',
    sorter: true,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Người đại diện',
    dataIndex: 'representative',
  },
  {
    title: 'Địa chỉ email',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
  },
  {
    title: 'Mã số thuế',
    dataIndex: 'tax_code',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    sorter: true,
  },
  {
    title: 'Hành động',
    key: 'action',
  },
];
const handleTableChange = (paginationData, filters, sorter, extra) => {
  pagination.current = paginationData.current
  pagination.pageSize = paginationData.pageSize
  pagination.total = paginationData.total

  let params = {
    ...formSearch,
    per_page: paginationData.pageSize,
    page: paginationData.current,
  }
  if (!isEmpty(sorter) && sorter.order) {
    params.sort_column = sorter.field
    params.sort_direction = sorter.order === 'ascend' ? 'asc' : 'desc'
  }

  params = pickBy(params, (value) => { return (value !== '' && value !== null && value !== undefined) })
  router.push({name: 'company.list', query: params})
  getCompanies(params)
}

const deleteCompany = (id) => {
  Modal.confirm({
    title: 'Bạn có chắn chắn không?',
    icon: h(ExclamationCircleOutlined),
    content: 'Dữ liệu sau khi xóa sẽ không thể không phục.',
    okText: 'Có',
    okType: 'danger',
    cancelText: 'Không',
    async onOk() {
      try {
        await companyRequest.remove(id);
        showNotification('Xóa thành công', 'success')
      } catch (error) {

      }
    },
  });
};
const routerQuery = router.currentRoute.value.query
pagination.current = Number(routerQuery.page ?? 1)
pagination.pageSize = Number(routerQuery.per_page ?? 15)
formSearch.code = routerQuery.code ?? ''
formSearch.name = routerQuery.name ?? ''
formSearch.phone = routerQuery.phone ?? ''
formSearch.tax_code = routerQuery.tax_code ?? ''
formSearch.email = routerQuery.email ?? ''
formSearch.representative = routerQuery.representative ?? ''
formSearch.address = routerQuery.address ?? ''
formSearch.start_date = routerQuery.start_date ?? ''
const createdAtFrom = routerQuery.created_at_from
const createdAtTo = routerQuery.created_at_to

if (createdAtFrom && createdAtTo) {
  formSearch.created_at = [dayjs(createdAtFrom), dayjs(createdAtTo)]
} else {
  if (createdAtFrom) {
    formSearch.created_at = [dayjs(createdAtFrom), '']
  }

  if (createdAtTo) {
    formSearch.created_at = ['', dayjs(createdAtTo)]
  }
}

const initData = () => {
  const dataSearch = pickBy(formSearch, (value) => { return value !== '' })
  getCompanies(dataSearch)
}

const getCompanies = async (params) => {
  loading.value = true
  const response = await companyRequest.list(params);
  loading.value = false
  companyList.value = get(response, 'data.data', [])
  pagination.total = get(response, 'data.total')
}

initData()

document.addEventListener('visibilitychange', function (event) {
  if (!document.hidden) {
    initData()
  }
});

</script>
<style>

</style>
