import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listOfLegalDetailService } from "../../services/documents/legalDetail.service.js";


export const listOfLegalDetail = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {legalDetailId} = req.params
        const response = await listOfLegalDetailService(legalDetailId)
        if(!response){
            return res.status(401).json(new ApiResponse(401,"error while fetching list of legal detail",false,null))
        }
        return res.status(response.statusCode).json(response)
    } catch (error) {
          return res.status(501).json(new ApiResponse(501,"Internal server error",false,null))
    }
})