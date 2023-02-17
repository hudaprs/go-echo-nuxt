// Base
import { $api } from './base'

// Interfaces
import {
  IUserResponseList,
  IUserResponseDetailWithRole
} from '~~/utils/interfaces/user/userResponse'
import {
  IUserAttrsIndex,
  IUserAttrsStore,
  IUserAttrsShow,
  IUserAttrsUpdate,
  IUserAttrsDestroy
} from '~~/utils/interfaces/user/userAttrs'
import { IRoleResponseDropdown } from '~~/utils/interfaces/role/roleResponse'

/**
 * @description Get list of users
 *
 * @param {IUserAttrsIndex} payload
 *
 * @return {Promise<IUserResponseList>} Promise<IUserResponseList>
 */
export const index = (payload: IUserAttrsIndex): Promise<IUserResponseList> =>
  $api('/v1/users', { params: payload.params })

/**
 * @description Create user
 *
 * @param {IUserAttrsStore} payload
 *
 * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
 */
export const store = (
  payload: IUserAttrsStore
): Promise<IUserResponseDetailWithRole> =>
  $api('/v1/users', {
    method: 'POST',
    body: { ...payload.body, roles: payload.body.roles.map(role => role.value) }
  })

/**
 * @description Get detail of user
 *
 * @param {IUserAttrsShow} payload
 *
 * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
 */
export const show = (
  payload: IUserAttrsShow
): Promise<IUserResponseDetailWithRole> =>
  $api(`/v1/users/${payload.params.id}`)

/**
 * @description Update user
 *
 * @param {IUserAttrsUpdate} payload
 *
 * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
 */
export const update = (
  payload: IUserAttrsUpdate
): Promise<IUserResponseDetailWithRole> =>
  $api(`/v1/users/${payload.params.id}`, {
    method: 'PATCH',
    body: { ...payload.body, roles: payload.body.roles.map(role => role.value) }
  })

/**
 * @description Delete user
 *
 * @param {IUserAttrsDestroy} payload
 *
 * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
 */
export const destroy = (
  payload: IUserAttrsDestroy
): Promise<IUserResponseDetailWithRole> =>
  $api(`/v1/users/${payload.params.id}`, {
    method: 'DELETE'
  })

export const role = {
  /**
   * @description Role sections
   *
   * @return {Promise<IRoleResponseDropdown>} Promise<IRoleResponseDropdown>
   */
  index: async (): Promise<IRoleResponseDropdown> => $api('/v1/users/roles')
}
