import { model, Schema } from "mongoose";
const landDetailSchema = new Schema({
    landDetailId: {
        type: Schema.Types.ObjectId,
        ref: "Doc",
    },
    motherDeed: {
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
    approvedBuildingPlan: {
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
    landRegistryRecord: {
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
    propertyTaxReceipt: {
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
    encumbranceCertificate: {
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
    releaseCertificate: {
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
const LandDetail = model("LandDetail", landDetailSchema);
export { LandDetail };
