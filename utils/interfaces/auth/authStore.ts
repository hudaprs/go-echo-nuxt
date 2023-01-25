// Interfaces
import { ICommonLoading } from '~/utils/interfaces/common/common'
import { IAuthUser } from './auth'

export interface IAuthStoreState {
  loading: ICommonLoading
  token: string
  refreshToken: string
  user: IAuthUser | null
}
