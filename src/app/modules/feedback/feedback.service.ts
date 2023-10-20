/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const createFeedback = async (payload: IFeedback): Promise<IFeedback> => {
  const result = await Feedback.create(payload);
  return result;
};

const getAllFeedback = async (): Promise<IFeedback[]> => {
  const result = await Feedback.find({});
  return result;
};

// const getSingleBooking = async (id: string): Promise<IFeedback | null> => {
//   const result = await Feedback.findById(id);
//   return result;
// };

// const updateBooking = async (
//   id: string,
//   payload: Partial<IFeedback>
// ): Promise<IFeedback | null> => {
//   const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findByIdAndDelete(id);
  return result;
};

export const FeedbackService = {
  createFeedback,
  deleteFeedback,
  getAllFeedback,
};
