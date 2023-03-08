<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Interfaces
import { TCommonLang } from '~/utils/interfaces/common/common'

// Store
const authStore = useAuthStore()
const { loading, roleList, activeRole } = storeToRefs(authStore)

// Router
const router = useRouter()

// Toast
const toast = useToast()

// i18n
const { t, onChangeLang } = useLocale()

// Props
const props = defineProps<{
  isOpen: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: false): void
}>()

// Common State
const defaultOptions = reactive({
  modal: { isConfirmationChangeRoleOpen: false },
  form: { roleId: 0 },
  langs: [
    { text: 'Indonesia', value: 'id' },
    { text: 'English', value: 'en' }
  ]
})

/**
 * @description Modal handler
 *
 * @param {string} type
 * @param {boolean} value
 *
 * @return {void} void
 */
const handleModal = (
  type: 'isConfirmationChangeRoleOpen',
  value: boolean
): void => {
  defaultOptions.modal[type] = value
}

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
 * @description Watch any change when user change role input
 *
 * @param {number} roleId
 *
 * @return {void} void
 */
const onChangeRole = (roleId: number): void => {
  defaultOptions.form.roleId = roleId

  handleModal('isConfirmationChangeRoleOpen', true)
}

/**
 * @description Change role handler
 *
 * @return {Promise<void>} Promise<void>
 */
const changeRoleHandler = async (): Promise<void> => {
  try {
    // Change current active role to new one
    const response = await authStore.activateRole({
      params: { roleId: defaultOptions.form.roleId }
    })

    // Load current user
    await authStore.me()

    // Throw message to user
    toast.success(response.message)

    // Close modal
    onClose()

    // Close confirmation modal
    handleModal('isConfirmationChangeRoleOpen', false)

    // Force redirect to index
    router.replace({ name: 'index' })
  } catch (_) {
    //
  }
}
</script>

<template>
  <v-modal
    width="500px"
    maxWidth="500px"
    :title="t('general.config')"
    :model-value="props.isOpen"
    @close="onClose"
    hide-footer
    persistent
  >
    <app-form-group class="mb-6">
      <v-select
        :label="t('general.language')"
        :items="defaultOptions.langs"
        v-model="$i18n.locale"
        @change="onChangeLang($event as TCommonLang)"
      />
    </app-form-group>

    <!-- Change Role Form -->
    <auth-form-change-role
      :loading="loading"
      :previous-active-role="activeRole"
      :role-list="roleList"
      @change="onChangeRole"
      from-other-menu
    />
  </v-modal>

  <!-- Modal Confirmation -->
  <app-modal-confirmation
    :title="t('changeRole.question.areYouSureWantToChangeRole')"
    :message="t('changeRole.question.changeRoleAfter')"
    :is-open="defaultOptions.modal.isConfirmationChangeRoleOpen"
    @confirm="changeRoleHandler"
    @close="handleModal('isConfirmationChangeRoleOpen', false)"
  />
</template>
