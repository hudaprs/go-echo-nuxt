<script setup lang="ts">
// GITS UI
import { VDataTableHeader } from '@gits-id/table/dist/types'

// Interfaces
import { IRoleResponseList } from '~~/utils/interfaces/role/roleResponse'
import { ICommonLoading } from '~~/utils/interfaces'
import { TCommonPagination } from '~~/utils/interfaces/common/common'
import { IPermissionAction } from '~~/utils/interfaces/permission/permission'

interface ITableProps {
  list: IRoleResponseList['result']
  loading: ICommonLoading
  permissionActions: IPermissionAction
}

// Props
const props = defineProps<ITableProps>()

// Emitters
const emit = defineEmits<{
  (e: 'edit', value: number): void
  (e: 'set-permission', value: number): void
  (e: 'delete-confirmation', value: number): void
  (e: 'table', value: { type: TCommonPagination; value: any }): void
}>()

// Computed
const computedTableOptions = computed((): { headers: VDataTableHeader[] } => {
  return {
    headers: [
      { value: 'name', text: 'Name' },
      { value: 'createdAt', text: 'Created At' },
      { value: 'updatedAt', text: 'Updated At' },
      { value: 'action', text: 'Action' }
    ].filter(header => {
      if (props.permissionActions.update || props.permissionActions.delete) {
        return header
      } else {
        return !['action'].includes(header.value)
      }
    })
  }
})

/**
 * @description Edit handler
 *
 * @param {number} id
 *
 * @return {void} void
 */
const onEdit = (id: number): void => {
  emit('edit', id)
}

/**
 * @description Confirmation before delete
 *
 * @param {number} id
 *
 * @return {void} void
 */
const deleteConfirmation = (id: number): void => {
  emit('delete-confirmation', id)
}

/**
 * @description Set permission
 *
 * @param {number} id
 *
 * @return {void} void
 */
const setPermission = (id: number): void => {
  emit('set-permission', id)
}
</script>

<template>
  <v-data-table
    :headers="computedTableOptions.headers"
    :items="props.list.rows"
    :loading="loading.isDefaultLoading"
    :total-items="props.list.totalRows"
    :items-per-page="props.list.limit"
    @page:change="emit('table', { type: 'page', value: $event })"
    @update:items-per-page="emit('table', { type: 'limit', value: $event })"
    server-side
  >
    <!-- Action -->
    <template #item.action="{ item }">
      <div class="flex items-center gap-3">
        <v-btn
          color="primary"
          size="sm"
          @click="onEdit(item.id)"
          v-if="props.permissionActions.update"
        >
          Edit
        </v-btn>
        <v-btn
          color="warning"
          size="sm"
          @click="setPermission(item.id)"
          v-if="props.permissionActions.update"
        >
          Set Permission
        </v-btn>
        <v-btn
          color="error"
          size="sm"
          @click="deleteConfirmation(item.id)"
          v-if="props.permissionActions.delete"
        >
          Delete
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
