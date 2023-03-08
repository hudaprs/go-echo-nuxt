<script setup lang="ts">
// Interfaces
import { IAuthFormRegister } from '~/utils/interfaces/auth/auth'
import { ICommonLoading } from '~~/utils/interfaces'

// Vee Validate
import { useForm } from 'vee-validate'

// Yup
import { object, string } from 'yup'

// Constants
import { AUTH_FORM_REGISTER_INITIAL } from '~~/utils/constants/auth/auth'

// i18n
import { useI18n } from 'vue-i18n'

// Translator
const { t } = useI18n()

// Props
const props = defineProps<{
  loading: ICommonLoading
}>()

// Emits
const emit = defineEmits<{ (e: 'submit', value: IAuthFormRegister): void }>()

// Form
const validationSchema = object({
  name: string().required().label(t('auth.form.name')),
  email: string().required().email().label(t('auth.form.email')),
  password: string().required().label(t('auth.form.password'))
})
const { handleSubmit } = useForm<IAuthFormRegister>({
  validationSchema,
  initialValues: AUTH_FORM_REGISTER_INITIAL
})

/**
 * @description Submit form handler
 *
 * @param {IAuthFormRegister} form
 *
 * @return {void} void
 */
const onSubmit = handleSubmit((form): void => {
  emit('submit', form)
})
</script>

<template>
  <form @submit="onSubmit">
    <!-- Name -->
    <app-form-group>
      <v-input :label="$t('auth.form.name')" name="name" />
    </app-form-group>

    <!-- Email -->
    <app-form-group>
      <v-input :label="$t('auth.form.email')" name="email" type="email" />
    </app-form-group>

    <!-- Password -->
    <app-form-group>
      <v-input
        :label="$t('auth.form.password')"
        name="password"
        type="password"
      />
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
          {{ $t('menu.register') }}
        </v-btn>
      </div>
    </app-form-group>
  </form>
</template>
