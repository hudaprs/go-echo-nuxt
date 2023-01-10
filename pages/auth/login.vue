<script setup lang="ts">
// Yup
import { object, string } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
import { IAuthLoginForm } from '~/utils/interfaces/auth/auth'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Pinia
import { storeToRefs } from 'pinia'

// Toast
const toast = useToast()

// Store
const { login } = useAuthStore()
const { loading } = storeToRefs(useAuthStore())

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Login'
})

// Form
const validationSchema = object({
  email: string().required().email().label('Email'),
  password: string().required().label('Password')
})
const { handleSubmit } = useForm<IAuthLoginForm>({
  validationSchema
})

/**
 * @description Submit form
 *
 * @param {IAuthLoginForm} form
 *
 * @return {Promise<void>} Promise<void>
 */
const onSubmit = handleSubmit(async (form): Promise<void> => {
  try {
    const response = await login(form)

    toast.success(response.message)
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message)
    }
  }
})
</script>

<template>
  <div class="h-screen w-screen justify-center items-center flex flex-col">
    <v-card style="width: 450px" title="Login Form" bordered>
      <form @submit="onSubmit">
        <!-- Email -->
        <v-form-group label="Email">
          <v-input name="email" type="email" />
        </v-form-group>

        <!-- Password -->
        <v-form-group label="Password">
          <v-input name="password" type="password" />
        </v-form-group>

        <v-form-group>
          <div class="flex justify-end">
            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading.isDefaultLoading"
              :disabled="loading.isDefaultLoading"
            >
              Login
            </v-btn>
          </div>
        </v-form-group>
      </form>

      <!-- Footer -->
      <template #footer>
        Doesn't have an account?
        <nuxt-link to="/auth/register" class="text-blue-400"
          >Register here</nuxt-link
        >
      </template>
    </v-card>
  </div>
</template>
