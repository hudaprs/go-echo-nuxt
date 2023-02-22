// Interfaces
import { IUserAuthenticated } from '~~/utils/interfaces/user/user'

export interface IAuthUser extends IUserAuthenticated {}

export interface IAuthToken {
  token: string
  refreshToken: string
}

export interface IAuthFormLogin {
  email: string
  password: string
}

export interface IAuthFormRegister {
  name: string
  email: string
  password: string
}

export interface IAuthFormChangeRole {
  role: { text: string; value: number }
}
