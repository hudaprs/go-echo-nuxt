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

// Computed
const computedTableOptions = computed((): { headers: VDataTableHeader[] } => {
  return {
    headers: [
      { value: 'code', text: 'Code' },
      { value: 'actions.create', text: 'Create', align: 'center' },
      { value: 'actions.read', text: 'Read', align: 'center' },
      { value: 'actions.update', text: 'Update', align: 'center' },
      { value: 'actions.delete', text: 'Delete', align: 'center' }
    ]
  }
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
        :headers="computedTableOptions.headers"
        :items="props.list"
        hide-footer
      >
        <!-- Create -->
        <template #item.actions.create="{ item }">
          <v-checkbox
            class="flex items-center justify-center text-center"
            v-model="item.actions.create"
            @change="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'create',
                value: $event.target.checked as boolean
              })
            "
          />
        </template>

        <!-- Read -->
        <template #item.actions.read="{ item }">
          <v-checkbox
            class="flex items-center justify-center text-center"
            v-model="item.actions.read"
            @change="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'read',
                value: $event.target.checked as boolean
              })
            "
          />
        </template>

        <!-- Update -->
        <template #item.actions.update="{ item }">
          <v-checkbox
            class="flex items-center justify-center text-center"
            v-model="item.actions.update"
            @change="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'update',
                value: $event.target.checked as boolean
              })
            "
          />
        </template>

        <!-- Delete -->
        <template #item.actions.delete="{ item }">
          <v-checkbox
            class="flex items-center justify-center text-center"
            v-model="item.actions.delete"
            @change="
              onChangeActions({
                permission: item as IPermissionWithAction,
                actionKey: 'delete',
                value: $event.target.checked as boolean
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
