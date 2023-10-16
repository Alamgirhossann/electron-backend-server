import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { FacultyService } from './faculty.service'
import { IFaculty } from './faculty.interface'
import pick from '../../../shared/pick'
import { facultyFilterableFields } from './faculty.constant'
import { pagination } from '../../../constants/pagination'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await FacultyService.createFaculty(faculty, userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  })
})

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOption = pick(req.query, pagination)
  const result = await FacultyService.getAllFacultys(filters, paginationOption)

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.getSingleFaculty(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrived successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted successfully !',
    data: result,
  })
})

export const FacultyController = {
  createFaculty,
  getAllFacultys,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
}
