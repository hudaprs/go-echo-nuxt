// Interfaces
import { IResponse } from '~~/utils/interfaces//api/api'
import { IAuthToken, IAuthUser } from './auth'

export type IAuthResponseUser = IResponse<IAuthUser>
export type IAuthResponseToken = IResponse<IAuthToken>
