import { model, Schema } from "mongoose";
const registration = {
    maindocId: {
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
const structuralWarrantySchema = new Schema(registration);
export const StructuralWarranty = model("StructuralWarranty", structuralWarrantySchema);
// ----------------------------------------------------------------------
const fixtureAndFittingWarrantiesSchema = new Schema(registration);
export const fixtureAndFittingWarranties = model("fixtureAndFittingWarranties", fixtureAndFittingWarrantiesSchema);
// ----------------------------------------------------------------------
const applianceWarrantySchema = new Schema(registration);
export const ApplianceWarranty = model("ApplianceWarranty", applianceWarrantySchema);
// ----------------------------------------------------------------------
