import Router from "express";
import { listPropertiesDetails } from "../../controllers/documents/properties.controller.js";

const router = Router()

router.route("/:propertyId").get(listPropertiesDetails)

export default router
