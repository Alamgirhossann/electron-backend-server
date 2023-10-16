import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/error'
import { IPaginationOptions } from '../../../interfaces/pagination'

import { IServiceList, IServiceListFilters } from './serviceList.interface'
import { ServiceList } from './serviceList.model'
import { serviceListSearchableFields } from './serviceList.constant'

const getAllServiceList = async (
  filters: IServiceListFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IServiceList[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: serviceListSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await ServiceList.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await ServiceList.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const createServiceList = async (
  payload: IServiceList
): Promise<IServiceList | null> => {
  const result = await ServiceList.create(payload)
  return result
}

const getSingleServiceList = async (
  id: string
): Promise<IServiceList | null> => {
  const result = await ServiceList.findById(id)
  return result
}

const updateServiceList = async (
  id: string,
  payload: Partial<IServiceList>
): Promise<IServiceList | null> => {
  const result = await ServiceList.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteServiceList = async (id: string): Promise<IServiceList | null> => {
  const result = await ServiceList.findByIdAndDelete(id)
  return result
}

export const ServiceListService = {
  getAllServiceList,
  getSingleServiceList,
  updateServiceList,
  deleteServiceList,
  createServiceList,
}
