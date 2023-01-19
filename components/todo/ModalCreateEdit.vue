<script setup lang="ts">
// Vue Toastification
import { useToast } from 'vue-toastification'

// Pinia
import { storeToRefs } from 'pinia'

// Toast
const toast = useToast()

// Store
const todoStore = useTodoStore()
const { loading } = storeToRefs(todoStore)

// Interfaces
interface ITodoModalCreateEditProps {
  isOpen: boolean
  isEdit: boolean
}

// Props
const props = defineProps<ITodoModalCreateEditProps>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'submit'): void
  (e: 'refetch'): void
}>()

/**
 * @description Hide / Close modal
 *
 * @param {boolean} value
 *
 * @return {void} void
 */
const onClose = (): void => {
  // Close modal
  emit('close', false)
}

/**
 * @description Submit
 *
 * @param {ITodoForm} form
 *
 * @return {void} void
 */
const onSubmit = async (): Promise<void> => {
  emit('submit')
}
</script>

<template>
  <v-modal
    width="500px"
    maxWidth="500px"
    :title="props.isEdit ? 'Edit Todo Form' : 'Create Todo Form'"
    :model-value="props.isOpen"
    :hide-footer="loading.isDetailLoading"
    @close="onClose"
    persistent
  >
    <!-- Loader -->
    <div
      v-if="loading.isDetailLoading"
      class="flex flex-col gap-2 justify-center items-center"
    >
      <v-spinner x-large />
      <p>Loading todo detail, please wait...</p>
    </div>

    <!-- Content -->
    <div v-if="!loading.isDetailLoading">
      <!-- Title -->
      <app-form-group>
        <v-input label="Title" name="title" />
      </app-form-group>

      <!-- Completed -->
      <app-form-group v-if="props.isEdit">
        <v-checkbox label="Completed" name="completed" />
      </app-form-group>
    </div>

    <!-- Footer -->
    <template #footer v-if="!loading.isDetailLoading">
      <v-btn
        color="primary"
        @click="onSubmit"
        :loading="loading.isCreateEditLoading"
        :disabled="loading.isCreateEditLoading"
      >
        Submit
      </v-btn>
    </template>
  </v-modal>
</template>
