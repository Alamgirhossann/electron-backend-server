import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { pagination } from '../../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOption = pick(req.query, pagination)

  const result = await StudentService.getAllStudents(filters, paginationOption)
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.getSingleStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await StudentService.updateStudent(id, updatedData)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.deleteStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
