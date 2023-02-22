// Base
import { $api } from './base'

// Interfaces
import {
  IAuthResponseActivateRole,
  IAuthResponseToken,
  IAuthResponseUser
} from '~~/utils/interfaces/auth/authResponse'
import {
  IAuthAttrsActivateRole,
  IAuthAttrsLogin,
  IAuthAttrsRegister
} from '~~/utils/interfaces/auth/authAttrs'

/**
 * @description Register an user
 *
 * @param {IAuthAttrsRegister} payload
 *
 * @return {Promise<IAuthResponseUser>} Promise<IAuthResponseUser>
 */
export const register = (
  payload: IAuthAttrsRegister
): Promise<IAuthResponseUser> =>
  $api<IAuthResponseUser>('/v1/auth/register', {
    method: 'post',
    body: payload.body
  })

/**
 * @description Login an user
 *
 * @param {IAuthAttrsLogin} payload
 *
 * @return {Promise<IAuthResponseToken>} Promise<IAuthResponseToken>
 */
export const login = (payload: IAuthAttrsLogin): Promise<IAuthResponseToken> =>
  $api<IAuthResponseToken>('/v1/auth/login', {
    method: 'post',
    body: payload.body
  })

/**
 * @description Get authenticated user
 *
 * @return {Promise<IAuthResponseUser>} Promise<IAuthResponseUser>
 */
export const me = (): Promise<IAuthResponseUser> =>
  $api<IAuthResponseUser>('/v1/auth/me')

/**
 * @description Refresh token of user
 *
 * @return {Promise<IAuthResponseToken>} Promise<IAuthResponseToken>
 */
export const refresh = (): Promise<IAuthResponseToken> =>
  $api<IAuthResponseToken>('/v1/auth/refresh')

/**
 * @description Log user out
 *
 * @return {Promise<void>} Promise<void>
 */
export const logout = (): Promise<void> => $api<void>('/v1/auth/logout')

/**
 * @description Activate user role
 *
 * @param {IAuthAttrsActivateRole} payload
 *
 * @return {Promise<IAuthResponseActivateRole>} Promise<IAuthResponseActivateRole>
 */
export const activateRole = (
  payload: IAuthAttrsActivateRole
): Promise<IAuthResponseActivateRole> =>
  $api<IAuthResponseActivateRole>(
    `/v1/auth/roles/activate/${payload.params.roleId}`,
    { method: 'PATCH' }
  )
