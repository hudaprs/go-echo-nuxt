// Interfaces
import { ICommonPaginationQuery } from '~~/utils/interfaces/common/common'

export interface ITodoAttrsIndex {
  params: ICommonPaginationQuery
}

export interface ITodoAttrsStore {
  body: { title: string; completed: boolean }
}

export interface ITodoAttrsShow {
  params: { id: number }
}

export interface ITodoAttrsUpdate {
  params: { id: number }
  body: { title: string; completed: boolean }
}

export interface ITodoAttrsDestroy {
  params: { id: number }
}
