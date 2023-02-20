export interface IPermissionAction {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

export enum IPermissionActionString {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface IPermission {
  id: number
  code: string
  createdAt: string
  updatedAt: string
}

export interface IPermissionWithAction extends IPermission {
  actions: IPermissionAction
}

export interface IPermissionForm {
  id: number
  actions: IPermissionAction
}

export interface IPermissionAssignForm {
  permissions: IPermissionForm[]
}
