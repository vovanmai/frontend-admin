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
          <a-select-option value="" disabled>---Chọn---</a-select-option>
          <a-select-option :value="1">Nail</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        has-feedback
        label="Ngày dùng thử"
        name="trial_date"
        :rules="state.rules.trial_date"
      >
        <a-range-picker
          class="w-100"
          :allow-empty="[false, false]"
          :disabled-date="disabledDate"
          :presets="rangePresets"
          v-model:value="form.trial_date"
          :placeholder="['Thời gian bắt đầu', 'Thời gian kết thúc']"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="Ngày sử dụng hợp đồng"
        name="contract_date"
        :rules="state.rules.contract_date"
      >
        <a-range-picker
          class="w-100"
          :presets="rangePresets"
          :disabled-date="disabledDate"
          v-model:value="form.contract_date"
          :placeholder="['Thời gian bắt đầu', 'Thời gian kết thúc']"
        />
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
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)
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
  RangePicker as ARangePicker,
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

const validateTrialDate = async (_rule, value) => {
  if (value && value.length > 0) {
    if (!value[0].isSameOrAfter(dayjs(), 'day')) {
      return Promise.reject('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại.')
    }
  }

  refForm.value.validateFields(['contract_date'])

  return Promise.resolve();
};

const validateContractDate = async (_rule, value) => {
  if (value && value.length > 0) {
    if (!value[0].isSameOrAfter(dayjs(), 'day')) {
      return Promise.reject('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại.')
    }

    if (props.form.trial_date && props.form.trial_date.length > 0) {
      const trialEndDate = props.form.trial_date[1]
      if (!value[0].isAfter(trialEndDate, 'day')) {
        return Promise.reject('Ngày bắt đầu hợp đồng phải lớn hơn ngày kết thúc dùng thử.')
      }
    }
  }
  return Promise.resolve();
};

const state = reactive({
  rules: {
    service_type: [
      { required: true, message: 'Vui lòng chọn' }
    ],
    contract_date: [
      { validator: validateContractDate }
    ],
    trial_date: [
      { validator: validateTrialDate }
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

const changeContractDate = (dates) => {

};

const rangePresets = ref([
  {
    label: '7 ngày gần nhất',
    value: [dayjs(), dayjs().add(6, 'd')],
  },
  {
    label: 'Tới cuối tháng',
    value: [dayjs(), dayjs().endOf('month')],
  },
  {
    label: '30 ngày gần nhất',
    value: [dayjs(), dayjs().add(29, 'd')],
  },
  {
    label: '1 năm gần nhất',
    value: [dayjs(), dayjs().add(365, 'd')],
  },
]);

const disabledDate = (current) => {
  return current && current.isBefore(dayjs(), 'day')
}

defineExpose({
  validateForm,
})
</script>
<style>

</style>
