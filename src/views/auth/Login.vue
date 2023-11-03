<template>
  <a-card style="width: 400px">
    <template #title>
      <h2 class="text-center">Đăng nhập</h2>
    </template>
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        name="email"
        :rules="[
          { required: true, message: 'Vui lòng nhập.' },
          { type: 'email', message: 'Địa chỉ email không hợp lệ.' },
        ]"
      >
        <a-input v-model:value="formState.email" placeholder="Địa chỉ email">
          <template #addonBefore>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[
          { required: true, message: 'Vui lòng nhập.' },
        ]"
      >
        <a-input-password v-model:value="formState.password" placeholder="Mật khẩu">
          <template #addonBefore>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item class="wrap-submit">
        <a-button class="w-100" type="primary" html-type="submit"><LoginOutlined />Đăng nhập</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script setup>
import { get } from 'lodash'
import { useRouter } from 'vue-router';
import { showNotification } from '@/common/helper';
const router = useRouter()
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import {
  Card as ACard,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  InputPassword as AInputPassword,
  Button as AButton,
  notification
} from 'ant-design-vue'
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
} from '@ant-design/icons-vue'

import AuthRequest from '@/http/requests/Auth'
import { reactive } from 'vue';
const formState = reactive({
  email: '',
  password: '',
});

const authenticated = localStorage.getItem('access_token')
if (authenticated) {
  router.push({ name: 'company.list' })
}
const onFinish = async values => {
  try {
    const response = await AuthRequest.login(values)
    localStorage.setItem('access_token', get(response, 'data.access_token'))
    authStore.setUser(get(response, 'data.user'))
    showNotification(get(response, 'message'), 'success')
    await router.push({ name: 'company.list' })
  } catch (error) {
    showNotification(error.message)
  }
};
</script>
<style scoped>
.ant-card {
  border-radius: 10px !important;
}
.wrap-submit {
  margin-bottom: 0;
}
</style>
