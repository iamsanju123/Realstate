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
import { addNewAdvisoryService, listOfAdvisoryService } from "../services/advisory.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const listOfAdvisory = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 0, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const rawLimit = parseInt(limit, 10);
        const { userId } = req.params;
        const response = yield listOfAdvisoryService(userId, pageNumber, rawLimit);
        if (!response) {
            return res
                .status(401)
                .json(new ApiResponse(401, "error while fetching list of advisory ", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return new ApiResponse(501, "error while getting list of advisory", false, null);
    }
}));
export const addNewAdvisory = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const adv_data = req.body;
        const response = yield addNewAdvisoryService(userId, adv_data);
        if (!response) {
            return res.status(401).json(new ApiResponse(401, "error while adding advisory", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return new ApiResponse(501, "error while adding advisory", false, null);
    }
}));
export const updateAdvisory = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return new ApiResponse(501, "error while update advisory", false, null);
    }
}));
