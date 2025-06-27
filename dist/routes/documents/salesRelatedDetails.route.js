import { Router } from "express";
import { listOfSalesRelatedDetails } from "../../controllers/documents/salesRelatedDetail.controller.js";
const router = Router();
router.route("/:salesId").get(listOfSalesRelatedDetails);
export default router;
