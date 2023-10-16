import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemisterValidation } from './academicSemisterValidation'
import { AcademicSemisterController } from './academicSemister.controller'

const router = express.Router()

router.post(
  '/create-semister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createSemister
)
router.get('/:id', AcademicSemisterController.getSingleSemister)
router.patch(
  '/:id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemisterController.updateSemister
)
router.delete(
  '/:id',
  // validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemisterController.deleteSemister
)
router.get('/', AcademicSemisterController.getAllSemister)

export const AcademicSemisterRoutes = router
