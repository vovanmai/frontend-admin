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
    {{ state.form }}
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
import { get, cloneDeep, clone } from 'lodash'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
import { useRouter } from 'vue-router'
const router = useRouter()

import CompanyRequest from "@/http/requests/Company";
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
      title: 'Quản trị viên',
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
      service_type: '',
      contract_date: [
      ],
    },
    company_admin: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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

const onCreateCompany = async () => {
  try {
    const form = cloneDeep(state.form)
    if (get(form, 'company_setting.contract_date.0')) {
      form.company_setting.contract_start_date = get(form, 'company_setting.contract_date.0').format('YYYY-MM-DD')
    }

    if (get(form, 'company_setting.contract_date.1')) {
      form.company_setting.contract_end_date = get(form, 'company_setting.contract_date.1').format('YYYY-MM-DD')
    }
    appStore.setLoading()
    await CompanyRequest.create(form)
    appStore.setLoading(false)
    router.push({ name: 'company.list'})
  } catch (error) {
    appStore.setLoading(false)
    if (get(error, 'status_code') === 422) {
      state.currentStep = error.errors.step
      appStore.setError(error.errors.details)
    }
  }

};
</script>
<style></style>
