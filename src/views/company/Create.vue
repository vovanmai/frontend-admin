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
        type="navigation1"
        style="max-width: 1000px"
        @change="changeStepOnStep"
      ></a-steps>
    </div>
    <CreateBasicCompany
      ref="basicCompanyRef"
      v-if="state.currentStep === 0"
      :form="state.form.company_basic"
      :error="state.error"
      @validate-success="validateSuccess"
      @changeStep="changeStep"
    />
    <CreateSettingCompany
      ref="settingCompanyRef"
      v-if="state.currentStep === 1"
      :form="state.form.company_setting"
      :error="state.error"
      @validate-success="validateSuccess"
      @change-step="changeStep"
    />
    <CreateAdmin
      ref="adminCompanyRef"
      v-if="state.currentStep === 2"
      :form="state.form.company_admin"
      @validate-success="validateSuccess"
      @change-step="changeStep"
    />
    <CreateConfirm
      style="margin-bottom: 25px"
      v-if="state.currentStep === 3"
      :data="state.form"
      @change-step="changeStep"
      @submit="onCreateCompany"
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
    company_basic: {
      name: '',
      code: '',
      representative: '',
      phone: '',
      email: '',
      tax_code: '',
      address: '',
    },
    company_setting: {
      service_type: ''
    },
    company_admin: {
      name: '',
      email: '',
    },
  },
  error: {}
})
const changeStep = (step) => {
  state.currentStep = step

  if (step === 3) {
    state.steps[step].disabled = false
  }
};

const changeStepOnStep = async (step) => {
  if (
    (state.currentStep === 0 && await basicCompanyRef.value.validateForm())
    || (state.currentStep === 1 && await settingCompanyRef.value.validateForm())
    || (state.currentStep === 2 && await adminCompanyRef.value.validateForm())
    || state.currentStep === 3
  ) {
    state.steps[state.currentStep].disabled = false
    state.currentStep = step
  }
};

const validateSuccess = (step) => {
  state.steps[step].disabled = false
};
import { useAppStore } from '@/stores/app'
const app = useAppStore()
const onCreateCompany = () => {
  const stepError = 0
  state.currentStep = stepError
};
</script>
<style></style>
