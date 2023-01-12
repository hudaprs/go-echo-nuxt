export interface IResponse<T extends unknown> {
  message: string
  status: number
  result: T
}
