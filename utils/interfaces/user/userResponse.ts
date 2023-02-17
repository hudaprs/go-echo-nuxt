// Interfaces
import { IResponse, IResponsePagination } from '~~/utils/interfaces//api/api'
import { IUser, IUserWithRole } from './user'

export type IUserResponseList = IResponsePagination<IUser[]>
export type IUserResponseDetail = IResponse<IUser>
export type IUserResponseDetailWithRole = IResponse<IUserWithRole>
