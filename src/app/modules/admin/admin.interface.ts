import { Model, Types } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage?: string;
  email: string;
  gender?: "male" | "female";
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  gender?: "male" | "female";
};
