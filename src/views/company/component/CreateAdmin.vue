<template>
  <a-form
    :model="form"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 9 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      has-feedback
      label="Email"
      name="email"
      :rules="state.rules.email"
    >
      <a-input v-model:value="form.email" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-space>
        <a-button @click="changeStep(1)">Trở lại</a-button>
        <a-button type="primary" html-type="submit">Tiếp tục</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Space as ASpace,
  Card as ACard,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { reactive, defineProps, defineEmits } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})
const step = 2

const emit = defineEmits(['submitSuccess', 'changeStep'])

const state = reactive({
  rules: {
    email: [
      { required: true, message: 'Không được rỗng.' }
    ],
  }
})
const onFinish = values => {
  emit('submitSuccess', step)
  emit('changeStep', 3)
};
const onFinishFailed = errorInfo => {
};
const changeStep = step => {
  emit('changeStep', step)
};
</script>
<style></style>
