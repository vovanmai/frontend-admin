<template>
  <div class="description-show">
    <div class="d-flex justify-content-center">
      <a-descriptions
        :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
        title="Thông tin cơ bản"
        bordered
        style="width: 750px"
      >
        <a-descriptions-item label="Tên">{{ data.company_basic.name }}</a-descriptions-item>
        <a-descriptions-item label="Mã code">{{ data.company_basic.code }}</a-descriptions-item>
        <a-descriptions-item label="Người đại diện">{{ data.company_basic.representative }}</a-descriptions-item>
        <a-descriptions-item label="Địa chỉ email">{{ data.company_basic.email }}</a-descriptions-item>
        <a-descriptions-item label="Số điện thoại">{{ data.company_basic.phone }}</a-descriptions-item>
        <a-descriptions-item label="Mã số thuế">{{ data.company_basic.tax_code }}</a-descriptions-item>
        <a-descriptions-item label="Địa chỉ">{{ data.company_basic.address }}</a-descriptions-item>
      </a-descriptions>
    </div>

    <div class="d-flex justify-content-center mt-25">
      <a-descriptions
        :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
        title="Thiết lập cài đặt"
        bordered
        style="width: 750px"
      >
        <a-descriptions-item label="Loại dịch vụ">{{ data.company_setting.service_type }}</a-descriptions-item>
        <a-descriptions-item label="Ngày bắt đầu dùng thử">{{ trialStartDate }}</a-descriptions-item>
        <a-descriptions-item label="Ngày kết thúc dùng thử">{{ trialEndDate }}</a-descriptions-item>
        <a-descriptions-item label="Ngày bắt đầu hợp đồng">{{ contractStartDate }}</a-descriptions-item>
        <a-descriptions-item label="Ngày kết thúc hợp đồng">{{ contractEndDate }}</a-descriptions-item>
      </a-descriptions>
    </div>

    <div class="d-flex justify-content-center mt-25">
      <a-descriptions
        :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
        title="Quản trị viên"
        bordered
        style="width: 750px"
      >
        <a-descriptions-item label="Tên">{{ data.company_admin.name }}</a-descriptions-item>
        <a-descriptions-item label="Email">{{ data.company_admin.email }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="d-flex justify-content-center mt-25">
      <a-space>
        <a-button @click="goToPreviousStep"><LeftOutlined /></a-button>
        <a-button type="primary" @click="onsubmit">
          <EditOutlined/>Chỉnh sửa</a-button>
      </a-space>
    </div>
  </div>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Descriptions as ADescriptions,
  DescriptionsItem as ADescriptionsItem,
  Space as ASpace,
  Button as AButton,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  LeftOutlined,
  EditOutlined,
} from '@ant-design/icons-vue'
import { reactive, computed } from 'vue'
import {get} from "lodash";
import dayjs from "dayjs";
const emit = defineEmits(['changeStep', 'submit'])
const previousStep = 2
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const state = reactive({
})

const goToPreviousStep = async () => {
  emit('changeStep', previousStep)
};

const onsubmit = () => {
  emit('submit')
}

const contractStartDate = computed(() => {
  let date = get(props.data, 'company_setting.contract_date.0', '')

  if (date) {
    date = date.format('YYYY-MM-DD')
  }
  return date
})

const contractEndDate = computed(() => {
  let date = get(props.data, 'company_setting.contract_date.1', '')

  if (date) {
    date = date.format('YYYY-MM-DD')
  }
  return date
})

const trialStartDate = computed(() => {
  let date = get(props.data, 'company_setting.trial_date.0', '')

  if (date) {
    date = date.format('YYYY-MM-DD')
  }
  return date
})

const trialEndDate = computed(() => {
  let date = get(props.data, 'company_setting.trial_date.1', '')

  if (date) {
    date = date.format('YYYY-MM-DD')
  }
  return date
})
</script>
<style></style>
