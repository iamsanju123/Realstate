var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listOfLegalDetailService } from "../../services/documents/legalDetail.service.js";
export const listOfLegalDetail = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { legalDetailId } = req.params;
        const response = yield listOfLegalDetailService(legalDetailId);
        if (!response) {
            return res.status(401).json(new ApiResponse(401, "error while fetching list of legal detail", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res.status(501).json(new ApiResponse(501, "Internal server error", false, null));
    }
}));
