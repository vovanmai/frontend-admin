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
        style="display: flex; align-items: center; background: #fff; padding: 0px 20px; height: 54px"
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
      </a-layout-header>
      <a-layout-content>
        <a-breadcrumb style="margin: 16px 16px">
          <a-breadcrumb-item v-for="(item, index) in state.breadcrumbs" :key="index">
            {{item.icon}}
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
        <div :style="{ margin: '0px 16px', padding: '24px', background: '#fff', minHeight: '100%' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import {
    Menu as AMenu,
    Layout as ALayout,
    LayoutSider as ALayoutSider,
    LayoutHeader as ALayoutHeader,
    LayoutContent as ALayoutContent,
    Breadcrumb as ABreadcrumb,
    BreadcrumbItem as ABreadcrumbItem,
    Space as ASpace,
  } from 'ant-design-vue'
  import { useAppStore } from '@/stores/app'
  import Icon from '@/components/Icon.vue'
  import MenuItem from '@/components/MenuItem.vue'
  const app = useAppStore()
  import {
    OrderedListOutlined,
    HomeOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    VideoCameraOutlined
  } from '@ant-design/icons-vue'
  import { useAuthStore } from '@/stores/auth'
  const auth = useAuthStore()
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

    console.log(router.currentRoute.value.meta.breadcrumbs)
    if (router.currentRoute.value.meta.breadcrumbs && router.currentRoute.value.meta.breadcrumbs.length) {
      state.breadcrumbs = router.currentRoute.value.meta.breadcrumbs
      console.log(router.currentRoute.value.meta.breadcrumbs)
    } else {
      state.breadcrumbs = []
    }
  });

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