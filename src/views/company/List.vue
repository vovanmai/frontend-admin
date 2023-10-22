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
            :rules="state.rules.code"
            has-feedback
          >
            <a-input v-model:value="state.formSearch.code" placeholder="Mã code" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="name"
            :rules="state.rules.name"
            has-feedback
          >
            <a-input v-model:value="state.formSearch.name" placeholder="Tên" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
            :rules="state.rules.email"
            has-feedback
          >
            <a-input v-model:value="state.formSearch.email" placeholder="Email" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="tax_code"
          >
            <a-input placeholder="Mã số thuế" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="representative"
          >
            <a-input placeholder="Người đại diện" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="phone"
          >
            <a-input placeholder="Số điện thoại" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="address"
          >
            <a-input placeholder="Địa chỉ" />
          </a-form-item>
        </a-col>
        <a-col
            class="gutter-row"
            :xs="{ span: 24}"
            :sm="{ span: 12}"
            :md="{ span: 12}"
            :lg="{ span: 6}"
            :xl="{ span: 6, offset: state.offset}" >
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
} from 'ant-design-vue'
import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  ClearOutlined,
} from '@ant-design/icons-vue'
import { reactive, ref } from 'vue';
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
  },
  rules: {
    code: [
      { required: true, message: 'Vui lòng nhập mã code.' }
    ],
    name: [
      { required: true, message: 'Vui lòng nhập mã code.' }
    ],
    email: [
      { max: 50, message: 'Tối đa là 50 ký tự.' },
    ]
  }
});
const showMore = () => {
  state.isShowMore = !state.isShowMore
  if (state.isShowMore) {
    state.offset = 0
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
</script>
<style>

</style>
