import { SocietyAssociationDetail } from "../../models/documents/societyAssociationDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfSocietyAssociationDetailsService =async(societyAssociationId:string)=>{
   try {
    if (!societyAssociationId) {
      return new ApiResponse(404, "societyAssociationId is not found", false, null);
    }
    const societyData = await SocietyAssociationDetail.findOne({ societyAssociationId });
    if (societyData && societyData._id){
      return new ApiResponse(
        200,
        "data is succesfully fetched",
        true,
        societyData
      );
    }
    const createdSocietyData = await SocietyAssociationDetail.create({
      societyAssociationId,
    });
    if(!createdSocietyData || createdSocietyData == null){
        return new ApiResponse(404, "error while getting data",false,null)
    }
    return new ApiResponse(200,"data is fetched suuccessfully",true,createdSocietyData)
  } catch (error) {
    return new ApiResponse(501, "error while getting data of society", false, null);
  }
}
