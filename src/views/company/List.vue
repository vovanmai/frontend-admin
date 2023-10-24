<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100">
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
      <a-button
        type="primary"
      ><PlusCircleOutlined />Tạo mới</a-button>
    </template>
    <a-table
      :scroll="{ x: true }"
      :showSorterTooltip="false"
      bordered
      :columns="columns"
      :data-source="state.companyList"
      :loading="false"
      :pagination="state.pagination"
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
                <a-menu-item>
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
} from '@ant-design/icons-vue'
import { reactive, ref, computed } from 'vue';
const formRef = ref(null);

const state = reactive({
  isShowMore: false,
  offset: 0,
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
    },
    {
      key: '2',
      code: 'code2',
      name: 'name2',
      email: 'email2',
    }
  ],
  pagination: {
    total: 5000,
    current: 1,
    pageSize: 10,
    showTotal: (total, range) => `Tổng ${total}`,
  },
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
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const resetForm = () => {
  formRef.value.resetFields();
};
const columns = [
  {
    title: 'Mã code',
    dataIndex: 'code',
    sorter: true,
    key: 'code',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Địa chỉ email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Hành động',
    key: 'action',
    width: '10%',
  },
];

const handleTableChange = (params) => {
  state.pagination.current = params.current
  state.pagination.pageSize = params.pageSize
  state.pagination.total = params.total
}
</script>
<style>

</style>
