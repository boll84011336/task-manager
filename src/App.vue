<template>
  <RouterView />
  <BaseToast />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from '@/stores/theme'
import BaseToast from '@/components/base/BaseToast.vue'



const authStore = useAuthStore()
const themeStore = useThemeStore()


onMounted(() => {
  authStore.initAuth()
  themeStore.initTheme()
})
</script>