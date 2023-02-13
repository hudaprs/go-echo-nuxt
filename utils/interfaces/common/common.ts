export interface ICommonLoading {
  isDefaultLoading: boolean
  isCreateEditLoading: boolean
  isDeleteLoading: boolean
  isDetailLoading: boolean
}

export interface ICommonPagination<T extends unknown[]> {
  limit: number
  page: number
  sort: string
  totalRows: number
  totalPages: number
  rows: T
}

export interface ICommonPaginationQuery {
  limit: number
  page: number
  sort: string
}

export type TCommonPagination = 'limit' | 'page' | 'sort'
