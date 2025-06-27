import { Router } from 'express';
import { addNewAdvisory, listOfAdvisory, updateAdvisory } from '../controllers/advisory.controller.js';
const router = Router();
router.route('/:userId').get(listOfAdvisory);
router.route('/:userId').post(addNewAdvisory);
router.route('/:advisoryId').patch(updateAdvisory);
export default router;
