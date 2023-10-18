<template>
  <Breadcrumb></Breadcrumb>
  <a-card :loading="false" size="small" title="Small size card" class="mt-15 w-100">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import {
  Card as ACard
} from 'ant-design-vue'
</script>
<style></style>
