import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IAcademicSemister,
  IAcademicSemisterCreatedEvent,
  IAcademicSemisterFilters,
} from './academicSemister.interface'
import {
  academicSemisterSearchableFields,
  academicSemisterTitleCodeMapper,
} from './academicSemister.constant'
import { academicSemister } from './academicSemister.model'
import { IGenericResponse } from '../../../interfaces/error'

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code')
  }
  const result = await academicSemister.create(payload)
  return result
}

const getAllSemister = async (
  filters: IAcademicSemisterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemisterSearchableFields.map(field => ({
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

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await academicSemister
    .find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await academicSemister.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await academicSemister.findById(id)
  return result
}

const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semister Code')
  }
  const result = await academicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await academicSemister.findByIdAndDelete(id)
  return result
}

const createSemisterFromEvent = async (
  e: IAcademicSemisterCreatedEvent
): Promise<void> => {
  await academicSemister.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  })
}

export const AcademicSemisterService = {
  createSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
  createSemisterFromEvent,
}
