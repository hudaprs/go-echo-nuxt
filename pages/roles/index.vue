<script setup lang="ts">
// Interfaces
import { TCommonPagination } from '~~/utils/interfaces/common/common'
import { IRoleResponseDetail } from '~~/utils/interfaces/role/roleResponse'
import { IPermissionAttrsActionsChange } from '~~/utils/interfaces/permission/permissionAttrs'

// Pinia
import { storeToRefs } from 'pinia'

// Yup
import { object, string } from 'yup'

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
const {
  loading: roleLoading,
  list: roleList,
  detail: roleDetail
} = storeToRefs(roleStore)

// Permission Store
const permissionStore = usePermissionStore()
const { loading: permissionLoading, list: permissionList } =
  storeToRefs(permissionStore)

// Common Store
const commonStore = useCommonStore()

// Common State
const roleOptions = reactive({
  modal: {
    isCreateEditOpen: false,
    isDeleteOpen: false,
    isSetPermissionOpen: false
  },
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
  type: 'isCreateEditOpen' | 'isDeleteOpen' | 'isSetPermissionOpen',
  value: boolean
): void => {
  roleOptions.modal[type] = value

  // Check if user closing modal
  if (!value) {
    // Check if user closing modal create edit
    if (type === 'isCreateEditOpen') {
      // Reset the form
      resetForm({ values: ROLE_FORM_INITIAL })

      // Reset the edit state
      if (roleOptions.formState.isEdit) {
        handleFormState('isEdit', false)
      }
    }

    // Check if user closing set permission modal
    if (type === 'isSetPermissionOpen') {
      //
    }

    permissionStore.reset('list')
    roleStore.reset('detail')
  }

  // Check if user closing confirmation modal
  if (type === 'isDeleteOpen' && !value) {
    // Reset detail of role
    if (roleDetail !== null) {
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
 * @return {Promise<void>} Promise<void>
 */
const deleteConfirmation = async (id: number): Promise<void> => {
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

/**
 * @description Set permission of roles
 *
 * @param {number} id
 *
 * @return {Promise<void>} Promise<void>
 */
const setPermission = async (id: number): Promise<void> => {
  try {
    // Open modal set permission
    handleModal('isSetPermissionOpen', true)

    // Fetch role detail
    const roleDetailResponse = await roleStore.show({ params: { id } })

    // Fetch permission list
    await permissionStore.index()

    // Map permission
    permissionStore.SET_PERMISSION_ACTIONS(
      roleDetailResponse.result.permissions
    )
  } catch (_) {
    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to fetch role and permission',
      confirm: () => {
        setPermission(id)
      }
    })
  }
}

/**
 * @description Watch any change in permission actions
 *
 * @param {object} payload
 *
 * @return {void} void
 */
const onChangePermissionActions = (
  payload: IPermissionAttrsActionsChange
): void => {
  permissionStore.SET_PERMISSION_ACTIONS_VALUE(payload)
}

/**
 * @description Assign permissions for specific role
 *
 * @return {Promise<void>} Promise<void>
 */
const assignPermissions = async (): Promise<void> => {
  try {
    // Save permissions by role
    const response = await permissionStore.store({
      params: { roleId: roleDetail?.value?.id as number },
      body: {
        permissions: permissionList.value.map(permission => ({
          id: permission.id,
          actions: permission.actions
        }))
      }
    })

    // Throw Toast
    toast.success(response.message)

    // Close modal
    handleModal('isSetPermissionOpen', false)
  } catch (_) {
    // Throw some refetch
    commonStore.SET_MODAL_REFETCH({
      isOpen: true,
      message: 'Something went wrong when start to assign permissions to role',
      confirm: () => {
        assignPermissions()
      }
    })
  }
}

// Do when user leaving the component
onUnmounted(() => {
  // Clear state
  roleStore.reset('list')
  roleStore.reset('detail')
  permissionStore.reset('list')
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
    :list="roleList"
    :loading="roleLoading"
    @edit="handleEdit"
    @table="onChangeTable"
    @delete-confirmation="deleteConfirmation"
    @set-permission="setPermission"
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
    :loading="roleLoading.isDeleteLoading"
    @confirm="handleDelete(roleDetail?.id as number)"
    @close="handleModal('isDeleteOpen', false)"
  />

  <!-- Modal For Set Permission -->
  <role-modal-set-permission
    :is-open="roleOptions.modal.isSetPermissionOpen"
    :role-name="(roleDetail?.name as string) || ''"
    :list="permissionList"
    :loading="{
      roleLoading,
      permissionLoading
    }"
    @change:actions="onChangePermissionActions"
    @submit="assignPermissions"
    @close="handleModal('isSetPermissionOpen', false)"
  />
</template>
