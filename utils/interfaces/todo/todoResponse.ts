// Interfaces
import { IResponse } from '~~/utils/interfaces//api/api'
import { ITodo } from './todo'

export type ITodoResponseList = IResponse<ITodo[]>
export type ITodoResponseDetail = IResponse<ITodo>
