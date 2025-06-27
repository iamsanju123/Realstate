import mongoose, { Document, model, Schema } from "mongoose";

interface IPropertyDetail extends Document {
  propertyId: Schema.Types.ObjectId;
  registrationNumber: string;
  registrationTitle: string;
  registrationFilePath: string;
}

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

const builderRegistrationNumberSchema = new Schema<IPropertyDetail>(
  registration
);

const BuilderRegistrationNumber = model(
  "BuilderRegistrationNumber",
  builderRegistrationNumberSchema
);

// ----------------------------------------------------------------------

const companyRegistrationNumberSchema = new Schema<IPropertyDetail>(
  registration
);
const CompanyRegistrationNumber = model(
  "CompanyRegistrationNumber",
  companyRegistrationNumberSchema
);

// ----------------------------------------------------------------------

const taxRegistrationNumberSchema = new Schema<IPropertyDetail>(
  registration
);

const TaxRegistrationNumber = model(
  "TaxRegistrationNumber",
  taxRegistrationNumberSchema
);

export {
  IPropertyDetail,
  TaxRegistrationNumber,
  BuilderRegistrationNumber,
  CompanyRegistrationNumber,
};
