import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type ISuperAdmin = {
  id: string;
  name: UserName;
  profileImage?: string;
  email: string;
  gender?: "male" | "female";
};

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;
export type ISuperAdmintFilters = {
  searchTerm?: string;
};
