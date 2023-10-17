import { Schema, model } from "mongoose";
import { IServiceList, ServiceListModel } from "./serviceList.interface";
import { serviceAvailability } from "./serviceList.constant";

const ServiceListSchema = new Schema<IServiceList, ServiceListModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      enum: serviceAvailability,
      default: "Available",
    },

    rating: {
      type: String,
      required: true,
    },
    tag: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ServiceList = model<IServiceList, ServiceListModel>(
  "ServiceList",
  ServiceListSchema
);
