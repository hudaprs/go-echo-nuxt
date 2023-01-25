// Interfaces
import { IAuthStoreState } from '~~/utils/interfaces/auth/authStore'

// Constants
import { COMMON_LOADING } from '~~/utils/constants//common/common'

export const AUTH_STATE_INITIAL: IAuthStoreState = {
  loading: COMMON_LOADING,
  token: '',
  refreshToken: '',
  user: null
}
