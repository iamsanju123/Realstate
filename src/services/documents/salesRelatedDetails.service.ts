import { SalesDetail } from "../../models/documents/saleRelatedDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfSalesRelatedDetailsService = async (salesId: string) => {
  try {
    if (!salesId) {
      return new ApiResponse(404, "sales Id is not found", false, null);
    }
    const salesData = await SalesDetail.findOne({ salesId });
    if (salesData && salesData._id) {
      return new ApiResponse(
        200,
        "data is succesfully fetched",
        true,
        salesData
      );
    }
    const createdSales = await SalesDetail.create({
      salesId,
    });
    if(!createdSales || createdSales == null){
        return new ApiResponse(404, "error while getting data",false,null)
    }
    return new ApiResponse(200,"data is fetched suuccessfully",true,createdSales)
  } catch (error) {
    return new ApiResponse(501, "error while getting data of ", false, null);
  }
};
