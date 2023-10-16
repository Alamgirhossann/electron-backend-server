import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { FacultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  FacultyController.getSingleFaculty
)
router.patch(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY,
  //   ENUM_USER_ROLE.SUPER_ADMIN
  // ),
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.deleteFaculty
)
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY,
  //   ENUM_USER_ROLE.STUDENT,
  //   ENUM_USER_ROLE.SUPER_ADMIN
  // ),
  FacultyController.getAllFacultys
)

export const FacultyRoutes = router
