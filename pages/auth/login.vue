<script setup lang="ts">
// Interfaces
import {
  IAuthFormLogin,
  IAuthFormChangeRole
} from '~/utils/interfaces/auth/auth'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Pinia
import { storeToRefs } from 'pinia'

// i18n
import { useI18n } from 'vue-i18n'

// Translator
const { t } = useI18n()

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useHead({
  title: t('menu.login')
})

// Router
const router = useRouter()

// Toast
const toast = useToast()

// Store
const authStore = useAuthStore()
const { loading, activeRole, roleList } = storeToRefs(authStore)

// Common State
const authOptions = reactive({
  formState: { isLoggedIn: false }
})

/**
 * @description Submit form
 *
 * @param {IAuthFormLogin} form
 *
 * @return {Promise<void>} Promise<void>
 */
const onSubmitLogin = async (form: IAuthFormLogin): Promise<void> => {
  try {
    // Log user in
    const response = await authStore.login({ body: form })

    // Load current user
    await authStore.me()

    toast.success(response.message)

    authOptions.formState.isLoggedIn = true
  } catch (_) {
    //
  }
}

/**
 * @description Choose role
 *
 * @param {IAuthFormChangeRole} form
 *
 * @return {Promise<void>} Promise<void>
 */
const onChangeRole = async (form: IAuthFormChangeRole): Promise<void> => {
  try {
    // Change current active role to new one
    const response = await authStore.activateRole({
      params: { roleId: form.role.value }
    })

    // Load current user
    await authStore.me()

    toast.success(response.message)

    router.replace({ name: 'index' })
  } catch (_) {
    //
  }
}
</script>

<template>
  <div class="h-screen w-screen justify-center items-center flex flex-col">
    <v-card style="width: 450px" bordered>
      <!-- Header -->
      <template #header>
        <auth-form-card-header :title="$t('auth.login.section.loginForm')" />
      </template>

      <!-- Form Login -->
      <auth-form-login
        :loading="loading"
        @submit="onSubmitLogin"
        v-if="!authOptions.formState.isLoggedIn"
      />

      <!-- Form Change Role -->
      <auth-form-change-role
        :loading="loading"
        :role-list="roleList"
        :previous-active-role="activeRole"
        @submit="onChangeRole"
        v-if="authOptions.formState.isLoggedIn"
      />

      <!-- Footer -->
      <template #footer>
        {{ $t('general.doesNotHaveAccount') }}
        <nuxt-link to="/auth/register" class="text-blue-400">
          {{ $t('general.registerHere') }}
        </nuxt-link>
      </template>
    </v-card>
  </div>
</template>
