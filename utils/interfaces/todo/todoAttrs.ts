export interface ITodoAttrsCreate {
  body: { title: string; completed: boolean }
}

export interface ITodoAttrsShow {
  params: { id: number }
}

export interface ITodoAttrsUpdate {
  params: { id: number }
  body: { title: string; completed: boolean }
}

export interface ITodoAttrsDelete {
  params: { id: number }
}
