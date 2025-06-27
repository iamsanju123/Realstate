var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LegalDetail } from "../../models/documents/legalDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const listOfLegalDetailService = (legalDetailId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!legalDetailId) {
            return new ApiResponse(404, "land detail Id is not found", false, null);
        }
        const legalData = yield LegalDetail.findOne({
            legalDetailId: legalDetailId,
        });
        if (legalData && legalData._id) {
            return new ApiResponse(200, "data is successfully fetched", true, legalData);
        }
        const createLegalData = yield LegalDetail.create({
            legalDetailId: legalDetailId,
        });
        if (createLegalData) {
            return new ApiResponse(200, "data is success", true, createLegalData);
        }
    }
    catch (error) {
        return new ApiResponse(401, "error while data fetched", false, null);
    }
});
