// Interfaces
import { ICommonPagination } from '~~/utils/interfaces/common/common'

export interface IResponse<T extends unknown> {
  message: string
  status: number
  result: T
}

export interface IResponsePagination<T extends unknown[]> {
  message: string
  status: number
  result: ICommonPagination<T>
}
