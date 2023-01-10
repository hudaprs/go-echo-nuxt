// Interfaces
import { ICommonLoading } from '~~/utils/interfaces'

/**
 * @description Map loading
 *
 * @param {ICommonLoading} loading
 * @param {keyof ICommonLoading} type
 * @param {boolean} value
 *
 * @return {ICommonLoading} return full loading object
 */
export const commonLoadingMap = (
  loading: ICommonLoading,
  type: keyof ICommonLoading,
  value: boolean
): ICommonLoading => {
  return { ...loading, [type]: value }
}
