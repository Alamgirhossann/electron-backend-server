import { Schema, model } from 'mongoose'
import { GeneralUserModel, IGeneralUser } from './generalUser.interface'

const GeneralUserSchema = new Schema<IGeneralUser, GeneralUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

export const GeneralUser = model<IGeneralUser, GeneralUserModel>(
  'GeneralUser',
  GeneralUserSchema
)
