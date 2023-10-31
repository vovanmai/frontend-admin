<template>
  <a-alert
    style="margin-bottom: 25px"
    type="error"
    show-icon
    closable
    @close="app.setError({})"
    v-if="!isEmpty(app.errors)"
  >
    <template #description>
      <div v-for="(item, index) in values(app.errors)" :key="index">{{ item }}</div>
    </template>
  </a-alert>
</template>

<script setup>
import { isEmpty, values } from 'lodash'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
import {
  Alert as AAlert,
} from 'ant-design-vue'
</script>

<style scoped>

</style>
