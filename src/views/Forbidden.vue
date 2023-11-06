<template>
  <a-result status="403" title="403" sub-title="Xin lỗi, Bạn không có quyền.">
    <template #extra>
      <router-link to="/"><a-button type="primary">Quay lại trang chủ</a-button></router-link>
    </template>
  </a-result>
</template>
<script setup>
import {
  Result as AResult,
  Button as AButton,
} from 'ant-design-vue'
</script>
<style></style>
