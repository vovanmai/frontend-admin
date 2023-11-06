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
        :current="currentStep"
        :items="steps"
        type="navigation1"
        style="max-width: 1000px"
        @change="changeStepOnStep"
      ></a-steps>
    </div>
    <Transition name="slide-fade">
      <CreateBasicCompany
        ref="basicCompanyRef"
        v-if="currentStep === 0"
        :form="form.company_basic"
        @validate-success="validateSuccess"
        @changeStep="changeStep"
      />
    </Transition>
    <Transition name="slide-fade">
      <CreateSettingCompany
        ref="settingCompanyRef"
        v-if="currentStep === 1"
        :form="form.company_setting"
        @validate-success="validateSuccess"
        @change-step="changeStep"
      />
    </Transition>
    <Transition name="slide-fade">
      <CreateAdmin
        ref="adminCompanyRef"
        v-if="currentStep === 2"
        :form="form.company_admin"
        @validate-success="validateSuccess"
        @change-step="changeStep"
      />
    </Transition>
    <Transition name="slide-fade">
      <CreateConfirm
        style="margin-bottom: 25px"
        v-if="currentStep === 3"
        :data="form"
        @change-step="changeStep"
        @submit="onCreateCompany"
      />
    </Transition>
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

const currentStep = ref(0)
const steps = ref([
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
])

const form = reactive({
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
    contract_date: [],
    trial_date: [],
  },
  company_admin: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
})

const changeStep = (step) => {
  currentStep.value = step

  if (step === 3) {
    steps.value[step].disabled = false
  }
};

const changeStepOnStep = async (step) => {
  if (
    (currentStep.value === 0 && await basicCompanyRef.value.validateForm())
    || (currentStep.value === 1 && await settingCompanyRef.value.validateForm())
    || (currentStep.value === 2 && await adminCompanyRef.value.validateForm())
    || currentStep.value === 3
  ) {
    steps.value[currentStep.value].disabled = false
    currentStep.value = step
  }
};

const validateSuccess = (step) => {
  steps.value[step].disabled = false
};

const onCreateCompany = async () => {
  try {
    const formData = cloneDeep(form)
    if (get(formData, 'company_setting.contract_date.0')) {
      formData.company_setting.contract_start_date = get(formData, 'company_setting.contract_date.0').format('YYYY-MM-DD')
    }

    if (get(formData, 'company_setting.contract_date.1')) {
      formData.company_setting.contract_end_date = get(formData, 'company_setting.contract_date.1').format('YYYY-MM-DD')
    }

    if (get(formData, 'company_setting.trial_date.0')) {
      formData.company_setting.trial_start_date = get(formData, 'company_setting.trial_date.0').format('YYYY-MM-DD')
    }

    if (get(formData, 'company_setting.contract_date.1')) {
      formData.company_setting.trial_end_date = get(formData, 'company_setting.trial_date.1').format('YYYY-MM-DD')
    }
    appStore.setLoading()
    await CompanyRequest.create(formData)
    appStore.setLoading(false)
    router.push({ name: 'company.list'})
  } catch (error) {
    appStore.setLoading(false)
    if (get(error, 'status_code') === 422) {
      currentStep.value = error.errors.step
      appStore.setError(error.errors.details)
    }
  }
};
</script>
<style>
</style>
