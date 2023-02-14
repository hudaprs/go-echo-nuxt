// Interfaces
import { IPermissionAssignForm } from './permission'

export interface IPermissionAttrsAssign {
  params: { roleId: number }
  body: IPermissionAssignForm
}
