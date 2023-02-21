<script setup lang="ts">
// Interfaces
import { ITodoResponseDetail } from '~~/utils/interfaces/todo/todoResponse'
import { IPermissionActionString } from '~~/utils/interfaces/permission/permission'
import { TCommonPagination } from '~~/utils/interfaces/common/common'

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

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
  permission: {
    code: 'TODO',
    actions: [IPermissionActionString.READ]
  }
})

// Set page head
useHead({
  title: 'Todo'
})

// Toast
const toast = useToast()

// Todo Store
const todoStore = useTodoStore()
const { loading, list, detail } = storeToRefs(todoStore)

// Common Store
const commonStore = useCommonStore()

// Common State
const todoOptions = reactive({
  modal: { isCreateEditOpen: false, isDeleteOpen: false },
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

// Composables
const { paginationOptions, onChangePagination } = usePagination()
const { checkPermissionActions } = useRoleChecker()
const permissionActions = checkPermissionActions('TODO')

// Load data
const { refresh, error } = await useLazyAsyncData(() =>
  todoStore.index({ params: paginationOptions })
)

// Watch if theres any error when fetching todo list
watch(
  () => error,
  newErrorValue => {
    if (newErrorValue.value) {
      commonStore.SET_MODAL_REFETCH({
        message: 'Something went wrong when fetching todo list',
        isOpen: true,
        confirm: () => {
          refresh()
        }
      })
    }
  },
  { deep: true }
)

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
const handleModal = (
  type: 'isCreateEditOpen' | 'isDeleteOpen',
  value: boolean
): void => {
  todoOptions.modal[type] = value

  // Check if user closing modal
  if (type === 'isCreateEditOpen' && value) {
    // Reset the form
    resetForm({ values: TODO_FORM_INITIAL })

    // Reset the edit state
    if (todoOptions.formState.isEdit) {
      handleFormState('isEdit', false)
    }
  }

  // Check if user closing confirmation modal
  if (type === 'isDeleteOpen' && !value) {
    // Reset detail of todo
    if (detail !== null) {
      todoStore.reset('detail')
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
      commonStore.SET_MODAL_REFETCH({
        isOpen: true,
        message: `Something went wrong when start to ${
          todoOptions.formState.isEdit ? 'edit' : 'create'
        } todo`,
        confirm: () => {
          onSubmit()
        }
      })
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

    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to fetch detail of todo',
      confirm: () => {
        handleEdit(id)
      }
    })
  }
}

/**
 * @description Delete confirmation
 *
 * @param {number} id
 *
 * @return {Promise<void>} Promise<void>
 */
const deleteConfirmation = async (id: number): Promise<void> => {
  try {
    // Fetch the detail of todo, just to make sure data exists inside server
    await todoStore.show({ params: { id } })

    handleModal('isDeleteOpen', true)
  } catch (err) {
    // Close the modal
    handleModal('isDeleteOpen', false)

    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete todo',
      confirm: () => {
        deleteConfirmation(id)
      }
    })
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
    const response = await todoStore.destroy({ params: { id } })

    // Throw Toast
    toast.success(response.message)

    // Re-fetch
    refresh()

    // Clear state
    todoStore.reset('detail')

    // Close confirmation modal
    if (todoOptions.modal.isDeleteOpen) handleModal('isDeleteOpen', false)
  } catch (_) {
    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete todo',
      confirm: () => {
        handleDelete(id)
      }
    })
  }
}

/**
 * @description Watch any change in table
 *
 * @param {any} payload
 *
 * @return {void} void
 */
const onChangeTable = (payload: {
  type: TCommonPagination
  value: any
}): void => {
  onChangePagination(payload.type, payload.value, _paginationOptions => {
    todoStore.index({ params: _paginationOptions })
  })
}

// Do when user leaving the component
onUnmounted(() => {
  // Clear state
  todoStore.reset('list')
  todoStore.reset('detail')
})
</script>

<template>
  <!-- Header -->
  <div class="mb-4 flex justify-between items-center px-2">
    <p class="text-xl font-bold">Todo List</p>

    <v-btn
      @click="handleModal('isCreateEditOpen', true)"
      v-if="permissionActions.create"
    >
      Create Todo
    </v-btn>
  </div>

  <hr />

  <!-- Data Table -->
  <todo-table
    :list="list"
    :loading="loading"
    :permission-actions="permissionActions"
    @edit="handleEdit"
    @table="onChangeTable"
    @delete-confirmation="deleteConfirmation"
  />

  <!-- Modal For Create And Edit -->
  <todo-modal-create-edit
    :is-edit="todoOptions.formState.isEdit"
    :is-open="todoOptions.modal.isCreateEditOpen"
    @submit="onSubmit"
    @close="handleModal('isCreateEditOpen', false)"
  />

  <!-- Modal Confirmation For Delete -->
  <app-modal-confirmation
    title="Delete Todo"
    message="Are you sure want to delete todo?"
    :is-open="todoOptions.modal.isDeleteOpen"
    :loading="loading.isDeleteLoading"
    @table="onChangeTable"
    @confirm="handleDelete(detail?.id as number)"
    @close="handleModal('isDeleteOpen', false)"
  />
</template>
