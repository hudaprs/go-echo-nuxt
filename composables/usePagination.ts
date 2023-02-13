// Interfaces
import { ICommonPaginationQuery } from '~~/utils/interfaces/common/common'

const PAGINATION: ICommonPaginationQuery = {
  limit: 10,
  page: 1,
  sort: 'created_at desc'
}

export const usePagination = () => {
  // Common State
  let paginationOptions = reactive(PAGINATION)

  /**
   * @description Watch any change in pagination
   *
   * @param {string} type
   * @param {string|number|null} value
   * @param {function} callback
   */
  const onChangePagination = (
    type: 'limit' | 'page' | 'sort' | 'reset',
    value: string | number | null,
    callback: (payload: ICommonPaginationQuery) => void
  ): void => {
    if (type !== 'page') {
      paginationOptions.page = 1
    }

    if (type === 'reset') {
      paginationOptions = PAGINATION
    }

    if (type !== 'reset' && value) {
      paginationOptions = { ...paginationOptions, [type]: value }
    }

    callback(paginationOptions)
  }

  return { paginationOptions, onChangePagination }
}
