// Interfaces
import { IAuthFormLogin, IAuthFormRegister } from './auth'

export interface IAuthAttrsLogin {
  body: IAuthFormLogin
}

export interface IAuthAttrsRegister {
  body: IAuthFormRegister
}

export interface IAuthAttrsActivateRole {
  params: { roleId: number }
}
