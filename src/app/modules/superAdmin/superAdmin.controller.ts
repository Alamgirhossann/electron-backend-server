import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ISuperAdmin } from "./superAdmin.interface";
import { SuperAdminService } from "./superAdmin.service";
import pick from "../../../shared/pick";
import { pagination } from "../../../constants/pagination";
import { superAdminFilterableFields } from "./superAdmin.constant";

// const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
//   const { ...userData } = req.body;
//   const result = await SuperAdminService.createSuperAdmin(userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User created successfully",
//     data: result,
//   });
// });
const getSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, superAdminFilterableFields);
  const paginationOptions = pick(req.query, pagination);
  const result = await SuperAdminService.getSuperAdmin(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super admin retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SuperAdminService.getSingleSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super admin fetched successfully",
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  console.log(id, updatedData);

  const result = await SuperAdminService.updateSuperAdmin(id, updatedData);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Super admin updated successfully !",
    data: result,
  });
});

export const SuperAdminController = {
  getSuperAdmin,
  updateSuperAdmin,
  getSingleSuperAdmin,
  //   createSuperAdmin,
};
