<script setup lang="ts">
// Interfaces
import { IAuthFormChangeRole } from '~/utils/interfaces/auth/auth'
import { ICommonLoading } from '~~/utils/interfaces'
import { IRoleWithPermission } from '~~/utils/interfaces/role/role'

// Lodash
import omit from 'lodash.omit'

// Props
const props = defineProps<{
  isOpen: boolean
  loading: ICommonLoading
  roleList: { text: string; value: any }[]
  previousActiveRole: IRoleWithPermission | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'submit', value: IAuthFormChangeRole): void
  (e: 'close', value: false): void
}>()

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
</script>

<template>
  <v-modal
    width="500px"
    maxWidth="500px"
    title="Change role form"
    :model-value="props.isOpen"
    @close="onClose"
    hide-footer
    persistent
  >
    <auth-form-change-role
      v-bind="omit(props, ['isOpen'])"
      @submit="emit('submit', $event)"
    />
  </v-modal>
</template>
