import { Model, Types } from "mongoose";
import { IServiceList } from "../serviceList/serviceList.interface";

export interface IBooking {
  name: string;
  price: string;
  email: string;
  contactNo: string;
  dateOfBooking: string;
  address: string;
  serviceId: Types.ObjectId | IServiceList;
}

export type BookingModel = Model<IBooking, Record<string, unknown>>;
export type IBookingFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
  address?: string;
};
