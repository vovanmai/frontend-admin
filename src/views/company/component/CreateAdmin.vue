<template>
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
      label="Tên"
      name="name"
      :rules="state.rules.name"
    >
      <a-input ref="refInput" v-model:value="form.name" />
    </a-form-item>
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
        <a-button @click="goToPreviousStep"><LeftOutlined /></a-button>
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
  LeftOutlined,
} from '@ant-design/icons-vue'
import { onMounted, reactive, ref} from 'vue'
const refForm = ref(null)
const refInput = ref(null)
onMounted(() => {
  refInput.value.focus()
})

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})
const previousStep = 1
const step = 2
const nextStep = 3

const emit = defineEmits(['validateSuccess', 'changeStep'])

const state = reactive({
  rules: {
    name: [
      { required: true, message: 'Không được rỗng.' }
    ],
    email: [
      { required: true, message: 'Không được rỗng.' }
    ],
  }
})
const onFinish = values => {
  emit('validateSuccess', step)
  emit('changeStep', nextStep)
};
const onFinishFailed = errorInfo => {
};
const changeStep = step => {
  emit('changeStep', step)
};

const validateForm = async () => {
  try {
    await refForm.value.validateFields()
    return true
  } catch (error) {
    return false
  }
};
const goToPreviousStep = async () => {
  const isValid = await validateForm()
  if (isValid) {
    emit('changeStep', previousStep)
    emit('validateSuccess', step)
  }
};
defineExpose({
  validateForm,
})
</script>
<style></style>
