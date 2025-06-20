var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { addNewProjectService, deleteProjectByIdService, getProjectByIdService, listOfProjectService, updateProjectByIdService, } from "../services/project.service.js";
export const listOfProject = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("1");
        // const userId = req.session.userSessionId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log("111");
        const response = yield listOfProjectService(page, limit);
        console.log("object3", response);
        if (!response) {
            return new ApiResponse(501, "Error while fetching project list", false, null);
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error while fetching list of project", false, null));
    }
}));
export const addNewProject = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userId = req.session.userSessionId;
        const { projectname, address, city, state, zipcode } = req.body;
        console.log(projectname, address, city, state, zipcode);
        const response = yield addNewProjectService(
        // userId,
        projectname, address, city, state, zipcode);
        if (!response) {
            return null;
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error while fetching list of project", false, null));
    }
}));
export const updateProjectById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const updateField = req.body;
        const response = yield updateProjectByIdService(updateField, projectId);
        if (!response) {
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error while fetching list of project", false, null));
    }
}));
export const deleteProjectById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const response = yield deleteProjectByIdService(projectId);
        if (!response) {
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "Internal server error while fetching list of project", false, null));
    }
}));
export const getProjectById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const response = yield getProjectByIdService(projectId);
        if (!response) {
            return new ApiResponse(401, "data is not found something is error", false, null);
        }
        return res.status(response === null || response === void 0 ? void 0 : response.statusCode).json(response);
    }
    catch (error) {
        return res
            .status(501)
            .json(new ApiResponse(501, "error while getTaskbyId task", false, null));
    }
}));
