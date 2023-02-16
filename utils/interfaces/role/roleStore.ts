// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { IRoleWithPermission } from './role'
import { IRoleResponseList } from './roleResponse'

export interface IRoleStoreState {
  loading: ICommonLoading
  list: IRoleResponseList['result']
  detail: IRoleWithPermission | null
}
