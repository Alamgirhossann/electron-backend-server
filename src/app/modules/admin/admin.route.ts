import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AdminController } from './admin.controller'
import { AdminValidation } from './admin.validation'
const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.post('/:id', AdminController.userProfile)
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
)
router.delete('/:id', AdminController.deleteAdmin)

router.get('/', AdminController.getAllAdmins)

export const AdminRoutes = router
