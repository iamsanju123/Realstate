import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listOfLandDetailService } from "../../services/documents/landDetail.service.js";

export const listOfLandDetail = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {landDetailId} = req.params
        const response = await listOfLandDetailService(landDetailId)
        if(!response){
            return res.status(401).json(new ApiResponse(401,"error while fetching list of land detail",false,null))
        }
        return res.status(response.statusCode).json(response)
    } catch (error) {
          return res.status(501).json(new ApiResponse(501,"Internal server error",false,null))
    }
})