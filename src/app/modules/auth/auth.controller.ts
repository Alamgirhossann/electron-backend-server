import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { ILoginUserResponse, IReFreshTokenResponse } from './auth.interface'
import config from '../../../config'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)

  const { refreshToken, ...others } = result
  console.log(others)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully',
    data: others,
  })
})
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  console.log(req.user)
  const { ...passwordData } = req.body
  await AuthService.changePassword(user, passwordData)

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IReFreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
}
