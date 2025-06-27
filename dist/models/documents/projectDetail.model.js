import { model, Schema } from "mongoose";
const projectDetailSchema = new Schema({
    projectDetailId: {
        type: Schema.Types.ObjectId,
        ref: "Doc",
    },
    buildingPermit: {
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
    commencementRegistrationNumber: {
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
    commencementCertificate: {
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
        environmentClearance: {},
        firstSafetyClearance: {},
        heightClearanceCertificate: {},
        structuralStabilityCertificate: {},
    },
});
const ProjectDetail = model("ProjectDetail", projectDetailSchema);
export { ProjectDetail };
