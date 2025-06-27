import { Request, response, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addNewAdvisoryService, listOfAdvisoryService } from "../services/advisory.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const listOfAdvisory = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { page = 0, limit = 10 } = req.query;
      const pageNumber = parseInt(page as string, 10);
      const rawLimit = parseInt(limit as string, 10);
      const { userId } = req.params;
      const response = await listOfAdvisoryService(
        userId,
        pageNumber,
        rawLimit
      );
      if (!response) {
        return res
          .status(401)
          .json(
            new ApiResponse(
              401,
              "error while fetching list of advisory ",
              false,
              null
            )
          );
      }
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return new ApiResponse(
        501,
        "error while getting list of advisory",
        false,
        null
      );
    }
  }
);

export const addNewAdvisory = asyncHandler(
  async (req: Request, res: Response) => {
    try {
        const { userId }  = req.params
        const adv_data = req.body
        const response = await addNewAdvisoryService(userId,adv_data)
        if(!response){
          return res.status(401).json(new ApiResponse(401,"error while adding advisory",false,null))
        }
        return res.status(response.statusCode).json(response)
    } catch (error) {
         return new ApiResponse(
        501,
        "error while adding advisory",
        false,
        null
      );
    }
  }
);

export const updateAdvisory = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      
    } catch (error) {
         return new ApiResponse(
        501,
        "error while update advisory",
        false,
        null
      );
    }
  }
);
