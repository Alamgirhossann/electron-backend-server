import { Model, Types } from "mongoose";
import { IServiceList } from "../serviceList/serviceList.interface";
import { IGeneralUser } from "../generalUser/generalUser.interface";

export interface IBooking {
  name: string;
  price: string;
  email: string;
  contactNo: string;
  dateOfBooking: string;
  address: string;
  userId: string;
  serviceId: Types.ObjectId | IServiceList;
  status: "pending" | "confirm" | "cancel";
}

export type BookingModel = Model<IBooking, Record<string, unknown>>;
export type IBookingFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  address?: string;
};
