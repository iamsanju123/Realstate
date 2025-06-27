import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listPropertiesDetailsService } from "../../services/documents/properties.service.js";

export const listPropertiesDetails = asyncHandler(async(req:Request,res:Response)=>{
try {
    const { propertyId } = req.params
    const response = await listPropertiesDetailsService(propertyId)
    if(!response){
      return res.status(404).json(new ApiResponse(404,"error while show properties detail",false,null))
    }
    return res.status(response.statusCode).json(response)
} catch (error) {
    return res.status(501).json(new ApiResponse(501,"Internal error while fetching details and list of properties",false,null))
}
})