import { IResponse } from '../api/api'

export type IAuthRegisterResponse = IResponse<{
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}>

export type IAuthLoginResponse = IResponse<{
  token: string
}>
