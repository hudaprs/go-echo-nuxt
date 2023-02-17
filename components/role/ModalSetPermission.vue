<script setup lang="ts">
// Interfaces
import { ICommonLoading } from '~~/utils/interfaces'
import { IPermissionResponseList } from '~~/utils/interfaces/permission/permissionResponse'
import { IPermissionAttrsActionsChange } from '~~/utils/interfaces/permission/permissionAttrs'
import { IPermissionWithAction } from '~~/utils/interfaces/permission/permission'

// GITS UI
import { VDataTableHeader } from '@gits-id/table/src/types'

// Interfaces
interface IRoleSetPermissionProps {
  isOpen: boolean
  roleName: string
  list: IPermissionResponseList['result']
  loading: {
    roleLoading: ICommonLoading
    permissionLoading: ICommonLoading
  }
}

// Props
const props = defineProps<IRoleSetPermissionProps>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'submit'): void
  (e: 'refetch'): void
  (e: 'change:actions', value: IPermissionAttrsActionsChange): void
}>()

// Common State
const tableOptions = reactive<{ headers: VDataTableHeader[] }>({
  headers: [
    { value: 'code', text: 'Code' },
    { value: 'actions.create', text: 'Create' },
    { value: 'actions.read', text: 'Read' },
    { value: 'actions.update', text: 'Update' },
    { value: 'actions.delete', text: 'Delete' }
  ]
})

// Computed
const computedModalOptions = computed(() => {
  return {
    title: `Set permission of role ${props.roleName}`,
    loading:
      props.loading.roleLoading.isDetailLoading ||
      props.loading.permissionLoading.isDefaultLoading
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
 * @description Watch any change in permission actions
 *
 * @param {IPermissionAttrsActionsChange} payload
 *
 * @return {void} void
 */
const onChangeActions = (payload: IPermissionAttrsActionsChange): void => {
  emit('change:actions', payload)
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
    width="1366px"
    maxWidth="1366px"
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
      <v-data-table
        :headers="tableOptions.headers"
        :items="props.list"
        hide-footer
      >
        <!-- Create -->
        <template #item.actions.create="{ item }">
          <v-checkbox
            :model-value="item.actions.create"
            @update:model-value="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'create',
                value: $event as boolean
              })
            "
          />
        </template>

        <!-- Read -->
        <template #item.actions.read="{ item }">
          <v-checkbox
            :model-value="item.actions.read"
            @update:model-value="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'read',
                value: $event as boolean
              })
            "
          />
        </template>

        <!-- Update -->
        <template #item.actions.update="{ item }">
          <v-checkbox
            :model-value="item.actions.update"
            @update:model-value="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'update',
                value: $event as boolean
              })
            "
          />
        </template>

        <!-- Delete -->
        <template #item.actions.delete="{ item }">
          <v-checkbox
            :model-value="item.actions.delete"
            @update:model-value="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'delete',
                value: $event as boolean
              })
            "
          />
        </template>
      </v-data-table>
    </div>

    <!-- Footer -->
    <template #footer v-if="!computedModalOptions.loading">
      <v-btn
        color="primary"
        @click="onSubmit"
        :loading="props.loading.permissionLoading.isCreateEditLoading"
        :disabled="props.loading.permissionLoading.isCreateEditLoading"
      >
        Submit
      </v-btn>
    </template>
  </v-modal>
</template>