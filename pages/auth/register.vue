<script setup lang="ts">
// Yup
import { object, string } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
import { IAuthRegisterForm } from '~/utils/interfaces/auth/auth'

// Pinia
import { storeToRefs } from 'pinia'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Toast
const toast = useToast()

// Store
const { register } = useAuthStore()
const { loading } = storeToRefs(useAuthStore())

// Router
const router = useRouter()

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useHead({
  title: 'Register'
})

// Form
const validationSchema = object({
  name: string().required().label('Name'),
  email: string().required().email().label('Email'),
  password: string().required().label('Password')
})
const { handleSubmit } = useForm<IAuthRegisterForm>({
  validationSchema
})

/**
 * @description Submit form
 *
 * @param {IAuthRegisterForm} form
 *
 * @return {Promise<void>} Promise<void>
 */
const onSubmit = handleSubmit(async (form): Promise<void> => {
  try {
    const response = await register(form)

    toast.success(response.message)

    router.push('/auth/login')
  } catch (_) {
    //
  }
})
</script>

<template>
  <div class="h-screen w-screen justify-center items-center flex flex-col">
    <v-card style="width: 450px" bordered>
      <template #header>
        <auth-form-card-header title="Register Form" />
      </template>

      <form @submit="onSubmit">
        <!-- Email -->
        <v-form-group label="Name">
          <v-input name="name" />
        </v-form-group>

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
              :disabled="loading.isDefaultLoading"
              :loading="loading.isDefaultLoading"
            >
              Register
            </v-btn>
          </div>
        </v-form-group>
      </form>

      <!-- Footer -->
      <template #footer>
        Have an account?
        <nuxt-link to="/auth/login" class="text-blue-400">Login here</nuxt-link>
      </template>
    </v-card>
  </div>
</template>
