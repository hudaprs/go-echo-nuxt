// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'
import { ITodo } from './todo'
import { ITodoResponseList } from './todoResponse'

export interface ITodoStoreState {
  loading: ICommonLoading
  list: ITodoResponseList['result']
  detail: ITodo | null
}
