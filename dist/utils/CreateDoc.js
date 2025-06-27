var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { documents } from "../data/index.js";
import { Doc } from "../models/documents/document.model.js";
import { ApiResponse } from "./ApiResponse.js";
export const createDocList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doclist = documents.map((doc) => ({
            userId: userId,
            docname: doc,
        }));
        const data = yield Doc.insertMany(doclist);
        console.log("list of added property data", data);
        if (!data || data == null)
            return new ApiResponse(401, "error while inserting doc", false, null);
        return data;
    }
    catch (error) {
        return new ApiResponse(501, "Interal error while add doc", false, null);
    }
});
