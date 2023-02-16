// Base
import { $api } from './base'

// Interfaces
import { IPermissionResponseList } from '~~/utils/interfaces/permission/permissionResponse'
import { IPermissionAttrsAssign } from '~~/utils/interfaces/permission/permissionAttrs'

/**
 * @description Get list of permissions
 *
 * @return {Promise<IPermissionResponseList>} Promise<IPermissionResponseList>
 */
export const index = (): Promise<IPermissionResponseList> =>
  $api('/v1/permissions')

/**
 * @description Assign permissions
 *
 * @param {IPermissionAttrsAssign} payload
 *
 * @return {Promise<IPermissionResponseList>} Promise<IPermissionResponseList>
 */
export const assign = (
  payload: IPermissionAttrsAssign
): Promise<IPermissionResponseList> =>
  $api(`/v1/permissions/assign/${payload.params.roleId}`, {
    method: 'PATCH',
    body: payload.body
  })
