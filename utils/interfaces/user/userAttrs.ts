// Interfaces
import { ICommonPaginationQuery } from '~~/utils/interfaces/common/common'
import { IUserForm } from './user'

export interface IUserAttrsIndex {
  params: ICommonPaginationQuery
}

export interface IUserAttrsStore {
  body: IUserForm
}

export interface IUserAttrsShow {
  params: { id: number }
}

export interface IUserAttrsUpdate {
  params: { id: number }
  body: IUserForm
}

export interface IUserAttrsDestroy {
  params: { id: number }
}
