import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FeedbackService } from "./feedback.service";
import { IFeedback } from "./feedback.interface";

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...feedbackData } = req.body;
  // console.log(bookingData);
  const result = await FeedbackService.createFeedback(feedbackData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback created successfully",
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedback();

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback retrieved successfully !",
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FeedbackService.deleteFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Feedback deleted successfully !",
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
};
