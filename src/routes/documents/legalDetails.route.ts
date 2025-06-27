import Router from 'express'
import { listOfLegalDetail } from '../../controllers/documents/legalDetail.controller.js'


const router = Router()

router.route('/:legalDetailId').get(listOfLegalDetail)

export default router