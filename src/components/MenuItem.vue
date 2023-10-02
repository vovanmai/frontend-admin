<script setup>
import {
  OrderedListOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a-sub-menu v-if="item.children && item.children.length" :key="item.name">
    <template #title>
      <span>
        <user-outlined />
        <span>{{ item.meta.name }}</span>
      </span>
    </template>
    <a-menu-item v-for="sub in item.children" :key="sub.name">
      <span>
        <router-link :to="sub.path">{{ sub.meta.name }}</router-link>
      </span>
    </a-menu-item>
  </a-sub-menu>
  <a-menu-item v-else :key="item.name">
    <router-link :to="item.path">
      <OrderedListOutlined />
      <span>
        {{ item.meta.name }}
      </span>
    </router-link>
  </a-menu-item>
</template>

<style scoped></style>
