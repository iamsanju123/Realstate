var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { BuilderRegistrationNumber, CompanyRegistrationNumber, TaxRegistrationNumber, } from "../../models/documents/propertyDetail.model.js";
export const listPropertiesDetailsService = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!propertyId) {
            return new ApiResponse(404, "property id is not found", false, null);
        }
        const [tax, builder, company] = yield Promise.all([
            TaxRegistrationNumber.findOne({ propertyId }),
            BuilderRegistrationNumber.findOne({ propertyId }),
            CompanyRegistrationNumber.findOne({ propertyId })
        ]);
        if (tax || tax !== null) {
            return new ApiResponse(200, "SUCCESS ", true, {
                TaxRegistrationNumber: tax,
                BuilderRegistrationNumber: builder,
                CompanyRegistrationNumber: company
            });
        }
        const data = null;
        if (!data || data == null) {
            const session = yield mongoose.startSession();
            try {
                session.startTransaction();
                const taxRegistrationNumber = yield TaxRegistrationNumber.create([
                    {
                        propertyId,
                    },
                ], { session });
                const builderRegistrationNumber = yield BuilderRegistrationNumber.create([
                    {
                        propertyId,
                    },
                ], { session });
                const companyRegistrationNumber = yield CompanyRegistrationNumber.create([
                    {
                        propertyId,
                    },
                ], { session });
                yield session.commitTransaction();
                return new ApiResponse(200, "fetched succesfully", true, {
                    taxRegistrationNumber,
                    companyRegistrationNumber,
                    builderRegistrationNumber
                });
            }
            catch (err) {
                yield session.abortTransaction();
                session.endSession();
                return new ApiResponse(401, "error while creating list of propeties detail", false, null);
            }
        }
        return new ApiResponse(501, "Internal error while fetching details and list of properties", false, null);
    }
    catch (error) {
        return new ApiResponse(404, "error while fetching list of properties", false, null);
    }
});
