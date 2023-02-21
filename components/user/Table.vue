<script setup lang="ts">
// GITS UI
import { VDataTableHeader } from '@gits-id/table/dist/types'

// Interfaces
import { IUserResponseList } from '~~/utils/interfaces/user/userResponse'
import { ICommonLoading } from '~~/utils/interfaces'
import { TCommonPagination } from '~~/utils/interfaces/common/common'
import { IPermissionAction } from '~~/utils/interfaces/permission/permission'

interface ITableProps {
  list: IUserResponseList['result']
  loading: ICommonLoading
  permissionActions: IPermissionAction
}

// Props
const props = defineProps<ITableProps>()

// Emitters
const emit = defineEmits<{
  (e: 'edit', value: number): void
  (e: 'delete', value: number): void
  (e: 'table', value: { type: TCommonPagination; value: any }): void
}>()

// Common State
const tableOptions = reactive<{ headers: VDataTableHeader[] }>({
  headers: [
    { value: 'name', text: 'Name' },
    { value: 'email', text: 'email' },
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
const onDelete = (id: number): void => {
  emit('delete', id)
}
</script>

<template>
  <v-data-table
    :headers="tableOptions.headers"
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
          color="error"
          size="sm"
          @click="onDelete(item.id)"
          v-if="props.permissionActions.delete"
        >
          Delete
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
