<script setup lang="ts">
// Interfaces
import { IAuthFormChangeRole } from '~/utils/interfaces/auth/auth'
import { ICommonLoading } from '~~/utils/interfaces'
import { IRoleWithPermission } from '~~/utils/interfaces/role/role'

// Vee Validate
import { useForm } from 'vee-validate'

// Yup
import { object } from 'yup'

// Props
const props = defineProps<{
  loading: ICommonLoading
  roleList: { text: string; value: any }[]
  previousActiveRole: IRoleWithPermission | null
}>()

// Emits
const emit = defineEmits<{ (e: 'submit', value: IAuthFormChangeRole): void }>()

// Form
const validationSchema = object({
  role: object().required().label('Role')
})
const { handleSubmit } = useForm<IAuthFormChangeRole>({
  validationSchema
})

/**
 * @description Submit form handler
 *
 * @param {IAuthFormChangeRole} form
 *
 * @return {void} void
 */
const onSubmit = handleSubmit((form): void => {
  emit('submit', form)
})
</script>

<template>
  <v-alert class="mb-3" color="success" v-if="props.previousActiveRole">
    Your previous active role is {{ props.previousActiveRole.name }}
  </v-alert>

  <form @submit="onSubmit">
    <!-- Role -->
    <app-form-group>
      <v-autocomplete label="Role" name="role" :items="props.roleList" />
    </app-form-group>

    <app-form-group>
      <div class="flex justify-end">
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="props.loading.isCreateEditLoading"
          :disabled="props.loading.isCreateEditLoading"
        >
          Change Role
        </v-btn>
      </div>
    </app-form-group>
  </form>
</template>
