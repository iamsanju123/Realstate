import { ProjectDetail } from "../../models/documents/projectDetail.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const listOfProjectDetailService =async(projectDetailId:string)=>{
    try {
    if (!projectDetailId) {
      return new ApiResponse(404, "land detail Id is not found", false, null);
    }
    const projectData = await ProjectDetail.findOne({
      projectDetailId: projectDetailId,
    });
    if (projectData && projectData._id) {
      return new ApiResponse(
        200,
        "data is successfully fetched",
        true,
        projectData
      );
    }
    const createProjectData = await ProjectDetail.create({
      projectDetailId: projectDetailId,
    });
    if (createProjectData) {
      return new ApiResponse(200, "data is success", true, createProjectData);
    }
  } catch (error) {
    return new ApiResponse(401, "error while data fetched", false, null);
  }
}