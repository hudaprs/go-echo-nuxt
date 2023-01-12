// Toast
import { useToast } from 'vue-toastification'

export const $api = <T extends unknown>(
  ...options: Parameters<typeof $fetch>
) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.BASE_URL
  const toast = useToast()

  return $fetch<T>(options[0], {
    baseURL,
    ...options[1],
    onResponseError: context => {
      console.error('### RESPONSE ERROR', context)

      toast.error(context?.error || context.response._data?.message)
    },
    onRequestError: context => {
      console.error('### REQUEST ERROR', context)
    },
    onResponse: context => {
      console.log('### RESPONSE', context)
    },
    onRequest: context => {
      console.log('### REQUEST', context)
    }
  })
}
