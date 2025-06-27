import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { listOfSalesRelatedDetailsService } from "../../services/documents/salesRelatedDetails.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfSalesRelatedDetails = asyncHandler(async(req:Request,res:Response)=>{
try {
    const {salesId} = req.params
    const response = await listOfSalesRelatedDetailsService(salesId)
    if(!response){
        return res.status(401).json(new ApiResponse( 401,"error while getting sales data",false,null))
    }
    return res.status(response.statusCode).json(response)
} catch (error) {
    return res.status(501).json(new ApiResponse( 501,"Internal server error",false,null))
}
})