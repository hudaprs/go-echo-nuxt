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

/**
 * @description Map single loading of data
 *
 * @param {number} id
 * @param {unknown & { loading: ICommonLoading }} data
 * @param {keyof ICommonLoading} type
 * @param {boolean} value
 *
 * @return {unknown & { loading: ICommonLoading }} return full data with loading object
 */
export const commonLoadingDataMap = <T extends unknown>(
  id: number,
  data: (T & { id: number; loading: ICommonLoading })[],
  type: keyof ICommonLoading,
  value: boolean
): (T & { loading: ICommonLoading })[] => {
  return data.map(result => {
    if (result.id === id) {
      return { ...result, loading: { ...result.loading, [type]: value } }
    } else {
      return result
    }
  })
}
