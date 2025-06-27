import { Advisory, IAdvisory } from "../models/advisory.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"


export const listOfAdvisoryService = async(userId:string,page:number,limit:number)=>{
try {
    if(!userId){
        return new ApiResponse(404,"user id is not found",false,null)
    }
    const skip = (page-1)*limit
    const listOfAdvisory  = await Advisory.find().skip(skip).limit(limit)
    if(!listOfAdvisory || listOfAdvisory == null){
        return new ApiResponse(404,"error of advisroy is found ",false ,null )
    }
    
    return new ApiResponse(200,"list of advisory is successfully fetch",true, listOfAdvisory)
      
} catch (error) {
    return new ApiResponse(501,"error while show list of advisory",false,null)
}
}
export const addNewAdvisoryService = async(userId:string,adv_data:IAdvisory)=>{
try {
    if(!userId){
        return new ApiResponse(404,"user id is not found",false,null)
    }
    if(!Object.keys(adv_data).length){
         return new ApiResponse(404,"data is not found",false,null)
    }
    const addedData = await Advisory.create(adv_data)
    if(!addedData || !addedData._id){
        return new ApiResponse(404,"error when data inserting",false,null)
    }
    return new ApiResponse(201,"advisory is created",true,addedData)
} catch (error) {
    return new ApiResponse(501,"error while add new advisory",false,null)
}
}
export const updateAdvisoryService = async(advisoryId:string,data:IAdvisory)=>{
try {
    if(!advisoryId){
        return new ApiResponse(404,"advisory id is not found",false,null)
    }
    if(!Object.keys(data).length){
         return new ApiResponse(404,"updated data is not found",false,null)
    }
    const updatedAdvisory = await Advisory.findByIdAndUpdate(advisoryId,{$set:data})
    if(!updatedAdvisory || !updatedAdvisory._id){
        return new ApiResponse(404,"error when data updating advisory",false,null)
    }
    return new ApiResponse(201,"advisory is created",true,updatedAdvisory)
} catch (error) {
    return new ApiResponse(501,"error while update advisory",false,null)
}
}