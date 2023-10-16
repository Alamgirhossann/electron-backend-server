import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { FacultyValidation } from '../faculty/faculty.validation'
import { FacultyController } from '../faculty/faculty.controller'
// import { ENUM_USER_ROLE } from '../../../enums/user'
// import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.createFaculty
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoutes = router
