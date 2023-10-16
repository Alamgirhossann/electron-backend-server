import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemisterRoutes } from "../modules/academicSemister/academicSemister.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.routes";
import { StudentRoutes } from "../modules/student/student.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { ManagementDepartmentRoutes } from "../modules/managementDepartment/managementDepartment.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { GeneralUserRoutes } from "../modules/generalUser/generalUser.route";
import { ServiceListRoutes } from "../modules/serviceList/serviceList.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/academic-semisters",
    route: AcademicSemisterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/management-departments",
    route: ManagementDepartmentRoutes,
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
