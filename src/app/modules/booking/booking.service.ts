/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/error";
import { IBooking, IBookingFilters } from "./booking.interface";
import { Booking } from "./booking.model";
import { bookingSearchableFields } from "./booking.constant";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const result = await Booking.create(payload);
  return result;
};

const getAllBooking = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions,
  user: JwtPayload | null
): Promise<IGenericResponse<IBooking[]>> => {
  console.log("general", user);
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookingSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (user) {
    if (user.role === "admin" || user.role === "super_admin") {
    } else if (user.role === "user") {
      andConditions.push({ userId: user.userId });
    }
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereConditions)
    .populate("userId")
    .populate("serviceId")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total: total,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id).populate("serviceId");
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
