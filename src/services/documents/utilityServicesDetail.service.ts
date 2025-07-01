import { UtilityServicesDetail } from "../../models/documents/utilityServicesDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfUtilityServicesDetailsService = async (utilityServicesId:string)=>{
 try {
    if (!utilityServicesId) {
      return new ApiResponse(404, "utilityServicesId is not found", false, null);
    }
    const utilityData = await UtilityServicesDetail.findOne({ utilityServicesId });
    if (utilityData && utilityData._id) {
      return new ApiResponse(
        200,
        "data is succesfully fetched",
        true,
        utilityData
      );
    }
    const createdUtilityData = await UtilityServicesDetail.create({
      utilityServicesId,
    });
    if(!createdUtilityData || createdUtilityData == null){
        return new ApiResponse(404, "error while getting data",false,null)
    }
    return new ApiResponse(200,"data is fetched suuccessfully",true,createdUtilityData)
  } catch (error) {
    return new ApiResponse(501, "error while getting data of utility", false, null);
  }
}