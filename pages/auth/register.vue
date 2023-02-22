<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Interfaces
import { IAuthFormRegister } from '~~/utils/interfaces/auth/auth'

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

/**
 * @description Submit form
 *
 * @param {IAuthAttrsRegister} form
 *
 * @return {Promise<void>} Promise<void>
 */
const onSubmit = async (form: IAuthFormRegister): Promise<void> => {
  try {
    const response = await register({ body: form })

    toast.success(response.message)

    router.push('/auth/login')
  } catch (_) {
    //
  }
}
</script>

<template>
  <div class="h-screen w-screen justify-center items-center flex flex-col">
    <v-card style="width: 450px" bordered>
      <template #header>
        <auth-form-card-header title="Register Form" />
      </template>

      <auth-form-register :loading="loading" @submit="onSubmit" />

      <!-- Footer -->
      <template #footer>
        Have an account?
        <nuxt-link to="/auth/login" class="text-blue-400">Login here</nuxt-link>
      </template>
    </v-card>
  </div>
</template>
