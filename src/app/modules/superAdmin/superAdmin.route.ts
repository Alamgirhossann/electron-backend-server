import express from "express";
import { SuperAdminController } from "./superAdmin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.patch(
  "/:id",
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminController.updateSuperAdmin
);

// router.post(
//   "/",
//   //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
//   SuperAdminController.createSuperAdmin
// );

router.get(
  "/",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminController.getSuperAdmin
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminController.getSingleSuperAdmin
);

export const SuperAdminRoutes = router;
