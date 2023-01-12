<script setup lang="ts">
interface IAuthFormCardHeaderProps {
  title: string
}

const { title } = defineProps<IAuthFormCardHeaderProps>()
</script>

<template>
  <div class="flex items-center justify-between w-full">
    <div>
      {{ title }}
    </div>

    <div>
      <img src="~/assets/img/gits.webp" alt="gits.id" width="90" />
    </div>
  </div>
</template>
