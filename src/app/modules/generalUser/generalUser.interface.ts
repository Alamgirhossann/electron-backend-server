import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IGeneralUser = {
  id: string
  //   password: string
  name: UserName
  profileImage?: string
  email: string
  gender?: 'male' | 'female'
}

export type GeneralUserModel = Model<IGeneralUser, Record<string, unknown>>

export type IGeneralUserFilters = {
  searchTerm?: string
  id?: string
  email?: string
  gender?: 'male' | 'female'
}
