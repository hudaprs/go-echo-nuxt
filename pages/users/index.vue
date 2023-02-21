<script setup lang="ts">
// Interfaces
import { TCommonPagination } from '~~/utils/interfaces/common/common'
import { IUserResponseDetailWithRole } from '~~/utils/interfaces/user/userResponse'
import { IPermissionActionString } from '~~/utils/interfaces/permission/permission'

// Yup
import { object, string } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
import { IUserForm } from '~~/utils/interfaces/user/user'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Constants
import { USER_FORM_INITIAL } from '~~/utils/constants/user/user'

// Lodash
import omit from 'lodash.omit'

// Pinia
import { storeToRefs } from 'pinia'

// Set page meta
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
  permission: {
    code: 'USER_MANAGEMENT',
    actions: [IPermissionActionString.READ]
  }
})

// Set page head
useHead({
  title: 'User Management'
})

// Toast
const toast = useToast()

// User Store
const userStore = useUserStore()
const { loading, list, detail, dropdown, roleList } = storeToRefs(userStore)

// Common Store
const commonStore = useCommonStore()

// Common State
const userOptions = reactive({
  modal: {
    isCreateEditOpen: false,
    isDeleteOpen: false
  },
  formState: { isEdit: false }
})

// Composables
const { paginationOptions, onChangePagination } = usePagination()
const { checkPermissionActions } = useRoleChecker()
const permissionActions = checkPermissionActions('USER_MANAGEMENT')

// Form
const validationSchema = object({
  name: string().required().label('Name'),
  email: string().required().email().label('Email')
})
const { values, validate, resetForm } = useForm<IUserForm>({
  validationSchema
})

// Load data
const { refresh, error } = await useLazyAsyncData(() =>
  userStore.index({ params: paginationOptions })
)

// Watch if theres any error when fetching user list
watch(
  () => error,
  newErrorValue => {
    if (newErrorValue.value) {
      commonStore.SET_MODAL_REFETCH({
        message: 'Something went wrong when fetching user list',
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
  userOptions.formState[type] = value
}

/**
 * @description Load roles
 *
 * @return {Promise<void>} Promise<void>
 */
const onLoadRoleList = async (): Promise<void> => {
  try {
    await userStore.roleIndex()
  } catch (_) {
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: `Something went wrong when start to fetch roles`,
      confirm: () => {
        onLoadRoleList()
      }
    })
  }
}

onMounted(() => {
  onLoadRoleList()
})

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
  userOptions.modal[type] = value

  // Check if user is opening modal
  if (value) {
    // Check if user opening modal create edit
    if (type === 'isCreateEditOpen') {
      // Load role list
      onLoadRoleList()

      // Reset the form
      resetForm({ values: USER_FORM_INITIAL })
    }
  }

  // Check if user closing modal
  if (!value) {
    // Check if user closing modal create edit
    if (type === 'isCreateEditOpen') {
      // Reset the edit state
      if (userOptions.formState.isEdit) {
        handleFormState('isEdit', false)
      }
    }

    userStore.reset('detail')
  }

  // Check if user closing confirmation modal
  if (type === 'isDeleteOpen' && !value) {
    // Reset detail of user
    if (userStore.detail !== null) {
      userStore.reset('detail')
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
    // Create new user
    try {
      let response: IUserResponseDetailWithRole

      if (userOptions.formState.isEdit)
        response = await userStore.update({
          params: { id: values.id as number },
          body: omit(values, ['id']) as any
        })
      else response = await userStore.store({ body: values as any })

      // Throw toast
      toast.success(response.message)

      // Close modal
      handleModal('isCreateEditOpen', false)

      // Check if user is in edit mode
      if (userOptions.formState.isEdit) {
        handleFormState('isEdit', false)
      }

      // Re-fetch the data
      onChangePagination('reset', null, _paginationOptions =>
        userStore.index({ params: _paginationOptions })
      )
    } catch (_) {
      commonStore.SET_MODAL_REFETCH({
        isOpen: true,
        message: `Something went wrong when start to ${
          userOptions.formState.isEdit ? 'edit' : 'create'
        } user`,
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
      result: { name, email, roles }
    } = await userStore.show({ params: { id } })

    // Set value to the form
    resetForm({
      values: {
        id,
        name,
        email,
        roles: roles.map(role => ({ text: role.name, value: role.id }))
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
      message: 'Something went wrong when start to fetch detail of user',
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
    // Fetch the detail of user, just to make sure data exists inside server
    await userStore.show({ params: { id } })

    handleModal('isDeleteOpen', true)
  } catch (err) {
    // Close the modal
    handleModal('isDeleteOpen', false)

    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete user',
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
    const response = await userStore.destroy({ params: { id } })

    // Throw Toast
    toast.success(response.message)

    // Re-fetch
    refresh()

    // Clear state
    userStore.reset('detail')

    // Close confirmation modal
    if (userOptions.modal.isDeleteOpen) handleModal('isDeleteOpen', false)
  } catch (_) {
    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to delete user',
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
    userStore.index({ params: _paginationOptions })
  })
}

// Do when user leaving the component
onUnmounted(() => {
  // Clear state
  userStore.reset('list')
  userStore.reset('detail')
})
</script>

<template>
  <!-- Header -->
  <div class="mb-4 flex justify-between items-center px-2">
    <p class="text-xl font-bold">User List</p>

    <v-btn
      @click="handleModal('isCreateEditOpen', true)"
      v-if="permissionActions.create"
    >
      Create User
    </v-btn>
  </div>

  <hr />

  <!-- Data Table -->
  <user-table
    :list="list"
    :loading="loading"
    :permission-actions="permissionActions"
    @edit="handleEdit"
    @table="onChangeTable"
    @delete="deleteConfirmation"
  />

  <!-- Modal For Create And Edit -->
  <user-modal-create-edit
    :is-edit="userOptions.formState.isEdit"
    :is-open="userOptions.modal.isCreateEditOpen"
    :loading="loading"
    :dropdown="{
      role: {
        loading: dropdown.role.loading,
        list: roleList
      }
    }"
    @submit="onSubmit"
    @close="handleModal('isCreateEditOpen', false)"
  />

  <!-- Modal Confirmation For Delete -->
  <app-modal-confirmation
    title="Delete User"
    message="Are you sure want to delete user?"
    :is-open="userOptions.modal.isDeleteOpen"
    :loading="loading.isDeleteLoading"
    @confirm="handleDelete(detail?.id as number)"
    @close="handleModal('isDeleteOpen', false)"
  />
</template>
