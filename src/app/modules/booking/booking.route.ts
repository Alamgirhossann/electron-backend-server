import express from "express";
import { BookingController } from "./booking.controller";
const router = express.Router();

router.post("/", BookingController.createBooking);

router.get("/:id", BookingController.getSingleBooking);
router.patch("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.deleteBooking);

router.get("/", BookingController.getAllBooking);

export const BookingRoutes = router;
