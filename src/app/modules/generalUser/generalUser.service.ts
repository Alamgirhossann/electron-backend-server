/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose, { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { User } from "../user/user.model";
import { IGenericResponse } from "../../../interfaces/error";
import { IGeneralUser, IGeneralUserFilters } from "./generalUser.interface";
import { generalUserSearchableFields } from "./generalUser.constant";
import { GeneralUser } from "./generalUser.model";
import { IUser } from "../user/user.interface";

const createGeneralUser = async (
  generalUser: IGeneralUser,
  user: IUser
): Promise<IUser | null> => {
  // console.log(user, generalUser)
  //   default password
  //   if (!user.password) {
  //     user.password = generalUser.password
  //   }

  // set role
  user.role = "user";

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    user.id = generalUser.email;
    generalUser.id = generalUser.email;

    const newAdmin = await GeneralUser.create([generalUser], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user ");
    }

    user.generalUser = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
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
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "generalUser",
    });
  }

  return newUserAllData;
};

const getAllGeneralUser = async (
  filters: IGeneralUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IGeneralUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: generalUserSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
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

  const result = await GeneralUser.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await GeneralUser.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleGeneralUser = async (
  id: string
): Promise<IGeneralUser | null> => {
  const result = await GeneralUser.findById(id);
  return result;
};

const updateGeneralUser = async (
  id: string,
  payload: Partial<IGeneralUser>
): Promise<IGeneralUser | null> => {
  const result = await GeneralUser.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteGeneralUser = async (id: string): Promise<IGeneralUser | null> => {
  const result = await GeneralUser.findByIdAndDelete(id);
  return result;
};

export const GeneralUserService = {
  getAllGeneralUser,
  getSingleGeneralUser,
  updateGeneralUser,
  deleteGeneralUser,
  createGeneralUser,
};
