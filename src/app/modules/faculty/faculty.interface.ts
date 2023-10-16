import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type IFaculty = {
  id: string
  name: UserName //embedded object
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: 'male' | 'female'
  permanentAddress: string
  presentAddress: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  designation: string
  academicDepartment: Types.ObjectId | IAcademicDepartment // // reference _id
  academicFaculty: Types.ObjectId | IAcademicFaculty // reference _id
  profileImage?: string
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  bloogGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
