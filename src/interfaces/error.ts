export type IGenericErrorMessage = {
  path: string | number
  message: string
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
