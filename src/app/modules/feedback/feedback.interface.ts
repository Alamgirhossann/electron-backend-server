import { Model, Types } from "mongoose";
import { IServiceList } from "../serviceList/serviceList.interface";
import { IGeneralUser } from "../generalUser/generalUser.interface";

export interface IFeedback {
  name: string;
  rating: string;
  email: string;
  message: string;
  userId: string;
}

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;
export type IFeedbackFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
};
