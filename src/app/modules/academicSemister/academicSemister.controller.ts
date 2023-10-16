import { Request, Response } from 'express'
import { AcademicSemisterService } from './academicSemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination } from '../../../constants/pagination'
import { academicSemisterFilterableFields } from './academicSemister.constant'
import { IAcademicSemister } from './academicSemister.interface'

const createSemister = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemisterData } = req.body
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister Created Successfully',
    data: result,
  })
})

const getAllSemister = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemisterFilterableFields)
  const paginationOption = pick(req.query, pagination)

  const result = await AcademicSemisterService.getAllSemister(
    filters,
    paginationOption
  )
  sendResponse<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemisterService.getSingleSemister(id)
  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister retrived successfully',
    data: result,
  })
})

const updateSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await AcademicSemisterService.updateSemister(id, updatedData)
  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister updated successfully',
    data: result,
  })
})

const deleteSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemisterService.deleteSemister(id)
  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister deleted successfully',
    data: result,
  })
})

export const AcademicSemisterController = {
  createSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
}
