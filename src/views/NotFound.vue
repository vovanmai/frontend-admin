<template>
  <a-result status="404" title="404" sub-title="Xin lỗi, trang này không được tìm thấy.">
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
