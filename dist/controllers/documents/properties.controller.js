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
import { listPropertiesDetailsService } from "../../services/documents/properties.service.js";
export const listPropertiesDetails = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyId } = req.params;
        const response = yield listPropertiesDetailsService(propertyId);
        if (!response) {
            return res.status(404).json(new ApiResponse(404, "error while show properties detail", false, null));
        }
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        return res.status(501).json(new ApiResponse(501, "Internal error while fetching details and list of properties", false, null));
    }
}));
