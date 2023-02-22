// Interfaces
import { IAuthStoreState } from '~~/utils/interfaces/auth/authStore'
import {
  IAuthFormLogin,
  IAuthFormRegister
} from '~~/utils/interfaces/auth/auth'

// Constants
import { COMMON_LOADING } from '~~/utils/constants//common/common'

export const AUTH_STATE_INITIAL: IAuthStoreState = {
  loading: COMMON_LOADING,
  token: '',
  refreshToken: '',
  user: null
}

export const AUTH_FORM_LOGIN_INITIAL: IAuthFormLogin = {
  email: '',
  password: ''
}

export const AUTH_FORM_REGISTER_INITIAL: IAuthFormRegister = {
  name: '',
  email: '',
  password: ''
}
