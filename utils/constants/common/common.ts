// Interfaces
import { ICommonLoading } from '~/utils/interfaces'
import { ICommonPagination } from '~~/utils/interfaces/common/common'
import { ICommonStoreState } from '~~/utils/interfaces/common/commonStore'

export const COMMON_LOADING: ICommonLoading = {
  isDefaultLoading: false,
  isCreateEditLoading: false,
  isDeleteLoading: false,
  isDetailLoading: false
}

export const COMMON_STATE_INITIAL: ICommonStoreState = {
  modalRefetchOptions: {
    isOpen: false,
    message: ''
  }
}

export const COMMON_PAGINATION: ICommonPagination<unknown[]> = {
  limit: 10,
  page: 1,
  sort: 'created_at desc',
  totalRows: 0,
  totalPages: 0,
  rows: []
}
