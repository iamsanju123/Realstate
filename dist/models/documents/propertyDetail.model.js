import { model, Schema } from "mongoose";
const registration = {
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Maindoc",
    },
    registrationNumber: {
        type: String,
    },
    registrationTitle: {
        type: String,
    },
    registrationFilePath: {
        type: String,
    },
};
// --------------------------------------------------------------------
const builderRegistrationNumberSchema = new Schema(registration);
const BuilderRegistrationNumber = model("BuilderRegistrationNumber", builderRegistrationNumberSchema);
// ----------------------------------------------------------------------
const companyRegistrationNumberSchema = new Schema(registration);
const CompanyRegistrationNumber = model("CompanyRegistrationNumber", companyRegistrationNumberSchema);
// ----------------------------------------------------------------------
const taxRegistrationNumberSchema = new Schema(registration);
const TaxRegistrationNumber = model("TaxRegistrationNumber", taxRegistrationNumberSchema);
export { TaxRegistrationNumber, BuilderRegistrationNumber, CompanyRegistrationNumber, };
