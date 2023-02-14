export interface IPermission {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface IPermissionForm {
  id: number
  action: {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
  }
}

export interface IPermissionAssignForm {
  permissions: IPermissionForm[]
}
