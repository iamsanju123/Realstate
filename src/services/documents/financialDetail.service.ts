import { FinancialDetail } from "../../models/documents/financialDetail.model.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

export const listOfFinancialDetailsService = async(financialId:string)=>{
try {
    if(!financialId){
        return new ApiResponse(404,"financial id is not found",false,null)
    }
    const detail = await FinancialDetail.findOne({financialId})
    if(detail && detail._id){
        return new ApiResponse(200,"data is succefully fetched",true,detail)
    }
    const createdFd = await FinancialDetail.create({
     financialId
    })
    if(!createdFd || createdFd == null){
        return new ApiResponse(401,"error while getting financial detail",false,null)
    }
    return new ApiResponse(200, "data is successfully fetched",true,createdFd)
} catch (error) {
    return new ApiResponse(401,"error while getting financial detail",false,null)
}
}