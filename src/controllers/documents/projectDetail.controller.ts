import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { listOfProjectDetailService } from "../../services/documents/projectDetail.service.js";



export const listOfProjectDetail = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {projectDetailId} = req.params
        const response = await listOfProjectDetailService(projectDetailId)
        if(!response){
            return res.status(401).json(new ApiResponse(401,"error while fetching list of project detail",false,null))
        }
        return res.status(response.statusCode).json(response)
    } catch (error) {
          return res.status(501).json(new ApiResponse(501,"Internal server error",false,null))
    }
})