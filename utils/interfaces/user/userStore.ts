// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { IRoleResponseDropdown } from '~~/utils/interfaces/role/roleResponse'
import { IUserWithRole } from './user'
import { IUserResponseList } from './userResponse'

export interface IUserStoreState {
  loading: ICommonLoading
  list: IUserResponseList['result']
  detail: IUserWithRole | null
  dropdown: {
    role: {
      loading: ICommonLoading
      list: IRoleResponseDropdown['result']
    }
  }
}
