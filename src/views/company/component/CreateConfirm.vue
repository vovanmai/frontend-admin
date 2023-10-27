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
  </div>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Descriptions as ADescriptions,
  DescriptionsItem as ADescriptionsItem,
} from 'ant-design-vue'
import {
  PlusCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { reactive } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit'])

const state = reactive({

})

</script>
<style></style>
