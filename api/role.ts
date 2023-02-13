// Base
import { $api } from './base'

// Interfaces
import {
  IRoleResponseList,
  IRoleResponseDetail,
  IRoleResponseDetailWithPermission
} from '~~/utils/interfaces/role/roleResponse'
import {
  IRoleAttrsStore,
  IRoleAttrsShow,
  IRoleAttrsUpdate,
  IRoleAttrsDestroy,
  IRoleAttrsIndex
} from '~~/utils/interfaces/role/roleAttrs'

/**
 * @description Get list of roles
 *
 * @param {IRoleAttrsIndex} payload
 *
 * @return {Promise<IRoleResponseList>} Promise<IRoleResponseList>
 */
export const index = (payload: IRoleAttrsIndex): Promise<IRoleResponseList> =>
  $api('/v1/roles', { params: payload.params })

/**
 * @description Create role
 *
 * @param {IRoleAttrsStore} payload
 *
 * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
 */
export const store = (payload: IRoleAttrsStore): Promise<IRoleResponseDetail> =>
  $api('/v1/roles', { method: 'POST', body: payload.body })

/**
 * @description Get detail of role
 *
 * @param {IRoleAttrsShow} payload
 *
 * @return {Promise<IRoleResponseDetailWithPermission>} Promise<IRoleResponseDetailWithPermission>
 */
export const show = (
  payload: IRoleAttrsShow
): Promise<IRoleResponseDetailWithPermission> =>
  $api(`/v1/roles/${payload.params.id}`)

/**
 * @description Update role
 *
 * @param {IRoleAttrsUpdate} payload
 *
 * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
 */
export const update = (
  payload: IRoleAttrsUpdate
): Promise<IRoleResponseDetail> =>
  $api(`/v1/roles/${payload.params.id}`, {
    method: 'PATCH',
    body: payload.body
  })

/**
 * @description Delete role
 *
 * @param {IRoleAttrsDestroy} payload
 *
 * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
 */
export const destroy = (
  payload: IRoleAttrsDestroy
): Promise<IRoleResponseDetail> =>
  $api(`/v1/roles/${payload.params.id}`, { method: 'DELETE' })
