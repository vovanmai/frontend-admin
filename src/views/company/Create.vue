<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100">
    <template #title>
      <h3><PlusOutlined />Tạo mới công ty/Cửa hàng</h3>
    </template>
    <template #extra>
      <router-link :to="{ name: 'company.list' }">
        <a-button
          type="primary"
        ><UnorderedListOutlined />Danh sách</a-button>
      </router-link>
    </template>
    <div class="d-flex justify-content-center" style="padding: 25px 0">
      <a-steps
        :current="state.currentStep"
        :items="steps"
        style="max-width: 750px"
      ></a-steps>
    </div>
    <a-form
      v-if="state.currentStep == 0"
      :model="state.form.basic"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 9 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        has-feedback
        label="Mã code"
        name="code"
        :rules="state.rules.code"
      >
        <a-input v-model:value="state.form.basic.code" />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Tên"
        name="name"
        :rules="state.rules.name"
      >
        <a-input v-model:value="state.form.basic.name" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Tiếp tục</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Card as ACard,
  Button as AButton,
  Steps as ASteps,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { reactive } from 'vue'
const steps = [
  {
    title: 'Thông tin cơ bản',
  },
  {
    title: 'Thiết lập các thông số',
  },
  {
    title: 'Xác nhận',
  },
]
const state = reactive({
  currentStep: 0,
  form: {
    basic: {
      code: '',
      name: '',
    },
    setting: {

    }
  },
  rules: {
    code: [
      { required: true, message: 'Không được rỗng.' }
    ],
    name: [
      { required: true, message: 'Không được rỗng.' }
    ]
  }
})
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const onFinish = values => {
  state.currentStep = state.currentStep + 1
};
const onFinishFailed = errorInfo => {
};
</script>
<style></style>
