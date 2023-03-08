<script setup lang="ts">
// Interfaces
import { IAuthFormChangeRole } from '~/utils/interfaces/auth/auth'
import { ICommonLoading } from '~~/utils/interfaces'
import { IRoleWithPermission } from '~~/utils/interfaces/role/role'

// Vee Validate
import { useForm } from 'vee-validate'

// Yup
import { object } from 'yup'

// i18n
import { useI18n } from 'vue-i18n'

// Translator
const { t } = useI18n()

// Props
const props = defineProps<{
  loading: ICommonLoading
  roleList: { text: string; value: any }[]
  previousActiveRole: IRoleWithPermission | null
  fromOtherMenu?: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'submit', value: IAuthFormChangeRole): void
  (e: 'change', value: number): void
}>()

// Form
const validationSchema = object({
  role: object().required().label(t('auth.form.role'))
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
    {{
      $t('changeRole.previousActiveRole', {
        roleName: props.previousActiveRole.name
      })
    }}
  </v-alert>

  <form @submit="onSubmit">
    <!-- Role -->
    <app-form-group>
      <v-autocomplete
        :name="props.fromOtherMenu ? undefined : 'role'"
        :label="$t('auth.form.role')"
        :items="props.roleList"
        @update:model-value="emit('change', $event.value)"
      />
    </app-form-group>

    <app-form-group v-if="!props.fromOtherMenu">
      <div class="flex justify-end">
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="props.loading.isCreateEditLoading"
          :disabled="props.loading.isCreateEditLoading"
        >
          {{ $t('changeRole.changeRole') }}
        </v-btn>
      </div>
    </app-form-group>
  </form>
</template>
