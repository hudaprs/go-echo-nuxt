<script setup lang="ts">
// Interfaces
import type { VDataTableHeader } from '@gits-id/table'
import { storeToRefs } from 'pinia'

// Todo Store
const todoStore = useTodoStore()
const { list } = storeToRefs(todoStore)

// Common State
const tableOptions = reactive<{ headers: VDataTableHeader[] }>({
  headers: [
    { value: 'title', text: 'Title' },
    { value: 'completed', text: 'Completed' },
    { value: '', text: 'Action' }
  ]
})
const modalOptions = reactive({ isCreateEditOpen: false })
const formOptions = reactive({ isEdit: false })

// Load data
const { pending } = await useLazyAsyncData(() => todoStore.index())

/**
 * @description Handle modal
 *
 * @param {string} type
 * @param {boolean} value
 *
 * @return {void} void
 */
const handleModal = (type: 'isCreateEditOpen', value: boolean): void => {
  modalOptions[type] = value
}
</script>

<template>
  <div class="mb-4 flex justify-between items-center px-2">
    <h5>Todo List</h5>

    {{ modalOptions }}

    <v-btn @click="handleModal('isCreateEditOpen', true)"> Create Todo </v-btn>
  </div>

  <hr />

  <!-- Data Table -->
  <v-data-table
    :headers="tableOptions.headers"
    :items="list"
    :loading="pending"
    hide-footer
  />

  <!-- Modal For Create And Edit -->
  <todo-modal-create-edit
    :is-edit="formOptions.isEdit"
    :is-open="modalOptions.isCreateEditOpen"
    @close="handleModal('isCreateEditOpen', false)"
  />
</template>
