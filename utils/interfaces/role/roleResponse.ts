// Interfaces
import { IResponse, IResponsePagination } from '~~/utils/interfaces//api/api'
import { IRole, IRoleWithPermission, IRoleDropdown } from './role'

export type IRoleResponseList = IResponsePagination<IRole[]>
export type IRoleResponseDetail = IResponse<IRole>
export type IRoleResponseDropdown = IResponse<IRoleDropdown[]>
export type IRoleResponseDetailWithPermission = IResponse<IRoleWithPermission>
