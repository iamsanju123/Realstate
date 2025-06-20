import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  addNewProjectService,
  deleteProjectByIdService,
  getProjectByIdService,
  listOfProjectService,
  updateProjectByIdService,
} from "../services/project.service.js";

interface AuthRequest extends Request {
  session?: any;
  isAdmin?: boolean;
}

export const listOfProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      console.log("1")
      // const userId = req.session.userSessionId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      console.log("111")
      const response = await listOfProjectService( page, limit);
      console.log("object3",response)
      if (!response) {
        return new ApiResponse(
          501,
          "Error while fetching project list",
          false,
          null
        );
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal server error while fetching list of project",
            false,
            null
          )
        );
    }
  }
);

export const addNewProject = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      // const userId = req.session.userSessionId;
      const { projectname, address, city, state, zipcode } = req.body;
       console.log( projectname, address, city, state, zipcode)
      const response = await addNewProjectService(
        // userId,
        projectname,
        address,
        city,
        state,
        zipcode
      );
      if (!response) {
        return null
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal server error while fetching list of project",
            false,
            null
          )
        );
    }
  }
);

export const updateProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const updateField = req.body;
      const response = await updateProjectByIdService(updateField, projectId);
      if (!response) {
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal server error while fetching list of project",
            false,
            null
          )
        );
    }
  }
);

export const deleteProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const response = await deleteProjectByIdService(projectId);
      if (!response) {
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(
            501,
            "Internal server error while fetching list of project",
            false,
            null
          )
        );
    }
  }
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const response = await getProjectByIdService(projectId);
      if (!response) {
        return new ApiResponse(
          401,
          "data is not found something is error",
          false,
          null
        );
      }
      return res.status(response?.statusCode).json(response);
    } catch (error) {
      return res
        .status(501)
        .json(
          new ApiResponse(501, "error while getTaskbyId task", false, null)
        );
    }
  }
);
