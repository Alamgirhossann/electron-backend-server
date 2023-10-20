import { Schema, model } from "mongoose";
import { FeedbackModel, IFeedback } from "./feedback.interface";

const FeedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = model<IFeedback, FeedbackModel>(
  "Feedback",
  FeedbackSchema
);
