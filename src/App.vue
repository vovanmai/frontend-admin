<script setup>
import { useAppStore } from '@/stores/app'
const app = useAppStore()
</script>

<template>
  <div v-show="app.isLoading" id="loading">
    <a-spin id="loading-spin" tip="Vui lòng chờ..."> </a-spin>
  </div>
  <router-view></router-view>
</template>

<style scoped>

</style>
