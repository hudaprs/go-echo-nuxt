// Interfaces
import { IResponse } from '~~/utils/interfaces//api/api'
import { IPermissionWithAction } from './permission'

export type IPermissionResponseList = IResponse<IPermissionWithAction[]>
