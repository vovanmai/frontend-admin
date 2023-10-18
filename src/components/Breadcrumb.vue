<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in state.breadcrumbs" :key="index">
      <router-link v-if="item.route" :to="{ name: item.route }">
        <icon v-if="item.icon" :name="item.icon"></icon>
        <span style="margin-inline-start: 4px">{{ item.name }}</span>
      </router-link>
      <template v-else>
        <icon v-if="item.icon" :name="item.icon"></icon>
        <span>{{ item.name }}</span>
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import {
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem,
} from 'ant-design-vue'
import Icon from '@/components/Icon.vue'
import { useRouter } from "vue-router";
const router = useRouter()
import { reactive } from "vue";
const state = reactive({
  breadcrumbs: [],
});
if (router.currentRoute.value.meta.breadcrumbs && router.currentRoute.value.meta.breadcrumbs.length) {
  state.breadcrumbs = router.currentRoute.value.meta.breadcrumbs
} else {
  state.breadcrumbs = []
}
</script>

<style scoped>

</style>
