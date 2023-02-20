// Interfaces
import { IUserAuthenticated } from '~~/utils/interfaces/user/user'

export interface IAuthUser extends IUserAuthenticated {}

export interface IAuthToken {
  token: string
  refreshToken: string
}
