// Interfaces
import { ICommonPaginationQuery } from '~~/utils/interfaces/common/common'

export interface IRoleAttrsIndex {
  params: ICommonPaginationQuery
}

export interface IRoleAttrsStore {
  body: { name: string }
}

export interface IRoleAttrsShow {
  params: { id: number }
}

export interface IRoleAttrsUpdate {
  params: { id: number }
  body: { name: string }
}

export interface IRoleAttrsDestroy {
  params: { id: number }
}
