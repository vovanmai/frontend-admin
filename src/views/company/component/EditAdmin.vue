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
        label="Tên"
        name="name"
        :rules="state.rules.name"
        :validateFirst="true"
      >
        <a-input ref="refInput" v-model:value="form.name" />
      </a-form-item>
      <a-form-item
        has-feedback
        label="Email"
        name="email"
        :rules="state.rules.email"
        :validateFirst="true"
      >
        <a-input v-model:value="form.email" />
      </a-form-item>

      <a-form-item
        has-feedback
        label="Mật khẩu"
        name="password"
        :rules="state.rules.password"
        :validateFirst="true"
      >
        <a-input-password v-model:value="form.password" placeholder=""/>
      </a-form-item>

      <a-form-item
        has-feedback
        label="Xác nhận mật khẩu"
        name="password_confirmation"
        :rules="state.rules.password_confirmation"
        :validateFirst="true"
      >
        <a-input-password v-model:value="form.password_confirmation" placeholder=""/>
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
import {
  Space as ASpace,
  Card as ACard,
  Button as AButton,
  Form as AForm,
  FormItem as AFormItem,
  InputPassword as AInputPassword,
  Input as AInput,
  Col as ACol,
  Row as ARow,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  LeftOutlined,
} from '@ant-design/icons-vue'
import AlertErrorMessage from '@/components/AlertErrorMessage.vue'
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

const validatePass = async (_rule, value) => {
  if (value !== '') {
    if (value.length < 6) {
      return Promise.reject('Tối thiểu 6 ký tự.');
    }
    if (props.form.password_confirmation !== '') {
      refForm.value.validateFields('password_confirmation')
    }
  }
  return Promise.resolve();
};

const validatePassConfirm = async (_rule, value) => {
  if (value !== '') {
    if (value.length < 6) {
      return Promise.reject('Tối thiểu 6 ký tự.');
    }
    if (props.form.password !== '' && value !== props.form.password) {
      return Promise.reject("Mật khẩu không khớp.");
    }
  }
  return Promise.resolve();
};

const state = reactive({
  rules: {
    name: [
      { required: true, message: 'Không được rỗng.' },
      { max: 100, message: 'Không được lớn hơn 100 ký tự.'},
    ],
    email: [
      { required: true, message: 'Không được rỗng.' },
      { max: 100, message: 'Không được lớn hơn 100 ký tự.'},
    ],
    password: [
      { validator: validatePass },
    ],
    password_confirmation: [
      { validator: validatePassConfirm },
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
