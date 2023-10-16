/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IReFreshTokenResponse,
} from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
// import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id)
  console.log('userInfo', isUserExist)

  let userProfileId = null

  if (isUserExist.generalUser) {
    const generalUser = isUserExist.generalUser
    userProfileId = generalUser
  } else {
    const admin = isUserExist.admin
    userProfileId = admin
  }

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  //create access token & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
    //@ts-ignore
    userProfileId,
  }
}

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId)

  //alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_round)
  // )

  // const query = { id: user?.userId }
  // const updatedData = {
  //   password: newHashedPassword, //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // }

  // await User.findOneAndUpdate(query, updatedData)

  // data update
  isUserExist.password = newPassword
  isUserExist.needsPasswordChange = false

  // updating using save()
  isUserExist.save()
}

const refreshToken = async (token: string): Promise<IReFreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { userId } = verifiedToken
  const isUserExist = await User.isUserExist(userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist')
  }

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
