// Interfaces
import { ICommonLoading } from '~/utils/interfaces'
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
