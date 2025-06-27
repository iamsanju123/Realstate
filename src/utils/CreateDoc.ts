import { documents } from "../data/index.js";
import { Doc } from "../models/documents/document.model.js";
import { ApiResponse } from "./ApiResponse.js";

export const createDocList = async (userId: string) => {
  try {
    const doclist = documents.map((doc: string) => ({
      userId: userId,
      docname: doc,
    }));
    const data = await Doc.insertMany(doclist);
    console.log("list of added property data",data)
    if (!data || data == null) return new ApiResponse(401,"error while inserting doc",false,null);
    return data
  } catch (error) {
    return new ApiResponse(501, "Interal error while add doc",false,null)
  }
};

