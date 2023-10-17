<script setup>
import { useRouter } from 'vue-router'
import {
  SubMenu as ASubMenu,
  MenuItem as AMenuItem,
} from 'ant-design-vue'
import Icon from '@/components/Icon.vue'
const router = useRouter()
defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['selectItem'])

const selectItem = (item) => {
  if (!item.isShowSubMenu && item.children && item.children[0]) {
    return router.push({name: item.children[0].name})
  }
  emit('selectItem', item)
  return router.push({name: item.name})
}
</script>

<template>
  <a-sub-menu
    v-if="item.meta.isShowOnMenu !== false
      && item.meta.isShowSubMenu !== false
      && item.children && item.children.length"
    :key="item.name"
  >
    <template #title>
      <icon></icon>
      <span>{{ item.meta.name }}</span>
    </template>
    <a-menu-item v-for="sub in item.children" :key="sub.name" @click="selectItem(sub)">
      <icon></icon>
      <span>
        {{ sub.meta.name }}
      </span>
    </a-menu-item>
  </a-sub-menu>
  <a-menu-item test v-else-if="item.meta.isShowOnMenu !== false" :key="item.name" @click="selectItem(item)">
    <icon></icon>
      <span>
        {{ item.meta.name }}
      </span>
  </a-menu-item>
</template>

<style scoped>

</style>
