<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import {
  OrderedListOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined
} from '@ant-design/icons-vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const selectItem = (item) => {
  if (!item.showSubMenu && item.children && item.children[0]) {
    return router.push({name: item.children[0].name})
  }
  return router.push({name: item.name})
}
console.log(123)
</script>

<template>
  <a-sub-menu v-if="item.meta.showSubMenu && item.children && item.children.length">
    <template #title>
      <user-outlined />
      <span>{{ item.meta.name }}</span>
    </template>
    <a-menu-item v-for="sub in item.children" :key="sub.name" @click="selectItem(sub)">
      <OrderedListOutlined />
      <span>
        {{ sub.meta.name }}
      </span>
    </a-menu-item>
  </a-sub-menu>
  <a-menu-item test v-else :key="item.name" @click="selectItem(item)">
      <OrderedListOutlined />
      <span>
        {{ item.meta.name }}
      </span>
  </a-menu-item>
</template>

<style scoped>

</style>
