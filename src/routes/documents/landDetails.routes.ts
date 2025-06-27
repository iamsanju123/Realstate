import Router from 'express'
import { listOfLandDetail } from '../../controllers/documents/landDetail.controller.js'

const router = Router()

router.route('/:landDetailId').get(listOfLandDetail)

export default router