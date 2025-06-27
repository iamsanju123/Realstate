import mongoose, { Document, model, Schema } from "mongoose";

export interface IUtilityServicesDetails extends Document {
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

const waterConnectionApprovalSchema = new Schema<IUtilityServicesDetails>(
  registration
);

export const WaterConnectionApproval = model(
  "WaterConnectionApproval",
  waterConnectionApprovalSchema
);

// ----------------------------------------------------------------------

const electricConnectionApprovalSchema = new Schema<IUtilityServicesDetails>(
  registration
);
export const ElectricConnectionApproval = model(
  "ElectricConnectionApproval",
  electricConnectionApprovalSchema
);

// ----------------------------------------------------------------------

const sewageApprovalConnectionSchema = new Schema<IUtilityServicesDetails>(
  registration
);

export const SewageApprovalConnection = model(
  "SewageApprovalConnection",
  sewageApprovalConnectionSchema
);

// ----------------------------------------------------------------------

const parkingAllocationApprovalSchema = new Schema<IUtilityServicesDetails>(
  registration
);

export const ParkingAllocationApproval = model(
  "ParkingAllocationApproval",
  parkingAllocationApprovalSchema
);

// ----------------------------------------------------------------------

const elevatorCertificationSchema = new Schema<IUtilityServicesDetails>(
  registration
);

export const ElevatorCertification = model(
  "ElevatorCertification",
  elevatorCertificationSchema
);