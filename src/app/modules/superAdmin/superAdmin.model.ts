import { Schema, model } from "mongoose";
import { ISuperAdmin, SuperAdminModel } from "./superAdmin.interface";

const SuperAdminSchema = new Schema<ISuperAdmin, SuperAdminModel>(
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
      enum: ["male", "female"],
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
);

export const SuperAdmin = model<ISuperAdmin, SuperAdminModel>(
  "SuperAdmin",
  SuperAdminSchema
);
