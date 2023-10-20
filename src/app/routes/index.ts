import express from "express";
import { UserRoutes } from "../modules/user/user.route";

import { AdminRoutes } from "../modules/admin/admin.route";

import { AuthRoutes } from "../modules/auth/auth.route";
import { GeneralUserRoutes } from "../modules/generalUser/generalUser.route";
import { ServiceListRoutes } from "../modules/serviceList/serviceList.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { SuperAdminRoutes } from "../modules/superAdmin/superAdmin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },

  {
    path: "/admins",
    route: AdminRoutes,
  },

  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/general-user",
    route: GeneralUserRoutes,
  },
  {
    path: "/service-list",
    route: ServiceListRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/super-admin",
    route: SuperAdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
