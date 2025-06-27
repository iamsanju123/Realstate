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
const waterConnectionApprovalSchema = new Schema(registration);
export const WaterConnectionApproval = model("WaterConnectionApproval", waterConnectionApprovalSchema);
// ----------------------------------------------------------------------
const electricConnectionApprovalSchema = new Schema(registration);
export const ElectricConnectionApproval = model("ElectricConnectionApproval", electricConnectionApprovalSchema);
// ----------------------------------------------------------------------
const sewageApprovalConnectionSchema = new Schema(registration);
export const SewageApprovalConnection = model("SewageApprovalConnection", sewageApprovalConnectionSchema);
// ----------------------------------------------------------------------
const parkingAllocationApprovalSchema = new Schema(registration);
export const ParkingAllocationApproval = model("ParkingAllocationApproval", parkingAllocationApprovalSchema);
// ----------------------------------------------------------------------
const elevatorCertificationSchema = new Schema(registration);
export const ElevatorCertification = model("ElevatorCertification", elevatorCertificationSchema);
