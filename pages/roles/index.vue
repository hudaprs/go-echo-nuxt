<script setup lang="ts">
// Interfaces
import { TCommonPagination } from '~~/utils/interfaces/common/common'
import { IRoleResponseDetail } from '~~/utils/interfaces/role/roleResponse'

// Pinia
import { storeToRefs } from 'pinia'

// Yup
import { object, string, bool } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
import { IRoleForm } from '~~/utils/interfaces/role/role'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Constants
import { ROLE_FORM_INITIAL } from '~~/utils/constants/role/role'

// Lodash
import omit from 'lodash.omit'

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

// Set page head
useHead({
  title: 'Role Management'
})

// Toast
const toast = useToast()

// Todo Store
const roleStore = useRoleStore()
const { loading, list, detail } = storeToRefs(roleStore)

// Common Store
const commonStore = useCommonStore()

// Common State
const roleOptions = reactive({
  modal: { isCreateEditOpen: false, isDeleteOpen: false },
  formState: { isEdit: false }
})

// Composables
const { paginationOptions, onChangePagination } = usePagination()

// Form
const validationSchema = object({
  name: string().required().label('Name')
})
const { values, validate, resetForm } = useForm<IRoleForm>({
  validationSchema,
  initialValues: ROLE_FORM_INITIAL
})

// Load data
const { refresh, error } = await useLazyAsyncData(() =>
  roleStore.index({ params: paginationOptions })
)

// Watch if theres any error when fetching role list
watch(
  () => error,
  newErrorValue => {
    if (newErrorValue.value) {
      commonStore.SET_MODAL_REFETCH({
        message: 'Something went wrong when fetching role list',
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
  roleOptions.formState[type] = value
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
  roleOptions.modal[type] = value

  // Check if user closing modal
  if (type === 'isCreateEditOpen' && !value) {
    // Reset the form
    resetForm({ values: ROLE_FORM_INITIAL })

    // Reset the edit state
    if (roleOptions.formState.isEdit) {
      handleFormState('isEdit', false)
    }
  }

  // Check if user closing confirmation modal
  if (type === 'isDeleteOpen' && !value) {
    // Reset detail of role
    if (detail !== null) {
      roleStore.reset('detail')
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
    // Create new role
    try {
      let response: IRoleResponseDetail

      if (roleOptions.formState.isEdit)
        response = await roleStore.update({
          params: { id: values.id as number },
          body: omit(values, ['id'])
        })
      else response = await roleStore.store({ body: values })

      // Throw toast
      toast.success(response.message)

      // Close modal
      handleModal('isCreateEditOpen', false)

      // Check if user is in edit mode
      if (roleOptions.formState.isEdit) {
        handleFormState('isEdit', false)
      }

      // Re-fetch the data
      onChangePagination('reset', null, _paginationOptions =>
        roleStore.index({ params: _paginationOptions })
      )
    } catch (_) {
      commonStore.SET_MODAL_REFETCH({
        isOpen: true,
        message: `Something went wrong when start to ${
          roleOptions.formState.isEdit ? 'edit' : 'create'
        } role`,
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
      result: { name }
    } = await roleStore.show({ params: { id } })

    // Set value to the form
    resetForm({
      values: {
        id,
        name
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
      message: 'Something went wrong when start to fetch detail of role',
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
 * @return {void} void
 */
const deleteConfirmation = async (id: number) => {
  try {
    // Fetch the detail of role, just to make sure data exists inside server
    await roleStore.show({ params: { id } })

    handleModal('isDeleteOpen', true)
  } catch (err) {
    // Close the modal
    handleModal('isDeleteOpen', false)

    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete role',
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
    const response = await roleStore.destroy({ params: { id } })

    // Throw Toast
    toast.success(response.message)

    // Re-fetch
    refresh()

    // Clear state
    roleStore.reset('detail')

    // Close confirmation modal
    if (roleOptions.modal.isDeleteOpen) handleModal('isDeleteOpen', false)
  } catch (_) {
    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete role',
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
    roleStore.index({ params: _paginationOptions })
  })
}

// Do when user leaving the component
onUnmounted(() => {
  // Clear state
  roleStore.reset('list')
  roleStore.reset('detail')
})
</script>

<template>
  <!-- Header -->
  <div class="mb-4 flex justify-between items-center px-2">
    <p class="text-xl font-bold">Role List</p>

    <v-btn @click="handleModal('isCreateEditOpen', true)"> Create Role </v-btn>
  </div>

  <hr />

  <!-- Data Table -->
  <role-table
    :list="list"
    :loading="loading"
    @edit="handleEdit"
    @delete-confirmation="deleteConfirmation"
    @table="onChangeTable"
  />

  <!-- Modal For Create And Edit -->
  <role-modal-create-edit
    :is-edit="roleOptions.formState.isEdit"
    :is-open="roleOptions.modal.isCreateEditOpen"
    @submit="onSubmit"
    @close="handleModal('isCreateEditOpen', false)"
  />

  <!-- Modal Confirmation For Delete -->
  <app-modal-confirmation
    title="Delete Role"
    message="Are you sure want to delete role?"
    :is-open="roleOptions.modal.isDeleteOpen"
    :loading="loading.isDeleteLoading"
    @confirm="handleDelete(detail?.id as number)"
    @close="handleModal('isDeleteOpen', false)"
  />
</template>
