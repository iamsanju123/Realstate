import { Router } from "express";
import { addMaindoc, deleteMaindoc, listOfDocument } from "../../controllers/documents/maindoc.controller.js";
const router = Router();
router.route('/').get(listOfDocument);
router.route('/').post(addMaindoc);
router.route('/:maindocId').delete(deleteMaindoc);
export default router;
