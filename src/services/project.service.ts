import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const listOfProjectService = async (
  // userId: string,
  page: number,
  limit: number
) => {
  try {
    console.log("object2")
    // if (!userId) {
    //   return new ApiResponse(401, "userId is not found", false, null);
    // }
    console.log("hll")
    const skip = (page - 1) * limit;
    const projectData = await Project.find()
      .skip(skip)
      .limit(limit);
    if (!projectData || projectData == null) {
      return new ApiResponse(401, "project data is not  found", false, null);
    }
    return new ApiResponse(
      201,
      "project data is fetched successfully",
      true,
      projectData
    );
  } catch (error) {
    return new ApiResponse(
      501,
      "Internal error when data is fetching",
      false,
      null
    );
  }
};

export const addNewProjectService = async (
  // userId: string,
  projectname: string,
  address: string,
  city: string,
  state: string,
  zipcode: number
) => {
  try {
    const addedProject = await Project.create({//userId,
      projectname,
      address,
      city,
      state,
      zipcode,
    });
    console.log("not adding", addedProject);
    if (!addedProject || !addedProject._id) {
      return new ApiResponse(
        401,
        "project is not add something is error",
        false,
        null
      );
    }

    return new ApiResponse(
      201,
      "project is added successfully",
      true,
      addedProject
    );
  } catch (error) {
    return new ApiResponse(
      501,
      "Internal Api error while adding project",
      false,
      null
    );
  }
};

export const updateProjectByIdService = async (
  updateField: any,
  projectId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return new ApiResponse(401, "project id is not valid", false, null);
    }
    console.log("data updateField", updateField);
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateField },
      { new: true }
    );
    console.log(updatedProject)
    if (!updatedProject || !updatedProject?._id) {
      return new ApiResponse(401, "error while update date", false, null);
    }
    return new ApiResponse(201, "update successfully", true, updateField);
  } catch (error) {
    return new ApiResponse(501, "error while updateing data", false, null);
  }
};

export const deleteProjectByIdService = async (projectId: string) => {
  try {
    const project = await Project.findById(projectId);
    if (project && !project._id) {
      return new ApiResponse(
        401,
        "error while fetching project by Id",
        false,
        null
      );
    }
    const deletedproject = await Project.findByIdAndDelete(projectId);
    if (!deletedproject || deletedproject === null) {
      return new ApiResponse(401, "project is not deleted", false, null);
    }
    return new ApiResponse(
      201,
      "project is success fully deleted",
      true,
      deletedproject.projectname
    );
  } catch (error) {
    return new ApiResponse(501, "Error while project deleting", false, null);
  }
};

export const getProjectByIdService = async (projectId: string) => {
  try {
    if (!projectId) {
      return new ApiResponse(401, "project Id is not found", false, null);
    }
    const project = await Project.findById(projectId);
    if (project && project._id) {
      return new ApiResponse(
        201,
        "project is successfully fetched",
        true,
        project
      );
    }
    return new ApiResponse(
      401,
      "project is information is not matched",
      false,
      null
    );
  } catch (error) {
    return new ApiResponse(501, "error while is getting project", false, null);
  }
};
