import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { pagination } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { generalUserFilterableFields } from './generalUser.constant'
import { GeneralUserService } from './generalUser.service'
import { IGeneralUser } from './generalUser.interface'

const getAllGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, generalUserFilterableFields)
  const paginationOptions = pick(req.query, pagination)

  const result = await GeneralUserService.getAllGeneralUser(
    filters,
    paginationOptions
  )

  sendResponse<IGeneralUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const createGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const { generalUser, ...userData } = req.body
  const result = await GeneralUserService.createGeneralUser(
    generalUser,
    userData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getSingleGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await GeneralUserService.getSingleGeneralUser(id)

  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  })
})

const updateGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await GeneralUserService.updateGeneralUser(id, updatedData)

  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})
const deleteGeneralUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await GeneralUserService.deleteGeneralUser(id)

  sendResponse<IGeneralUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  })
})

export const GeneralUserController = {
  getAllGeneralUser,
  getSingleGeneralUser,
  updateGeneralUser,
  deleteGeneralUser,
  createGeneralUser,
}
