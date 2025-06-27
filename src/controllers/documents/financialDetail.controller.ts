import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listOfFinancialDetailsService } from "../../services/documents/financialDetail.service.js";

export const listOfFinancialDetails= asyncHandler(async(req:Request,res:Response)=>{
try {
    const { financialId } = req.params
    const response = await listOfFinancialDetailsService(financialId)
    if(!response){
        return res.status(401).json(new ApiResponse(401,"error while fetching financial details",false,null))
    }
    return res.status(response.statusCode).json(response)
} catch (error) {
            return res.status(401).json(new ApiResponse(501,"",false,null))
}
})