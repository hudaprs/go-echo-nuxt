// Interfaces
import { ICommonLoading } from '~~/utils/interfaces/common/common'

export interface ITodo {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string

  // For Front-End Only
  loading: ICommonLoading
}

export interface ITodoForm {
  title: string
  completed: boolean

  // For front-end only
  id?: number
}
