// Interfaces
import { IResponse } from '~~/utils/interfaces//api/api'
import { IRole } from '~~/utils/interfaces/role/role'
import { IAuthToken, IAuthUser } from './auth'

export type IAuthResponseUser = IResponse<IAuthUser>
export type IAuthResponseToken = IResponse<IAuthToken>
export type IAuthResponseActivateRole = IResponse<IRole>
