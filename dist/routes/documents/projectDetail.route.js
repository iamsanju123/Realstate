import Router from 'express';
import { listOfProjectDetail } from '../../controllers/documents/projectDetail.controller.js';
const router = Router();
router.route('/:projectDetailId').get(listOfProjectDetail);
export default router;
