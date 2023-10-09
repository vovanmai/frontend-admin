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

const emit = defineEmits(['selectItem'])

const selectItem = (item) => {
  if (!item.showSubMenu && item.children && item.children[0]) {
    return router.push({name: item.children[0].name})
  }
  emit('selectItem', item)
  return router.push({name: item.name})
}
</script>

<template>
  <a-sub-menu v-if="item.meta.showSubMenu && item.children && item.children.length" :key="item.name">
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
