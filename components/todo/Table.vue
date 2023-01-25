<script setup lang="ts">
// GITS UI
import { VDataTableHeader } from '@gits-id/table/dist/types'

// Interfaces
import { ITodo } from '~~/utils/interfaces/todo/todo'
import { ICommonLoading } from '~~/utils/interfaces'

interface ITableProps {
  list: ITodo[]
  loading: ICommonLoading
}

// Props
const props = defineProps<ITableProps>()

// Emitters
const emit = defineEmits<{
  (e: 'edit', value: number): void
  (e: 'delete-confirmation', value: number): void
}>()

// Common State
const tableOptions = reactive<{ headers: VDataTableHeader[] }>({
  headers: [
    { value: 'title', text: 'Title' },
    { value: 'completed', text: 'Completed' },
    { value: 'action', text: 'Action' }
  ]
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
</script>

<template>
  <v-data-table
    :headers="tableOptions.headers"
    :items="props.list"
    :loading="loading.isDefaultLoading"
    server-side
    hide-footer
  >
    <!-- Completed -->
    <template #item.completed="{ item }">
      <v-badge :color="item.completed ? 'success' : 'warning'">
        {{ item.completed ? 'Completed' : 'Not Completed' }}
      </v-badge>
    </template>

    <!-- Action -->
    <template #item.action="{ item }">
      <div class="flex items-center gap-3">
        <v-btn color="primary" size="sm" @click="onEdit(item.id)">Edit</v-btn>
        <v-btn
          color="error"
          size="sm"
          @click="deleteConfirmation(item.id)"
          :loading="item?.loading?.isDetailLoading"
          :disabled="item?.loading?.isDetailLoading"
          >Delete</v-btn
        >
      </div>
    </template>
  </v-data-table>
</template>
