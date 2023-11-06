<template>
  <a-config-provider :locale="locale">
    <div v-show="app.isLoading" id="loading">
      <a-spin id="loading-spin" tip="Vui lòng chờ..."> </a-spin>
    </div>
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import locale from 'ant-design-vue/es/locale/vi_VN';
import {
  Spin as ASpin,
  ConfigProvider as AConfigProvider,
} from 'ant-design-vue'
const app = useAppStore()
</script>

<style scoped>

</style>
