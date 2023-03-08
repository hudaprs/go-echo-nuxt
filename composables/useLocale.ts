// i18n
import { useI18n } from 'vue-i18n'

// Interfaces
import { TCommonLang } from '~~/utils/interfaces/common/common'

export const useLocale = () => {
  const { t } = useI18n()
  const commonStore = useCommonStore()

  /**
   * @description Change lang
   *
   * @param {TCommonLang} lang
   *
   * @return {void} void
   */
  const onChangeLang = (lang: TCommonLang): void => {
    commonStore.SET_LOCALE(lang)

    window.location.reload()
  }

  return { t, onChangeLang }
}
