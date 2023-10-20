import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-admin",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
