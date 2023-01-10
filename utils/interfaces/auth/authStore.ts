// Interfaces
import { ICommonLoading } from '~/utils/interfaces/common/common'

export interface IAuthStoreState {
  loading: ICommonLoading
  token: string
}
