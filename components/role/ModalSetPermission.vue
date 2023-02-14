<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Interfaces
import { IPermissionResponseList } from '~~/utils/interfaces/permission/permissionResponse'

// Store
const todoStore = useTodoStore()
const permissionStore = usePermissionStore()
const { loading: todoLoading } = storeToRefs(todoStore)
const { loading: permissionLoading } = storeToRefs(permissionStore)

// Interfaces
interface IRoleSetPermissionProps {
  isOpen: boolean
  roleName: string
  list: IPermissionResponseList['result']
}

// Props
const props = defineProps<IRoleSetPermissionProps>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'submit'): void
  (e: 'refetch'): void
}>()

// Computed
const computedModalOptions = computed(() => {
  return {
    title: `Set permission of role ${props.roleName}`,
    loading:
      todoLoading.value.isDetailLoading ||
      permissionLoading.value.isDefaultLoading
  }
})

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
    :title="computedModalOptions.title"
    :model-value="props.isOpen"
    :hide-footer="computedModalOptions.loading"
    @close="onClose"
    persistent
  >
    <!-- Loader -->
    <div
      v-if="computedModalOptions.loading"
      class="flex flex-col gap-2 justify-center items-center"
    >
      <v-spinner x-large />
      <p>Loading permission list, please wait...</p>
    </div>

    <!-- Content -->
    <div v-if="!computedModalOptions.loading">
      <!-- Name -->
      <app-form-group>
        <v-input label="Name" name="name" />
      </app-form-group>
    </div>

    <!-- Footer -->
    <template #footer v-if="!computedModalOptions.loading">
      <v-btn
        color="primary"
        @click="onSubmit"
        :loading="permissionLoading.isCreateEditLoading"
        :disabled="permissionLoading.isCreateEditLoading"
      >
        Submit
      </v-btn>
    </template>
  </v-modal>
</template>
