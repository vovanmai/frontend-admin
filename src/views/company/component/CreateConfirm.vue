<template>
  <div>Confirm info</div>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
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
import { reactive } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submitSuccess'])

const state = reactive({
  rules: {
    email: [
      // { required: true, message: 'Không được rỗng.' }
    ],
  }
})
const onFinish = values => {
  emit('submitSuccess')
};
const onFinishFailed = errorInfo => {
};
</script>
<style></style>
