<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// GITS UI
import { VMultiSelectItem } from '@gits-id/multi-select/src/types'

// Interfaces
import { ICommonLoading } from '~~/utils/interfaces'

// Interfaces
interface IRoleModalCreateEditProps {
  isOpen: boolean
  isEdit: boolean
  loading: ICommonLoading
  dropdown: {
    role: {
      loading: ICommonLoading
      list: VMultiSelectItem[]
    }
  }
}

// Props
const props = defineProps<IRoleModalCreateEditProps>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'change:roles', value: VMultiSelectItem[]): void
  (e: 'submit'): void
  (e: 'refetch'): void
}>()

// Computed
const computedModalOptions = computed(() => {
  return {
    title: `${props.isEdit ? 'Edit' : 'Create'} Role Form`
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
    :hide-footer="props.loading.isDetailLoading"
    @close="onClose"
    persistent
  >
    <!-- Loader -->
    <div
      v-if="props.loading.isDetailLoading"
      class="flex flex-col gap-2 justify-center items-center"
    >
      <v-spinner x-large />
      <p>Loading role detail, please wait...</p>
    </div>

    <!-- Content -->
    <div v-if="!loading.isDetailLoading">
      <!-- Name -->
      <app-form-group>
        <v-input label="Name" name="name" />
      </app-form-group>

      <!-- Email -->
      <app-form-group>
        <v-input label="Email" name="email" />
      </app-form-group>

      <!-- Roles -->
      <app-form-group>
        <v-multi-select
          label="Roles"
          name="roles"
          :items="props.dropdown.role.list"
          :loading="props.dropdown.role.loading.isDefaultLoading"
        />
      </app-form-group>
    </div>

    <!-- Footer -->
    <template #footer v-if="!props.loading.isDetailLoading">
      <v-btn
        color="primary"
        @click="onSubmit"
        :loading="props.loading.isCreateEditLoading"
        :disabled="props.loading.isCreateEditLoading"
      >
        Submit
      </v-btn>
    </template>
  </v-modal>
</template>
