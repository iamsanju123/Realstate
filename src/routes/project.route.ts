import { Router } from "express";
import {
  addNewProject,
  deleteProjectById,
  getProjectById,
  listOfProject,
  updateProjectById,
} from "../controllers/project.controller.js";
import { verifyUser } from "../middlewares/authUser.middleware.js";
import { isAdmin } from "../middlewares/authAdmin.middleware.js";

const router = Router();

router.route("/").get(listOfProject);//verifyUser
router.route("/:projectId").get(getProjectById);
router.route("/").post(addNewProject);//verifyUser,isAdmin,
router.route("/:projectId").delete(deleteProjectById);//verifyUser,isAdmin,
router.route("/:projectId").patch(updateProjectById);//verifyUser,isAdmin,


export default router;
