import { Request, Response } from "express";
import httpStatus from "http-status";
import { pagination } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookingFilterableFields } from "./booking.constant";
import { BookingService } from "./booking.service";
import { IBooking } from "./booking.interface";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...bookingData } = req.body;
  // console.log(bookingData);
  const result = await BookingService.createBooking(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const paginationOptions = pick(req.query, pagination);
  const user = req.user;

  // console.log(user);

  const result = await BookingService.getAllBooking(
    filters,
    paginationOptions,
    user
  );

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.getSingleBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully !",
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await BookingService.updateBooking(id, updatedData);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully !",
    data: result,
  });
});
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookingService.deleteBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully !",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
