export const $api = <T = unknown>(...options: Parameters<typeof $fetch>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.BASE_URL

  return $fetch<T>(options[0], {
    baseURL,
    ...options[1],
    onResponseError: context => {
      console.log('### RESPONSE ERROR', context)
    },
    onRequestError: context => {
      console.log('### REQUEST ERROR', context)
    },
    onResponse: context => {
      console.log('### RESPONSE', context)
    },
    onRequest: context => {
      console.log('### REQUEST', context)
    }
  })
}
