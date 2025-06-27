import mongoose, { Document, model, Schema } from "mongoose";

export interface ISocietyAssociation extends Document {
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

const societyRegistrationNumberSchema = new Schema<ISocietyAssociation>(
  registration
);

export const SocietyRegistrationNumber = model(
  "SocietyRegistrationNumber",
  societyRegistrationNumberSchema
);

// ----------------------------------------------------------------------

const societyByLawSchema = new Schema<ISocietyAssociation>(
  registration
);
export const societyByLaw = model(
  "societyByLaw",
  societyByLawSchema
);

// ----------------------------------------------------------------------

const shareCertificateSocietySchema = new Schema<ISocietyAssociation>(
  registration
);

export const ShareCertificateSociety = model(
  "ShareCertificateSociety",
  shareCertificateSocietySchema
);

// ----------------------------------------------------------------------

const sinkingFundDetailSchema = new Schema<ISocietyAssociation>(
  registration
);

export const SinkingFundDetail = model(
  "SinkingFundDetail",
  sinkingFundDetailSchema
);
