var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Advisory } from "../models/advisory.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const listOfAdvisoryService = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return new ApiResponse(404, "user id is not found", false, null);
        }
        const skip = (page - 1) * limit;
        const listOfAdvisory = yield Advisory.find().skip(skip).limit(limit);
        if (!listOfAdvisory || listOfAdvisory == null) {
            return new ApiResponse(404, "error of advisroy is found ", false, null);
        }
        return new ApiResponse(200, "list of advisory is successfully fetch", true, listOfAdvisory);
    }
    catch (error) {
        return new ApiResponse(501, "error while show list of advisory", false, null);
    }
});
export const addNewAdvisoryService = (userId, adv_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            return new ApiResponse(404, "user id is not found", false, null);
        }
        if (!Object.keys(adv_data).length) {
            return new ApiResponse(404, "data is not found", false, null);
        }
        const addedData = yield Advisory.create(adv_data);
        if (!addedData || !addedData._id) {
            return new ApiResponse(404, "error when data inserting", false, null);
        }
        return new ApiResponse(201, "advisory is created", true, addedData);
    }
    catch (error) {
        return new ApiResponse(501, "error while add new advisory", false, null);
    }
});
export const updateAdvisoryService = (advisoryId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!advisoryId) {
            return new ApiResponse(404, "advisory id is not found", false, null);
        }
        if (!Object.keys(data).length) {
            return new ApiResponse(404, "updated data is not found", false, null);
        }
        const updatedAdvisory = yield Advisory.findByIdAndUpdate(advisoryId, { $set: data });
        if (!updatedAdvisory || !updatedAdvisory._id) {
            return new ApiResponse(404, "error when data updating advisory", false, null);
        }
        return new ApiResponse(201, "advisory is created", true, updatedAdvisory);
    }
    catch (error) {
        return new ApiResponse(501, "error while update advisory", false, null);
    }
});
