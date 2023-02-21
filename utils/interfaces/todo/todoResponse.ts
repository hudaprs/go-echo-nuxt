// Interfaces
import { IResponse, IResponsePagination } from '~~/utils/interfaces//api/api'
import { ITodo } from './todo'

export type ITodoResponseList = IResponsePagination<ITodo[]>
export type ITodoResponseDetail = IResponse<ITodo>
