// Base
import { $api } from './base'

// Interfaces
import {} from '~~/utils/interfaces/todo/todoResponse'
import {} from '~~/utils/interfaces/todo/todoAttrs'

export const ENDPOINT = {
  INDEX: '/v1/todos/register',
  CREATE: '/v1/todos/login',
  SHOW: '/v1/todos/me',
  UPDATE: '/v1/todos/refresh',
  DELETE: '/v1/todos/logout'
}

/**
 * @description Register an user
 *
 * @param {ITodoAttrsRegister} form
 *
 * @return {Promise<ITodoResponseUser>} Promise<ITodoResponseUser>
 */
export const register = (
  form: ITodoAttrsRegister
): Promise<ITodoResponseUser> =>
  $api<ITodoResponseUser>(ENDPOINT.REGISTER, {
    method: 'post',
    body: form
  })
