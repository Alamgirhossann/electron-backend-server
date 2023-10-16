import express from 'express'
// import { UserController } from './user.controller'
// import validateRequest from '../../middlewares/validateRequest'
// import { UserValidation } from './user.validation'
// import router from '../../routes'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { StudentValidaion } from './student.validation'

const router = express.Router()
router.get('/:id', StudentController.getSingleStudent)
router.get('/:id', StudentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
)
router.get('/', StudentController.getAllStudents)

export const StudentRoutes = router
