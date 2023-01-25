export interface IAuthUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface IAuthToken {
  token: string
  refreshToken: string
}
