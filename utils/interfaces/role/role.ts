// Interfaces
import { IPermissionWithAction } from '~~/utils/interfaces/permission/permission'

export interface IRole {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface IRoleWithPermission extends IRole {
  permissions: IPermissionWithAction[]
}

export interface IRoleForm {
  name: string

  // For front-end only
  id?: number
}
