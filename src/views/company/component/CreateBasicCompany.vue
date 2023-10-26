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
      label="Mã code"
      name="code"
      :rules="state.rules.code"
    >
      <a-input v-model:value="form.code" />
    </a-form-item>

    <a-form-item
      has-feedback
      label="Tên"
      name="name"
      :rules="state.rules.name"
    >
      <a-input v-model:value="form.name" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-space>
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

const emit = defineEmits(['submitSuccess', 'changeStep'])

const step = 0

const state = reactive({
  rules: {
    code: [
      { required: true, message: 'Không được rỗng.' }
    ],
    name: [
      // { required: true, message: 'Không được rỗng.' }
    ]
  }
})
const onFinish = values => {
  emit('submitSuccess', step)
  emit('changeStep', 1)
};
const onFinishFailed = errorInfo => {
  console.log(12121)
};
</script>
<style></style>
