// Toast
import { useToast } from 'vue-toastification'

export const $api = <T extends unknown>(
  ...options: Parameters<typeof $fetch>
) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.BASE_URL
  const toast = useToast()
  const authStore = useAuthStore()
  const router = useRouter()

  return $fetch<T>(options[0], {
    baseURL,
    ...options[1],
    headers: {
      Authorization: `Bearer ${authStore.token}`,
      'X-Auth-Refresh-Token': authStore.refreshToken
    },
    onResponseError: async context => {
      console.error('### RESPONSE ERROR', context)
      console.log('### OPTIONS', options)

      if (window) {
        toast.error(context?.error || context.response._data?.message)
      }

      // Check if user got 401 (token expired / invalid signature / etc)
      let retry = true
      if (context.response.status === 401 && retry) {
        try {
          // Refresh the token
          await authStore.refresh()

          // Re-fetch the detail of user
          await authStore.me()

          // Make request again to endpoint that got 401
          await $api(context.request)
        } catch (_) {
          // If refresh fail, just logout
          await authStore.logout()

          // Redirect to login again
          router.replace({ name: 'auth-login' })
        } finally {
          // Make retry to refresh to false
          retry = false
        }
      }
    },
    onRequestError: context => {
      console.error('### REQUEST ERROR', context)
    }
  })
}
