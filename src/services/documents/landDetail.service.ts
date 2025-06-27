import { LandDetail } from "../../models/documents/landDetail.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"


export const listOfLandDetailService = async(landDetailId:string)=>{
    try {
        if(!landDetailId){
            return new ApiResponse(404,"land detail Id is not found",false,null)
        }
        const landData = await LandDetail.findOne({landDetailId:landDetailId})
        if(landData && landData._id){
          return new ApiResponse(200,"data is successfully fetched",true,landData)
        }
        const createLandData = await LandDetail.create({
            landDetailId:landDetailId
        })
        if(createLandData){
            return new ApiResponse(200,"data is success",true,createLandData)
        }
    } catch (error) {
        return new ApiResponse(401,"error while data fetched",false,null)
    }
}