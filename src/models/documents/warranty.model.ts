import mongoose, { Document, model, Schema } from "mongoose";

export interface IWarranty extends Document {
  maindocId: Schema.Types.ObjectId;
  registrationNumber: string;
  registrationTitle: string;
  registrationFilePath: string;
}

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

const structuralWarrantySchema = new Schema<IWarranty>(
  registration
);

export const StructuralWarranty = model(
  "StructuralWarranty",
  structuralWarrantySchema
);

// ----------------------------------------------------------------------

const fixtureAndFittingWarrantiesSchema = new Schema<IWarranty>(
  registration
);
export const fixtureAndFittingWarranties = model(
  "fixtureAndFittingWarranties",
  fixtureAndFittingWarrantiesSchema
);

// ----------------------------------------------------------------------

const applianceWarrantySchema = new Schema<IWarranty>(
  registration
);

export const ApplianceWarranty = model(
  "ApplianceWarranty",
  applianceWarrantySchema
);

// ----------------------------------------------------------------------
