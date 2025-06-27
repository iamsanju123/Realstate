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
const societyRegistrationNumberSchema = new Schema(registration);
export const SocietyRegistrationNumber = model("SocietyRegistrationNumber", societyRegistrationNumberSchema);
// ----------------------------------------------------------------------
const societyByLawSchema = new Schema(registration);
export const societyByLaw = model("societyByLaw", societyByLawSchema);
// ----------------------------------------------------------------------
const shareCertificateSocietySchema = new Schema(registration);
export const ShareCertificateSociety = model("ShareCertificateSociety", shareCertificateSocietySchema);
// ----------------------------------------------------------------------
const sinkingFundDetailSchema = new Schema(registration);
export const SinkingFundDetail = model("SinkingFundDetail", sinkingFundDetailSchema);
