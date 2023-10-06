<template>
  <div class="about">
    <h1>Edit company</h1>
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
