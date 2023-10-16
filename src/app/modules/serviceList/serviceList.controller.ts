import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { pagination } from '../../../constants/pagination'
import { IServiceList } from './serviceList.interface'
import { ServiceListService } from './serviceList.service'
import { serviceListFilterableFields } from './serviceList.constant'

const createServiceList = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceList } = req.body
  const result = await ServiceListService.createServiceList(serviceList)

  sendResponse<IServiceList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service list created successfully',
    data: result,
  })
})

const getAllServiceList = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceListFilterableFields)
  const paginationOptions = pick(req.query, pagination)

  const result = await ServiceListService.getAllServiceList(
    filters,
    paginationOptions
  )

  sendResponse<IServiceList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service list fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleServiceList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceListService.getSingleServiceList(id)

  sendResponse<IServiceList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service list fetched successfully',
    data: result,
  })
})

const updateServiceList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceListService.updateServiceList(id, req.body)

  sendResponse<IServiceList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service list updated successfully',
    data: result,
  })
})

const deleteServiceList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceListService.deleteServiceList(id)

  sendResponse<IServiceList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service list deleted successfully',
    data: result,
  })
})

export const ServiceListController = {
  getAllServiceList,
  getSingleServiceList,
  updateServiceList,
  deleteServiceList,
  createServiceList,
}
