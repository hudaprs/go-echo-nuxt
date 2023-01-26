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
      // Throw toast every error came out, except 401 (token expired)
      if (window && context.response._data?.status !== 401)
        toast.error(context?.error || context.response._data?.message)

      // Check if user got 401 (token expired / invalid signature / etc)
      let retry = true
      if (context.response.status === 401 && retry) {
        try {
          // Refresh the token
          await authStore.refresh()

          // Re-fetch the detail of user
          await authStore.me()
        } catch (_) {
          // If refresh fail, just logout
          await authStore.logout()

          // Redirect to login again
          router.replace({ name: 'auth-login' })

          // Throw toast if failed to refresh
          if (window)
            toast.error(context?.error || context.response._data?.message)
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
