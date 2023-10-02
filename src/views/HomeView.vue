<script setup>
import { useAppStore } from '@/stores/app'
const app = useAppStore()

app.setLoading(false)
</script>

<template>This is home page</template>
