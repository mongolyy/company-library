export type CustomError = {
  errorCode: string
  message: string
}

export const isCustomError = (arg: object | undefined): arg is CustomError => {
  return arg != null && 'errorCode' in arg && 'message' in arg
}
