import { WarrantyDetails } from "../../models/documents/warrantyDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfWarrantyDetailsService = async(warrantyId:string) =>{
try {
    if (!warrantyId) {
      return new ApiResponse(404, "warrantyId is not found", false, null);
    }
    const salesData = await WarrantyDetails.findOne({ warrantyId });
    if (salesData && salesData._id) {
      return new ApiResponse(
        200,
        "data is succesfully fetched",
        true,
        salesData
      );
    }
    const createdWarranty = await WarrantyDetails.create({
      warrantyId,
    });
    if(!createdWarranty || createdWarranty == null){
        return new ApiResponse(404, "error while getting data",false,null)
    }
    return new ApiResponse(200,"data is fetched suuccessfully",true,createdWarranty)
  } catch (error) {
    return new ApiResponse(501, "error while getting data of warranty", false, null);
  }
}