<script setup lang="ts">
// Interfaces
import { IAuthFormLogin } from '~/utils/interfaces/auth/auth'
import { ICommonLoading } from '~~/utils/interfaces'

// Vee Validate
import { useForm } from 'vee-validate'

// Yup
import { object, string } from 'yup'

// Constants
import { AUTH_FORM_LOGIN_INITIAL } from '~~/utils/constants/auth/auth'

// Props
const props = defineProps<{
  loading: ICommonLoading
}>()

// Emits
const emit = defineEmits<{ (e: 'submit', value: IAuthFormLogin): void }>()

// Form
const validationSchema = object({
  email: string().required().email().label('Email'),
  password: string().required().label('Password')
})
const { handleSubmit } = useForm<IAuthFormLogin>({
  validationSchema,
  initialValues: AUTH_FORM_LOGIN_INITIAL
})

/**
 * @description Submit form handler
 *
 * @param {IAuthFormLogin} form
 *
 * @return {void} void
 */
const onSubmit = handleSubmit((form): void => {
  emit('submit', form)
})
</script>

<template>
  <form @submit="onSubmit">
    <!-- Email -->
    <app-form-group>
      <v-input label="Email" name="email" type="email" />
    </app-form-group>

    <!-- Password -->
    <app-form-group>
      <v-input label="Password" name="password" type="password" />
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
          Login
        </v-btn>
      </div>
    </app-form-group>
  </form>
</template>
