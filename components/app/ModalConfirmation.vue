<script setup lang="ts">
interface IModalConfirmationProps {
  isOpen: boolean
  title: string
  message: string
  loading?: boolean
}

// Props
const props = defineProps<IModalConfirmationProps>()

// Event Emitter
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'close', value: boolean): void
}>()

/**
 * @description Confirm handler
 *
 * @return {void} void
 */
const onConfirm = () => {
  emit('confirm')
}

/**
 * @description Close handler
 *
 * @return {void} void
 */
const onClose = () => {
  emit('close', false)
}
</script>

<template>
  <v-modal
    footer-class="flex-row-reverse"
    confirm-text="Yes"
    confirm-color="error"
    close-text="No"
    confirm
    centered
    persistent
    hide-x-button
    :model-value="props.isOpen"
    :title="props.title"
    :loading="props.loading"
    @close="onClose"
    @confirm="onConfirm"
  >
    <p>{{ props.message }}</p>
  </v-modal>
</template>
