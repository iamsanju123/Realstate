import Router from "express";
import { listOfFinancialDetails } from "../../controllers/documents/financialDetail.controller.js";
const router = Router();
router.route("/:financialId").get(listOfFinancialDetails);
export default router;
