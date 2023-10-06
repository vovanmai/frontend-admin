<template>
  <div class="about">
    <h1>List company {{ new Date() }}</h1>
    <h1>List company {{ Math.floor(Date.now() / 1000) }}</h1>
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app'
import {useRoute, useRouter} from "vue-router";
const app = useAppStore()
const router = useRouter()
const route = useRoute()
</script>
<style></style>
