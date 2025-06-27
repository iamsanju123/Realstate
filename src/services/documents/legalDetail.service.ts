import { LegalDetail } from "../../models/documents/legalDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfLegalDetailService = async (legalDetailId: string) => {
  try {
    if (!legalDetailId) {
      return new ApiResponse(404, "land detail Id is not found", false, null);
    }
    const legalData = await LegalDetail.findOne({
      legalDetailId: legalDetailId,
    });
    if (legalData && legalData._id) {
      return new ApiResponse(
        200,
        "data is successfully fetched",
        true,
        legalData
      );
    }
    const createLegalData = await LegalDetail.create({
      legalDetailId: legalDetailId,
    });
    if (createLegalData) {
      return new ApiResponse(200, "data is success", true, createLegalData);
    }
  } catch (error) {
    return new ApiResponse(401, "error while data fetched", false, null);
  }
};
