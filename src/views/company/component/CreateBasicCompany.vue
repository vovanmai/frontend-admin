<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :md="{ span: 9, offset: 8 }">
        <AlertErrorMessage></AlertErrorMessage>
      </a-col>
    </a-row>
    <a-form
      :model="form"
      ref="refForm"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 9 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        has-feedback
        label="Tên công ty"
        name="name"
        :rules="state.rules.name"
      >
        <a-input ref="refInput" v-model:value="form.name" />
      </a-form-item>
      <a-form-item
        has-feedback
        label="Mã code"
        name="code"
        :validateFirst="true"
        :rules="state.rules.code"
      >
        <a-input v-model:value="form.code" />
      </a-form-item>

      <a-form-item
          has-feedback
          label="Người đại diện"
          name="representative"
          :rules="state.rules.representative"
      >
        <a-input v-model:value="form.representative" />
      </a-form-item>

      <a-form-item
          has-feedback
          label="Địa chỉ email"
          name="email"
          :rules="state.rules.email"
      >
        <a-input v-model:value="form.email" />
      </a-form-item>

      <a-form-item
          has-feedback
          label="Số điện thoại"
          name="phone"
          :rules="state.rules.phone"
      >
        <a-input v-model:value="form.phone" />
      </a-form-item>

      <a-form-item
          has-feedback
          label="Địa chỉ"
          name="address"
          :rules="state.rules.address"
      >
        <a-input v-model:value="form.address" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 9 }">
        <a-space>
          <a-button type="primary" html-type="submit">Tiếp tục</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { findIndex, isEmpty, values } from 'lodash'

import Breadcrumb from '@/components/Breadcrumb.vue'
import AlertErrorMessage from '@/components/AlertErrorMessage.vue'
import {
  Space as ASpace,
  Card as ACard,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Alert as AAlert,
  Row as ARow,
  Col as ACol,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { reactive, ref, onMounted } from 'vue'
const refForm = ref(null)

const refInput = ref(null)
onMounted(() => {
  refInput.value.focus()
})
const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  error: {
    type: Object,
    required: true
  },
})
const emit = defineEmits(['validateSuccess', 'changeStep'])

const step = 0
const nextStep = 1

const state = reactive({
  rules: {
    code: [
      { required: true, message: 'Không được rỗng.' },
      { max: 50, message: 'Không được lớn hơn 50 ký tự.'},
    ],
    name: [
      { required: true, message: 'Không được rỗng.' }
    ],
    representative: [
      { required: true, message: 'Không được rỗng.' }
    ],
    email: [
      { required: true, message: 'Không được rỗng.' }
    ],
    phone: [
      { required: true, message: 'Không được rỗng.' }
    ],
    address: [
      { required: true, message: 'Không được rỗng.' }
    ],
  },
  isCodeError: false,
})
const onFinish = values => {
  emit('validateSuccess', step)
  emit('changeStep', nextStep)
};
const onFinishFailed = async (error) => {
  const index = findIndex(error.errorFields, function(item) { return item.name[0] == 'code' })
  state.isCodeError = index >= 0
};
const validateForm = async () => {
  try {
    await refForm.value.validateFields()
    return true
  } catch (error) {
    return false
  }
};
const validateField = async (field) => {
  try {
    return await refForm.value.validateFields([field])
  } catch (error) {
    return false
  }
};
defineExpose({
  validateForm,
})
</script>
<style></style>
