<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100 card-search">
    <template #title>
      <h3><SearchOutlined />Tìm kiếm</h3>
    </template>
    <a-form
      ref="formRef"
      layout="vertical"
      :model="state.formSearch"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="code"
            label="Mã code"
            :rules="state.rules.code"
          >
            <a-input v-model:value="state.formSearch.code" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="name"
            label="Tên"
            :rules="state.rules.name"
          >
            <a-input v-model:value="state.formSearch.name" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
            label="Email"
            :rules="state.rules.email"
          >
            <a-input v-model:value="state.formSearch.email" placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="tax_code"
            label="Mã số thuế"
          >
            <a-input placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="representative"
            label="Người đại diện"
          >
            <a-input placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="phone"
            label="Số điện thoại"
          >
            <a-input placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="address"
            label="Địa chỉ"
          >
            <a-input placeholder="" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="business_date"
            label="Ngày kinh doanh"
          >
            <a-date-picker
              v-model:value="state.formSearch.start_date"
              value-format="YYYY-MM-DD"
              placeholder=""
              class="w-100"
            />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="start_date"
          >
            <template #label>
              <a-tooltip title="Bắt đầu hợp đồng">
                Bắt đầu hợp đồng
              </a-tooltip>
            </template>
            <a-range-picker
              class="w-100"
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
          :xl="{ span: 6, offset: state.offset}">
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
                {{ state.isShowMore ? 'Ẩn' : 'Hiện' }}
                <DownOutlined v-show="!state.isShowMore" />
                <UpOutlined v-show="state.isShowMore" />
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
<!--    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"-->
    <a-table
      :scroll="{ x: true }"
      :showSorterTooltip="false"
      :bordered="true"
      :columns="columns"
      :data-source="state.companyList"
      :loading="state.loading"
      :pagination="state.pagination"
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
                  <EditOutlined />
                  <span class="ml-5">Chỉnh sửa</span>
                </a-menu-item>
                <a-menu-item>
                  <InfoCircleOutlined />
                  <span class="ml-5">Chi tiết</span>
                </a-menu-item>
                <a-menu-item @click="showModalConfirm">
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
import { useRouter } from "vue-router";
const router = useRouter()
import { useAppStore } from '@/stores/app'
const app = useAppStore()
import { isEmpty, pickBy } from 'lodash';
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
const formRef = ref(null);

const state = reactive({
  isShowMore: false,
  offset: 0,
  loading: false,
  formSearch: {
    name: '',
    code: '',
    phone: '',
    tax_code: '',
    email: '',
    representative: '',
    address: '',
    start_date: '',
  },
  companyList: [
    {
      key: '1',
      code: 'code1',
      name: 'name1',
      email: 'email1',
      created_at: '2023-10-12 07:10:58',
    },
    {
      key: '2',
      code: 'code2',
      name: 'name2',
      email: 'email2',
      created_at: '2023-10-24 07:50:58',
    },{
      key: '1',
      code: 'code1',
      name: 'name1',
      email: 'email1',
      created_at: '2023-10-12 07:10:58',
    },
    {
      key: '2',
      code: 'code2',
      name: 'name2',
      email: 'email2',
      created_at: '2023-10-24 07:50:58',
    },{
      key: '1',
      code: 'code1',
      name: 'name1',
      email: 'email1',
      created_at: '2023-10-12 07:10:58',
    },
    {
      key: '2',
      code: 'code2',
      name: 'name2',
      email: 'email2',
      created_at: '2023-10-24 07:50:58',
    },{
      key: '1',
      code: 'code1',
      name: 'name1',
      email: 'email1',
      created_at: '2023-10-12 07:10:58',
    },
    {
      key: '2',
      code: 'code2',
      name: 'name2',
      email: 'email2',
      created_at: '2023-10-24 07:50:58',
    },
  ],
  pagination: {
    total: 5000,
    current: 1,
    pageSize: 10,
    showTotal: (total, range) => `${range[0]}-${range[1]} của tổng ${total}`,
  },
  selectedRowKeys: [],
  rules: {
    code: [
      // { required: true },
      { max: 50, message: 'Tối đa là 50 ký tự.' },
    ],
    name: [
      { max: 50, message: 'Tối đa là 50 ký tự.' },
    ],
    email: [
      { max: 50, message: 'Tối đa là 50 ký tự.' },
    ]
  }
});
const showMore = () => {
  state.isShowMore = !state.isShowMore
  if (state.isShowMore) {
    state.offset = 12
  } else {
    state.offset = 0
  }
}
const onFinish = values => {
  state.loading = true
  const query = pickBy(state.formSearch, (value) => { return value !== '' })
  router.push({name: 'company.list', query: query})
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const resetForm = () => {
  state.loading = false
  router.push({name: 'company.list'})
  formRef.value.resetFields();
  state.formSearch.code = ''
  state.formSearch.name = ''
  state.formSearch.phone = ''
  state.formSearch.tax_code = ''
  state.formSearch.email = ''
  state.formSearch.representative = ''
  state.formSearch.address = ''
  state.formSearch.start_date = ''
};
const columns = [
  {
    title: 'Mã code',
    dataIndex: 'code',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Địa chỉ email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    width: '20%',
    sorter: true,
  },
  {
    title: 'Hành động',
    key: 'action',
    width: '20%',
  },
];
const handleTableChange = (pagination, filters, sorter, extra) => {
  state.pagination.current = pagination.current
  state.pagination.pageSize = pagination.pageSize
  state.pagination.total = pagination.total

  let params = {
    ...state.formSearch,
    per_page: pagination.pageSize,
    page: pagination.current,
  }
  if (!isEmpty(sorter) && sorter.order) {
    params.sort_direction = sorter.order
    params.sort_column = sorter.field
  }

  state.loading = true
  // app.setLoading()
  //Call api
}
const onSelectChange = selectedRowKeys => {
  state.selectedRowKeys = selectedRowKeys;
};
const showModalConfirm = () => {
  Modal.confirm({
    title: 'Bạn có chắn chắn không?',
    icon: h(ExclamationCircleOutlined),
    content: 'Dữ liệu sau khi xóa sẽ không thể không phục.',
    okText: 'Có',
    okType: 'danger',
    cancelText: 'Không',
    onOk() {
      //Call api
      console.log('call api')
    },
  });
};
const routerQuery = router.currentRoute.value.query
state.pagination.current = routerQuery.page ?? 1
state.pagination.pageSize = routerQuery.per_page ?? 10
state.formSearch.code = routerQuery.code ?? ''
state.formSearch.name = routerQuery.name ?? ''
state.formSearch.phone = routerQuery.phone ?? ''
state.formSearch.tax_code = routerQuery.tax_code ?? ''
state.formSearch.email = routerQuery.email ?? ''
state.formSearch.representative = routerQuery.representative ?? ''
state.formSearch.address = routerQuery.address ?? ''
state.formSearch.start_date = routerQuery.start_date ?? ''
</script>
<style>

</style>
