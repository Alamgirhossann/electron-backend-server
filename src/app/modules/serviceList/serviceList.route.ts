import express from 'express'
import { ServiceListController } from './serviceList.controller'
const router = express.Router()

router.post('/', ServiceListController.createServiceList)
router.get('/:id', ServiceListController.getSingleServiceList)

router.patch('/:id', ServiceListController.updateServiceList)

router.delete('/:id', ServiceListController.deleteServiceList)

router.get('/', ServiceListController.getAllServiceList)

export const ServiceListRoutes = router
