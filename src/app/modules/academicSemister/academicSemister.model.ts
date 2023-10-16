import { Schema, model } from 'mongoose'
import {
  AcademicSemisterModel,
  IAcademicSemister,
} from './academicSemister.interface'
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'

export const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    syncId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await academicSemister.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semister is already exist'
    )
  }
  next()
})

export const academicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'academicSemister',
  academicSemisterSchema
)
