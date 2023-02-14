// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { IPermissionResponseList } from './permissionResponse'

export interface IPermissionStoreState {
  loading: ICommonLoading
  list: IPermissionResponseList['result']
}
