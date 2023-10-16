import express from 'express'
// import validateRequest from '../../middlewares/validateRequest'
import { GeneralUserController } from './generalUser.controller'
// import { GeneralUserValidation } from './generalUser.validation'
const router = express.Router()

router.post(
  '/',
  //   validateRequest(GeneralUserValidation.create),
  GeneralUserController.createGeneralUser
)
router.get('/:id', GeneralUserController.getSingleGeneralUser)
router.patch(
  '/:id',
  //   validateRequest(GeneralUserValidation.update),
  GeneralUserController.updateGeneralUser
)
router.delete('/:id', GeneralUserController.deleteGeneralUser)

router.get('/', GeneralUserController.getAllGeneralUser)

export const GeneralUserRoutes = router
