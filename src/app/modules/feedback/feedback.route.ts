import express from "express";
import { FeedbackController } from "./feedback.controller";
const router = express.Router();

router.post("/", FeedbackController.createFeedback);

router.delete("/:id", FeedbackController.deleteFeedback);

router.get("/", FeedbackController.getAllFeedback);

export const FeedbackRoutes = router;
