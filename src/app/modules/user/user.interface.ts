/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { IGeneralUser } from "../generalUser/generalUser.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangeAt?: Date;
  generalUser?: Types.ObjectId | IGeneralUser;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<
      IUser,
      | "id"
      | "password"
      | "role"
      | "needsPasswordChange"
      | "generalUser"
      | "admin"
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>
// }

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
