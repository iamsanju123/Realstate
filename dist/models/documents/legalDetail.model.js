import { model, Schema } from "mongoose";
const legalDetailSchema = new Schema({
    legalDetailId: {
        type: Schema.Types.ObjectId,
        ref: "Doc",
    },
    legalOpinion: {
        registrationNumber: {
            type: String,
            default: null,
        },
        registrationTitle: {
            type: String,
            default: null,
        },
        registrationFilePath: {
            type: String,
            default: null,
        },
    },
    nonAgriculturalLand: {
        registrationNumber: {
            type: String,
            default: null,
        },
        registrationTitle: {
            type: String,
            default: null,
        },
        registrationFilePath: {
            type: String,
            default: null,
        },
    },
    landOccupancy: {
        registrationNumber: {
            type: String,
            default: null,
        },
        registrationTitle: {
            type: String,
            default: null,
        },
        registrationFilePath: {
            type: String,
            default: null,
        },
    },
    noObjectionCertificate: {
        registrationNumber: {
            type: String,
            default: null,
        },
        registrationTitle: {
            type: String,
            default: null,
        },
        registrationFilePath: {
            type: String,
            default: null,
        },
    },
});
const LegalDetail = model("LegalDetail", legalDetailSchema);
export { LegalDetail };
