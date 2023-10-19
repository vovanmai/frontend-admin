<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" class="mt-15 w-100">
    <template #title>
      <h3><SearchOutlined />Tìm kiếm</h3>
    </template>
    <a-form layout="vertical">
      <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="code"
          >
            <a-input placeholder="Mã code" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="name"
          >
            <a-input placeholder="Tên" />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
          >
            <a-input placeholder="Email" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="name"
          >
            <a-input placeholder="Tên" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
          >
            <a-input placeholder="Email" />
          </a-form-item>
        </a-col>
        <a-col v-show="state.isShowMore" class="gutter-row" :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
          <a-form-item
            name="email"
          >
            <a-input placeholder="Email" />
          </a-form-item>
        </a-col>
        <a-col
            class="gutter-row"
            :xs="{ span: 24}"
            :sm="{ span: 12}"
            :md="{ span: 12}"
            :lg="{ span: 6}"
            :xl="{ span: 6, offset: state.offset}" >
          <a-form-item>
            <a-space>
              <a-button type="primary"><SearchOutlined /></a-button>
              <a-button type="default"><ClearOutlined /></a-button>
              <a-button type="link" class="pl-0" @click="showMore">
                {{ state.isShowMore ? 'Ẩn' : 'Hiện' }}
                <DownOutlined v-show="!state.isShowMore" />
                <UpOutlined v-show="state.isShowMore" />
              </a-button>
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Row as ARow,
  Col as ACol,
  Form as AForm,
  Card as ACard,
  FormItem as AFormItem,
  Input as AInput,
  Button as AButton,
  Space as ASpace,
} from 'ant-design-vue'
import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
  ClearOutlined,
} from '@ant-design/icons-vue'
import { reactive } from 'vue';
const state = reactive({
  isShowMore: false,
  offset: 0,
});
const showMore = () => {
  state.isShowMore = !state.isShowMore
  if (state.isShowMore) {
    state.offset = 6
  } else {
    state.offset = 0
  }
}
</script>
<style>
.gutter-box {
  background: red;
}
</style>
