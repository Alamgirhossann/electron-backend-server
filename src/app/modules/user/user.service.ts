import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId } from "./user.utils";
import httpStatus from "http-status";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // console.log(user, admin)
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = "admin";

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create faculty ");
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id });
  }

  return newUserAllData;
};

export const UserService = {
  createAdmin,
};
