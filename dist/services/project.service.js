var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const listOfProjectService = (
// userId: string,
page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("object2")
        // if (!userId) {
        //   return new ApiResponse(401, "userId is not found", false, null);
        // }
        // console.log("hll")
        const skip = (page - 1) * limit;
        const projectData = yield Project.find()
            .skip(skip)
            .limit(limit);
        if (!projectData || projectData == null) {
            return new ApiResponse(401, "project data is not  found", false, null);
        }
        return new ApiResponse(201, "project data is fetched successfully", true, projectData);
    }
    catch (error) {
        return new ApiResponse(501, "Internal error when data is fetching", false, null);
    }
});
export const addNewProjectService = (
// userId: string,
projectname, address, city, state, zipcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedProject = yield Project.create({
            projectname,
            address,
            city,
            state,
            zipcode,
        });
        // console.log("not adding", addedProject);
        if (!addedProject || !addedProject._id) {
            return new ApiResponse(401, "project is not add something is error", false, null);
        }
        return new ApiResponse(201, "project is added successfully", true, addedProject);
    }
    catch (error) {
        return new ApiResponse(501, "Internal Api error while adding project", false, null);
    }
});
export const updateProjectByIdService = (updateField, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return new ApiResponse(401, "project id is not valid", false, null);
        }
        // console.log("data updateField", updateField);
        const updatedProject = yield Project.findByIdAndUpdate(projectId, { $set: updateField }, { new: true });
        // console.log(updatedProject)
        if (!updatedProject || !(updatedProject === null || updatedProject === void 0 ? void 0 : updatedProject._id)) {
            return new ApiResponse(401, "error while update date", false, null);
        }
        return new ApiResponse(201, "update successfully", true, updateField);
    }
    catch (error) {
        return new ApiResponse(501, "error while updateing data", false, null);
    }
});
export const deleteProjectByIdService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project.findById(projectId);
        if (project && !project._id) {
            return new ApiResponse(401, "error while fetching project by Id", false, null);
        }
        const deletedproject = yield Project.findByIdAndDelete(projectId);
        if (!deletedproject || deletedproject === null) {
            return new ApiResponse(401, "project is not deleted", false, null);
        }
        return new ApiResponse(201, "project is success fully deleted", true, deletedproject.projectname);
    }
    catch (error) {
        return new ApiResponse(501, "Error while project deleting", false, null);
    }
});
export const getProjectByIdService = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!projectId) {
            return new ApiResponse(401, "project Id is not found", false, null);
        }
        const project = yield Project.findById(projectId);
        if (project && project._id) {
            return new ApiResponse(201, "project is successfully fetched", true, project);
        }
        return new ApiResponse(401, "project is information is not matched", false, null);
    }
    catch (error) {
        return new ApiResponse(501, "error while is getting project", false, null);
    }
});
