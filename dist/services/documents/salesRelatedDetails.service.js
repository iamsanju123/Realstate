var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SalesDetail } from "../../models/documents/saleRelatedDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const listOfSalesRelatedDetailsService = (salesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!salesId) {
            return new ApiResponse(404, "sales Id is not found", false, null);
        }
        const salesData = yield SalesDetail.findOne({ salesId });
        if (salesData && salesData._id) {
            return new ApiResponse(200, "data is succesfully fetched", true, salesData);
        }
        const createdSales = yield SalesDetail.create({
            salesId,
            contract: "",
            paymentSchedule: "",
            possesionLater: "",
            allotmentLater: "",
            floorPlan: "",
            builtUpAreaStatement: "",
            specificationList: "",
        });
        if (!createdSales || createdSales == null) {
            return new ApiResponse(404, "error while getting data", false, null);
        }
        return new ApiResponse(200, "data is fetched suuccessfully", true, createdSales);
    }
    catch (error) {
        return new ApiResponse(501, "error while getting data of ", false, null);
    }
});
