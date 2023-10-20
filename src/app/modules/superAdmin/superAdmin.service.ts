/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/error";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { superAdminSearchableFields } from "./superAdmin.constant";
import { ISuperAdmin, ISuperAdmintFilters } from "./superAdmin.interface";
import { SuperAdmin } from "./superAdmin.model";

const getSuperAdmin = async (
  filters: ISuperAdmintFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISuperAdmin[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: superAdminSearchableFields.map((field) => ({
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

  const result = await SuperAdmin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SuperAdmin.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const createSuperAdmin = async (
//   payload: ISuperAdmin
// ): Promise<ISuperAdmin | null> => {
//   const result = await SuperAdmin.create(payload);
//   return result;
// };

const updateSuperAdmin = async (
  id: string,
  payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
  const result = await SuperAdmin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getSingleSuperAdmin = async (id: string): Promise<ISuperAdmin | null> => {
  const result = await SuperAdmin.findById(id);
  return result;
};

export const SuperAdminService = {
  getSuperAdmin,
  updateSuperAdmin,
  getSingleSuperAdmin,
  //   createSuperAdmin,
};
