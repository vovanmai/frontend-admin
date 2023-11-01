<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :md="{ span: 9, offset: 8 }">
        <AlertErrorMessage></AlertErrorMessage>
      </a-col>
    </a-row>
    <a-form
      ref="refForm"
      :model="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 9 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >

      <a-form-item
        has-feedback
        label="Loại dịch vụ"
        name="service_type"
        :rules="state.rules.service_type"
      >
        <a-select
          ref="refServiceType"
          v-model:value="form.service_type"
        >
          <a-select-option value="1">Nail</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-space>
          <a-button @click="goToPreviousStep"><LeftOutlined /></a-button>
          <a-button type="primary" html-type="submit">Tiếp tục</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import AlertErrorMessage from '@/components/AlertErrorMessage.vue'
import {
  Card as ACard,
  Space as ASpace,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Row as ARow,
  Select as ASelect,
  SelectOption as ASelectOption,
  Col as ACol,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  LeftOutlined,
} from '@ant-design/icons-vue'
import {onMounted, reactive, ref} from 'vue'
const refForm = ref(null)
const refServiceType = ref(null)
onMounted(() => {
  refServiceType.value.focus()
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

const previousStep = 0
const step = 1
const nextStep = 2

const state = reactive({
  rules: {
    service_type: [
      { required: true, message: 'Vui lòng chọn' }
    ],
  },
  validatedForm: false,
})
const onFinish = values => {
  emit('validateSuccess', step)
  emit('changeStep', 2)
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
const onFinishFailed = errorInfo => {
};

defineExpose({
  validateForm,
})
</script>
<style>

</style>
