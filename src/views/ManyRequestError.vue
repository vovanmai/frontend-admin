<template>
  <a-result status="500" title="429" sub-title="Quá nhiều yêu cầu gởi đến máy chủ">
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
