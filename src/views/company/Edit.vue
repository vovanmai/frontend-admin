<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100">
    <template #title>
      <h3><EditOutlined />Chỉnh sửa công ty/Cửa hàng</h3>
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
        :form="form.company_basic"
        :error="state.error"
        @validate-success="validateSuccess"
        @changeStep="changeStep"
    />
    <CreateSettingCompany
        ref="settingCompanyRef"
        v-if="state.currentStep === 1"
        :form="form.company_setting"
        :error="state.error"
        @validate-success="validateSuccess"
        @change-step="changeStep"
    />
    <EditAdmin
        ref="adminCompanyRef"
        v-if="state.currentStep === 2"
        :form="form.company_admin"
        @validate-success="validateSuccess"
        @change-step="changeStep"
    />
    <EditConfirm
        style="margin-bottom: 25px"
        v-if="state.currentStep === 3"
        :data="form"
        @change-step="changeStep"
        @submit="onEditCompany"
    />
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import CreateBasicCompany from '@/views/company/component/CreateBasicCompany.vue'
import CreateSettingCompany from '@/views/company/component/CreateSettingCompany.vue'
import EditAdmin from '@/views/company/component/EditAdmin.vue'
import EditConfirm from '@/views/company/component/EditConfirm.vue'
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
  EditOutlined,
} from '@ant-design/icons-vue'
import { get } from 'lodash'
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
    },
    {
      title: 'Quản trị viên',
      description: 'Supper Admin',
    },
    {
      title: 'Xác nhận',
    },
  ],
  error: {}
})

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
    service_type: ''
  },
  company_admin: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
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

const onEditCompany = async () => {
  try {
    appStore.setLoading()
    await CompanyRequest.update(router.currentRoute.value.params.id, form)
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

const getCompanyDetail = async () => {
  try {
    const { data } = await CompanyRequest.detail(router.currentRoute.value.params.id)
    form.company_basic.code = data.code
    form.company_basic.name = data.name
    form.company_basic.email = data.email
    form.company_basic.representative = data.representative
    form.company_basic.tax_code = data.tax_code
    form.company_basic.address = data.address
    form.company_basic.phone = data.phone

    form.company_setting.service_type = data.setting.service_type
    form.company_admin.name = data.super_admin.name
    form.company_admin.email = data.super_admin.email
  } catch (error) {
  }
}

getCompanyDetail()

</script>
<style></style>
