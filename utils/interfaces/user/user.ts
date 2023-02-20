// Interfaces
import { IRole, IRoleWithPermission } from '~~/utils/interfaces/role/role'

// GITS UI
import { VMultiSelectItem } from '@gits-id/multi-select/src/types'

export interface IUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface IUserWithRole extends IUser {
  roles: IRole[]
}

export interface IUserAuthenticated extends IUser {
  roles: IRoleWithPermission[]
}

export interface IUserForm {
  name: string
  email: string
  roles: VMultiSelectItem[]

  // For front-end only
  id?: number
}
