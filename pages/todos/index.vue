<script setup lang="ts">
// Interfaces
import type { VDataTableHeader } from '@gits-id/table'
import { ITodoResponseDetail } from '~~/utils/interfaces/todo/todoResponse'

// Pinia
import { storeToRefs } from 'pinia'

// Yup
import { object, string, bool } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
import { ITodoForm } from '~~/utils/interfaces/todo/todo'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Constants
import { TODO_FORM_INITIAL } from '~~/utils/constants/todo/todo'

// Lodash
import omit from 'lodash.omit'

// Toast
const toast = useToast()

// Todo Store
const todoStore = useTodoStore()
const { loading, list } = storeToRefs(todoStore)

// Common State
const tableOptions = reactive<{ headers: VDataTableHeader[] }>({
  headers: [
    { value: 'title', text: 'Title' },
    { value: 'completed', text: 'Completed' },
    { value: 'action', text: 'Action' }
  ]
})
const todoOptions = reactive({
  modal: { isCreateEditOpen: false },
  formState: { isEdit: false }
})

// Form
const validationSchema = object({
  title: string().required().label('Title'),
  completed: bool()
})
const { values, validate, resetForm } = useForm<ITodoForm>({
  validationSchema,
  initialValues: TODO_FORM_INITIAL
})

// Load data
const { refresh } = await useLazyAsyncData(() => todoStore.index())

/**
 * @description Handle form
 *
 * @param {string} type
 * @param {boolean} value
 *
 * @return {void} void
 */
const handleFormState = (type: 'isEdit', value: boolean): void => {
  todoOptions.formState[type] = value
}

/**
 * @description Handle modal
 *
 * @param {string} type
 * @param {boolean} value
 *
 * @return {void} void
 */
const handleModal = (type: 'isCreateEditOpen', value: boolean): void => {
  todoOptions.modal[type] = value

  // Check if user closing modal
  if (type === 'isCreateEditOpen' && !value) {
    // Reset the form
    resetForm({ values: TODO_FORM_INITIAL })

    // Reset the edit state
    if (todoOptions.formState.isEdit) {
      handleFormState('isEdit', false)
    }
  }
}

/**
 * @description Submit the form
 *
 * @return {void} void
 */
const onSubmit = async () => {
  const validateResponse = await validate()

  if (validateResponse.valid) {
    // Create new todo
    try {
      let response: ITodoResponseDetail

      if (todoOptions.formState.isEdit)
        response = await todoStore.update({
          params: { id: values.id as number },
          body: omit(values, ['id'])
        })
      else response = await todoStore.create({ body: values })

      // Throw toast
      toast.success(response.message)

      // Close modal
      handleModal('isCreateEditOpen', false)

      // Check if user is in edit mode
      if (todoOptions.formState.isEdit) {
        handleFormState('isEdit', false)
      }

      // Re-fetch the data
      refresh()
    } catch (_) {
      //
    }
  }
}

/**
 * @description Handle edit
 *
 * @param {number} id
 *
 * @return {Promise<void>} Promise<void>
 */
const handleEdit = async (id: number): Promise<void> => {
  // Open modal
  handleModal('isCreateEditOpen', true)

  // Make form state to edit
  handleFormState('isEdit', true)

  try {
    const {
      result: { title, completed }
    } = await todoStore.show({ params: { id } })

    // Set value to the form
    resetForm({
      values: {
        id,
        title,
        completed
      }
    })
  } catch (_) {
    // Close modal
    handleModal('isCreateEditOpen', false)

    // Make form state edit to false
    handleFormState('isEdit', false)
  }
}

/**
 * @description Handle delete
 *
 * @param {number} id
 *
 * @return {Promise<void>} Promise<void>
 */
const handleDelete = async (id: number): Promise<void> => {
  try {
    const response = await todoStore.delete({ params: { id } })

    toast.success(response.message)

    // Re-fetch
    refresh()
  } catch (_) {
    //
  }
}

// Do when user leaving the component
onUnmounted(() => {
  // Clear state
  todoStore.reset('list')
  todoStore.reset('detail')
})
</script>

<template>
  <div class="mb-4 flex justify-between items-center px-2">
    <p class="text-xl font-bold">Todo List</p>

    <v-btn @click="handleModal('isCreateEditOpen', true)"> Create Todo </v-btn>
  </div>

  <hr />

  <!-- Data Table -->
  <v-data-table
    :headers="tableOptions.headers"
    :items="list"
    :loading="loading.isDefaultLoading"
    server-side
    hide-footer
  >
    <!-- Completed -->
    <template v-slot:[`item.completed`]="{ item }">
      <v-badge :color="item.completed ? 'success' : 'warning'">
        {{ item.completed ? 'Completed' : 'Not Completed' }}
      </v-badge>
    </template>

    <!-- Action -->
    <template v-slot:[`item.action`]="{ item }">
      <div class="flex items-center gap-3">
        <v-btn color="primary" size="sm" @click="handleEdit(item.id)"
          >Edit</v-btn
        >
        <v-btn color="error" size="sm" @click="handleDelete(item.id)"
          >Delete</v-btn
        >
      </div>
    </template>
  </v-data-table>

  <!-- Modal For Create And Edit -->
  <todo-modal-create-edit
    :is-edit="todoOptions.formState.isEdit"
    :is-open="todoOptions.modal.isCreateEditOpen"
    @submit="onSubmit"
    @close="handleModal('isCreateEditOpen', false)"
  />
</template>
