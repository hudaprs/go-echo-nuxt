<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

useHead({
  title: 'App'
})
</script>

<template>
  <h5>Entry Point</h5>
</template>
