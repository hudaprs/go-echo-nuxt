// Base
import { $api } from './base'

// Interfaces
import {
  ITodoResponseList,
  ITodoResponseDetail
} from '~~/utils/interfaces/todo/todoResponse'
import {
  ITodoAttrsStore,
  ITodoAttrsShow,
  ITodoAttrsUpdate,
  ITodoAttrsDestroy,
  ITodoAttrsIndex
} from '~~/utils/interfaces/todo/todoAttrs'

/**
 * @description Get list of todo
 *
 * @param {ITodoAttrsIndex} payload
 *
 * @return {Promise<ITodoResponseList>} Promise<ITodoResponseList>
 */
export const index = (payload: ITodoAttrsIndex): Promise<ITodoResponseList> =>
  $api('/v1/todos', { params: payload.params })

/**
 * @description Create todo
 *
 * @param {ITodoAttrsStore} payload
 *
 * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
 */
export const store = (payload: ITodoAttrsStore): Promise<ITodoResponseDetail> =>
  $api('/v1/todos', { method: 'POST', body: payload.body })

/**
 * @description Get detail of todo
 *
 * @param {ITodoAttrsShow} payload
 *
 * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
 */
export const show = (payload: ITodoAttrsShow): Promise<ITodoResponseDetail> =>
  $api(`/v1/todos/${payload.params.id}`)

/**
 * @description Update todo
 *
 * @param {ITodoAttrsUpdate} payload
 *
 * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
 */
export const update = (
  payload: ITodoAttrsUpdate
): Promise<ITodoResponseDetail> =>
  $api(`/v1/todos/${payload.params.id}`, {
    method: 'PATCH',
    body: payload.body
  })

/**
 * @description Delete todo
 *
 * @param {ITodoAttrsDestroy} payload
 *
 * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
 */
export const destroy = (
  payload: ITodoAttrsDestroy
): Promise<ITodoResponseDetail> =>
  $api(`/v1/todos/${payload.params.id}`, { method: 'DELETE' })
