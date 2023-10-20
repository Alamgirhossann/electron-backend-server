import express from "express";
import { ServiceListController } from "./serviceList.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceListController.createServiceList
);
router.get("/:id", ServiceListController.getSingleServiceList);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceListController.updateServiceList
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceListController.deleteServiceList
);

router.get("/", ServiceListController.getAllServiceList);

export const ServiceListRoutes = router;
