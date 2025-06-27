import mongoose, { Document, model, Schema } from "mongoose";

interface ILandDetail extends Document {
  landDetailId: Schema.Types.ObjectId;
  motherDeed: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  approvedBuildingPlan: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  landRegistryRecord: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  propertyTaxReceipt: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  encumbranceCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  releaseCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
}

const landDetailSchema = new Schema<ILandDetail>({
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

const LandDetail = model("LandDetail",landDetailSchema)

export {LandDetail,ILandDetail}
