// i18n
import { createI18n } from 'vue-i18n'

// Locales
import en from '~~/locales/en.json'
import id from '~~/locales/id.json'

export default defineNuxtPlugin(nuxtApp => {
  const commonStore = useCommonStore()

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: commonStore.locale || 'en',
    messages: {
      en,
      id
    },
    inheritLocale: true
  })

  nuxtApp.vueApp.use(i18n)

  return {
    provide: {
      i18n
    }
  }
})
