// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { IRole } from './role'
import { IRoleResponseList } from './roleResponse'

export interface IRoleStoreState {
  loading: ICommonLoading
  list: IRoleResponseList['result']
  detail: IRole | null
}
