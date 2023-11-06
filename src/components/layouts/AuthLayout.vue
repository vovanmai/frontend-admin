<template>
  <div class="auth w-100 d-flex justify-content-center align-item-center">
    <router-view></router-view>
  </div>
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
</script>

<style scoped>
.auth {
  height: 100%;
  background: url("https://store.antdv.com/pro/preview/assets/background-d7103c44.svg");
}
</style>