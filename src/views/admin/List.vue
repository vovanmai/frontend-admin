<template>
  <div class="about">
    <a-dropdown :open="state.open">
      <a-input @input="setValue" placeholder="Basic usage" />

      <template #overlay>
        <a-menu>
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
          hih
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import {
  Dropdown as ADropdown,
  Menu as AMenu,
  Input as AInput,
} from 'ant-design-vue'
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
