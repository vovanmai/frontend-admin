<template>
  <div class="about">
    <a-dropdown :open="state.open">
      <a-input @input="setValue" placeholder="Basic usage" />

      <template #overlay>

        <a-menu>
          <div><a-spin size="small" /></div>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app'
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
const app = useAppStore()
const router = useRouter()
const route = useRoute()
const state = reactive({
  value: '',
  open: false,
});
const setValue = (e) => {
  state.open = e.target.value != '' ? true : false;
}
</script>
<style></style>
