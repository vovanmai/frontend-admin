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
        :items="state.steps"
        type="navigation"
        :status="!state.stepStatusValidate ? 'error' : 'process'"
        style="max-width: 1000px"
        @change="changeStepOnStep"
        @submit-success="submitSuccess"
      ></a-steps>
    </div>
    <CreateBasicCompany
      ref="basicCompanyRef"
      style="margin-top: 25px"
      v-if="state.currentStep === 0"
      :form="state.form.basic"
      @submit-success="submitSuccess"
      @changeStep="changeStep"
    />
    <CreateSettingCompany
      ref="settingCompanyRef"
      style="margin-top: 25px"
      v-if="state.currentStep === 1"
      :form="state.form.setting"
      @submit-success="submitSuccess"
      @change-step="changeStep"
    />
    <CreateAdmin
      ref="adminCompanyRef"
      style="margin-top: 25px"
      v-if="state.currentStep === 2"
      :form="state.form.setting"
      @submit-success="submitSuccess"
      @change-step="changeStep"
    />
    <CreateConfirm
      style="margin-top: 25px"
      v-if="state.currentStep === 3"
      :form="state.form.setting"
      @submit-success="1"
    />
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import CreateBasicCompany from '@/views/company/component/CreateBasicCompany.vue'
import CreateSettingCompany from '@/views/company/component/CreateSettingCompany.vue'
import CreateAdmin from '@/views/company/component/CreateAdmin.vue'
import CreateConfirm from '@/views/company/component/CreateConfirm.vue'
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
import { reactive, ref } from 'vue'
const basicCompanyRef = ref(null)
const settingCompanyRef = ref(null)
const adminCompanyRef = ref(null)

const state = reactive({
  currentStep: 0,
  stepStatusValidate: true,
  steps: [
    {
      title: 'Thông tin cơ bản',
    },
    {
      title: 'Thiết lập cài đặt',
      disabled: true,
    },
    {
      title: 'Tạo quản trị viên',
      description: 'Supper Admin',
      disabled: true,
    },
    {
      title: 'Xác nhận',
      disabled: true,
    },
  ],
  form: {
    basic: {
      code: '',
      name: '',
    },
    setting: {
      service_type: ''
    },
    company_admin: {
      name: '',
      email: '',
    },
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
const onFinish = values => {
};
const onFinishFailed = errorInfo => {
};
const changeStep = (step) => {
  state.currentStep = step
};

const changeStepOnStep = async (step) => {
  if (
      (state.currentStep === 0 && await basicCompanyRef.value.validateForm())
      || (state.currentStep === 1 && await settingCompanyRef.value.validateForm())
      || (state.currentStep === 2 && await adminCompanyRef.value.validateForm())
      || state.currentStep === 3
  ) {
    state.currentStep = step
  }
};

const submitSuccess = (step) => {
  state.steps[step].disabled = false
};
</script>
<style></style>
