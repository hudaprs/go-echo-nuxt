// Interfaces
import {
  IPermissionAction,
  IPermissionAssignForm,
  IPermissionWithAction
} from './permission'

export interface IPermissionAttrsAssign {
  params: { roleId: number }
  body: IPermissionAssignForm
}

export interface IPermissionAttrsActionsChange {
  permission: IPermissionWithAction
  actionKey: keyof IPermissionAction
  value: boolean
}
