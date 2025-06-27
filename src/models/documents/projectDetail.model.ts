import mongoose, { Document, model, Schema } from "mongoose";

interface IProjectDetail extends Document {
  projectDetailId: Schema.Types.ObjectId;
  buildingPermit: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  approvedBuildingPlan: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  commencementRegistrationNumber: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  commencementCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  environmentClearance: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  firstSafetyClearance: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  heightClearanceCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  structuralStabilityCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
}

const projectDetailSchema = new Schema<IProjectDetail>({
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

export { ProjectDetail, IProjectDetail };
