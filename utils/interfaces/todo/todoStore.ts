// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { ITodo } from './todo'

export interface ITodoStoreState {
  loading: ICommonLoading
  list: ITodo[]
  detail: ITodo | null
}
