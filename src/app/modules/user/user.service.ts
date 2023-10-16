import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { academicSemister } from '../academicSemister/academicSemister.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generatedStudentId } from './user.utils'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
// import { IFaculty } from '../faculty/faculty.interface'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // set role
  user.role = 'student'

  const academicsemister = await academicSemister.findById(
    student.academicSemister
  )

  // generate student id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const id = await generatedStudentId(academicsemister)
    user.id = id
    student.id = id

    //array
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    //set student -->  _id into user.student
    user.student = newStudent[0].id

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

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemister',
        },
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

// const createFaculty = async (
//   faculty: IFaculty,
//   user: IUser
// ): Promise<IUser | null> => {
//   // default password
//   if (!user.password) {
//     user.password = config.default_student_pass as string
//   }

//   // set role
//   user.role = 'faculty'

//   const academicsemister = await academicSemister.findById(
//     faculty.academicSemister
//   )

//   // generate student id
//   let newUserAllData = null
//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()
//     const id = await generatedStudentId(academicsemister)
//     user.id = id
//     student.id = id

//     //array
//     const newStudent = await Student.create([student], { session })

//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
//     }

//     //set student -->  _id into user.student
//     user.student = newStudent[0]._id

//     const newUser = await User.create([user], { session })

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
//     }
//     newUserAllData = newUser[0]

//     await session.commitTransaction()
//     await session.endSession()
//   } catch (error) {
//     await session.abortTransaction()
//     await session.endSession()
//     throw error
//   }

//   //user --> student ---> academicSemester, academicDepartment , academicFaculty

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemister',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     })
//   }

//   return newUserAllData
// }

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // console.log(user, admin)
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string
  }

  // set role
  user.role = 'admin'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateAdminId()
    user.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }

    user.admin = newAdmin[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  // createFaculty
  createAdmin,
}
