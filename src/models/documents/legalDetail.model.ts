
import mongoose, { Document, model, Schema } from "mongoose";

interface ILegalDetail extends Document {
  legalDetailId: Schema.Types.ObjectId;
  legalOpinion: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  nonAgriculturalLand: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  landOccupancy: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
  noObjectionCertificate: {
    registrationNumber: string | null;
    registrationTitle: string | null;
    registrationFilePath: string | null;
  };
}

const legalDetailSchema = new Schema<ILegalDetail>({
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

const LegalDetail = model("LegalDetail",legalDetailSchema)

export {LegalDetail,ILegalDetail}





