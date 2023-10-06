<template>
  <a-layout style="height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <h1 style="color: white; font-size: 25px; padding: 10px; text-align: center">
        {{ !collapsed ? app.appName : app.appShortName }}
      </h1>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <menu-item v-for="(item, index) in mainRoutes" :item="item" :key="index"></menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
          style="display: flex; align-items: center; background: #fff; padding: 10px 20px"
      >
        <menu-unfold-outlined
            v-if="collapsed"
            class="collapsed-trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
            v-else
            class="collapsed-trigger"
            @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import { useAppStore } from '@/stores/app'
  import MenuItem from '@/components/MenuItem.vue'
  const app = useAppStore()
  import {
    OrderedListOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    VideoCameraOutlined
  } from '@ant-design/icons-vue'
  import { useAuthStore } from '@/stores/auth'
  const auth = useAuthStore()
  import mainRoutes from '../../router/main'
  import { ref } from 'vue'
  import { useRoute, useRouter } from "vue-router";
  const selectedKeys = ref([''])
  const collapsed = ref(false)
  const router = useRouter()
  const route = useRoute()
  console.log(router.currentRoute.value)
</script>

<style scoped>
.collapsed-trigger {
  font-size: 16px;
  cursor: pointer;
}

.collapsed-trigger:hover {
  color: #1890ff;
}
</style>