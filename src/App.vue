<template>
  <RouterView />
  <BaseToast />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import BaseToast from './components/base/BaseToast.vue'


const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>