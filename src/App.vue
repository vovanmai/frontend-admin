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
import routes from '@/router/routes'
import { ref } from 'vue'
const selectedKeys = ref([''])
const collapsed = ref(false)
</script>

<template>
  <div v-show="app.isLoading" id="loading">
    <a-spin id="loading-spin" tip="Vui lòng chờ..."> </a-spin>
  </div>
  <a-layout style="height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <h1 style="color: white; font-size: 25px; padding: 10px; text-align: center">
        {{ !collapsed ? app.appName : app.appShortName }}
      </h1>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="vertical">
        <menu-item v-for="route in routes" :item="route"></menu-item>
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

<style scoped>
.collapsed-trigger {
  font-size: 16px;
  cursor: pointer;
}

.collapsed-trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
