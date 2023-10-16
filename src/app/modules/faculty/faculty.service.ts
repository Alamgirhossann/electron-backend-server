import mongoose, { SortOrder } from 'mongoose'
import config from '../../../config'
import { IUser } from '../user/user.interface'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { generateFacultyId } from './faculty.utils'
import { Faculty } from './faculty.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/error'
import { facultySearchableFields } from './faculty.constant'

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }
  // set role
  user.role = 'faculty'

  // generate student id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    //array
    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    //set student -->  _id into user.student
    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  //user --> faculty ---> academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

const getAllFacultys = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const { name, ...updatedData } = payload

  const updatedFacultyData: Partial<IFaculty> = { ...updatedData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })

  return result
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    await User.deleteOne({ id })
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student')
    }
    //delete user

    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const FacultyService = {
  createFaculty,
  getAllFacultys,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
}
