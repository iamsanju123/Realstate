import mongoose from "mongoose";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {
  BuilderRegistrationNumber,
  CompanyRegistrationNumber,
  TaxRegistrationNumber,
} from "../../models/documents/propertyDetail.model.js";

export const listPropertiesDetailsService = async (propertyId: string) => {
  try {
    if (!propertyId) {
      return new ApiResponse(404, "property id is not found", false, null);
    }

    const [tax, builder, company] = await Promise.all([
      TaxRegistrationNumber.findOne({ propertyId }),
      BuilderRegistrationNumber.findOne({ propertyId }),
      CompanyRegistrationNumber.findOne({ propertyId })
    ]);
    if(tax || tax !== null){
      return new ApiResponse(200,"SUCCESS ",true,{
        TaxRegistrationNumber:tax,
        BuilderRegistrationNumber:builder,
        CompanyRegistrationNumber:company
      })
    }   
    const data = null;
    if (!data || data == null) {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();

        const taxRegistrationNumber = await TaxRegistrationNumber.create(
          [
            {
              propertyId,
            },
          ],
          { session }
        );

        const builderRegistrationNumber =
          await BuilderRegistrationNumber.create(
            [
              {
                propertyId,
              },
            ],
            { session }
          );

        const companyRegistrationNumber =
          await CompanyRegistrationNumber.create(
            [
              {
                propertyId,
              },
            ],
            { session }
          );

        await session.commitTransaction();
        return new ApiResponse(200, "fetched succesfully", true, {
            taxRegistrationNumber,
            companyRegistrationNumber,
            builderRegistrationNumber
        });
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return new ApiResponse(
          401,
          "error while creating list of propeties detail",
          false,
          null
        );
      }
    }
    return new ApiResponse(
      501,
      "Internal error while fetching details and list of properties",
      false,
      null
    );
  } catch (error) {
    return new ApiResponse(
      404,
      "error while fetching list of properties",
      false,
      null
    );
  }
};
