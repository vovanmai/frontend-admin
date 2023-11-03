<template>
  <a-layout>
    <a-layout-sider :width="200" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }" v-model:collapsed="state.collapsed" :trigger="null" collapsible>
      <h1 style="color: white; font-size: 25px; padding: 10px; text-align: center">
        {{ !state.collapsed ? app.appName : app.appShortName }}
      </h1>
      <a-menu v-model:selectedKeys="state.selectedKeys" v-model:openKeys="state.openKeys" theme="dark" mode="inline">
        <menu-item @select-item="selectItem" v-for="(item, index) in mainRoutes" :item="item" :key="index"></menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: state.marginLeft, height: '100%' }">
      <a-layout-header
        class="d-flex align-item-center justify-content-between"
        style="background: #fff; padding: 0px 20px; height: 54px"
      >
        <menu-unfold-outlined
          v-if="state.collapsed"
          class="collapsed-trigger"
          @click="toggle()"
        />
        <menu-fold-outlined
          v-else
          class="collapsed-trigger"
          @click="toggle()"
        />
        <div>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{ get(authStore, 'currentUser.name') }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a-space>
                    <LogoutOutlined />
                    <span @click="logout">Đăng xuất</span>
                  </a-space>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="m-20">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { get } from 'lodash'
import {
  Menu as AMenu,
  MenuItem as AMenuItem,
  Layout as ALayout,
  LayoutSider as ALayoutSider,
  LayoutHeader as ALayoutHeader,
  LayoutContent as ALayoutContent,
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem,
  Space as ASpace,
  Dropdown as ADropdown,
} from 'ant-design-vue'
import { useAppStore } from '@/stores/app'
const app = useAppStore()
import Icon from '@/components/Icon.vue'
import MenuItem from '@/components/MenuItem.vue'
import { showNotification } from '@/common/helper';

import {
  OrderedListOutlined,
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  DownOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue'
import AuthRequest from '@/http/requests/Auth'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
import mainRoutes from '../../router/main'
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  marginLeft: '200px',
  breadcrumbs: [],
});

if (router.currentRoute.value.meta.isShowSubMenu === false) {
  state.selectedKeys = [router.currentRoute.value.meta.parentName]
} else {
  state.selectedKeys = [router.currentRoute.value.name]
}

if (router.currentRoute.value.meta.parentName) {
  state.openKeys = [router.currentRoute.value.meta.parentName]
}

const selectItem = (item) => {
  if (item.meta.parentName) {
    state.openKeys = [item.meta.parentName]
  } else {
    state.openKeys = []
  }
}

const toggle = () => {
  if (state.collapsed) {
    state.collapsed = !state.collapsed
    state.marginLeft = '200px'
  } else {
    state.marginLeft = '80px'
    state.collapsed = !state.collapsed
  }
}

watch(() => route.name, () => {
  if (router.currentRoute.value.meta.isShowSubMenu === false) {
    state.selectedKeys = [router.currentRoute.value.meta.parentName]
  } else {
    state.selectedKeys = [router.currentRoute.value.name]
    state.openKeys = [router.currentRoute.value.meta.parentName]
  }
});

const logout = async () => {
  try {
    await AuthRequest.logout()
    localStorage.removeItem('access_token')
    showNotification('Đăng xuất thành công', 'success')
    router.push({ name: 'auth.login'})
  } catch (error) {

  }
}
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