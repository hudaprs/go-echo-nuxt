// Interfaces
import { IPermissionWithAction } from '~~/utils/interfaces/permission/permission'

export interface IRole {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface IRoleDropdown extends Omit<IRole, 'createdAt' | 'updatedAt'> {}

export interface IRoleWithPermission extends IRole {
  isActive: boolean
  permissions: IPermissionWithAction[]
}

export interface IRoleForm {
  name: string

  // For front-end only
  id?: number
}
