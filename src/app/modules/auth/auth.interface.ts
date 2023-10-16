export type ILoginUser = {
  id: string
  password: string
}
export type ILoginUserResponse = {
  accessToken: string
  refreshToken?: string
  needsPasswordChange: boolean
}
export type IReFreshTokenResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
