export interface IPermissionAction {
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

export interface IPermission {
  id: number
  name: string
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
