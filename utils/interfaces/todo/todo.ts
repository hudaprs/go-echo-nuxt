export interface ITodo {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface ITodoForm {
  title: string
  completed: boolean

  // For front-end only
  id?: number
}
