// Base
import { $api } from './base'

// Interfaces
import {
  IAuthResponseToken,
  IAuthResponseUser
} from '~~/utils/interfaces/auth/authResponse'
import {
  IAuthAttrsLogin,
  IAuthAttrsRegister
} from '~~/utils/interfaces/auth/authAttrs'

/**
 * @description Register an user
 *
 * @param {IAuthAttrsRegister} form
 *
 * @return {Promise<IAuthResponseUser>} Promise<IAuthResponseUser>
 */
export const register = (
  form: IAuthAttrsRegister
): Promise<IAuthResponseUser> =>
  $api<IAuthResponseUser>('/v1/auth/register', {
    method: 'post',
    body: form
  })

/**
 * @description Login an user
 *
 * @param {IAuthAttrsLogin} form
 *
 * @return {Promise<IAuthResponseToken>} Promise<IAuthResponseToken>
 */
export const login = (form: IAuthAttrsLogin): Promise<IAuthResponseToken> =>
  $api<IAuthResponseToken>('/v1/auth/login', {
    method: 'post',
    body: form
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
