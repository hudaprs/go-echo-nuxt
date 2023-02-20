<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Auth Store
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

onMounted(async () => {
  // Load authenticated user
  if (isAuthenticated.value) {
    try {
      await authStore.me()
    } catch (_) {
      //
    }
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
