// Interfaces
import { IPermission } from '~~/utils/interfaces/permission/permission'

export interface IRole {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface IRoleWithPermissions extends IRole {
  permissions: IPermission[]
}

export interface IRoleForm {
  name: string

  // For front-end only
  id?: number
}
