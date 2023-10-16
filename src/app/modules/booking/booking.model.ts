import { Schema, model } from "mongoose";
import { BookingModel, IBooking } from "./booking.interface";

const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      required: true,
      type: String,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },

    dateOfBooking: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceList",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking, BookingModel>("Booking", BookingSchema);
