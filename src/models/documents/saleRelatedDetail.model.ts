import mongoose, { Document, model, Schema } from "mongoose";

type register = {
  registrationNumber: string;
  registrationTitle: string;
  registrationFilePath: string;
};

interface ISalesDetail extends Document {
  salesId: Schema.Types.ObjectId;
  docName: string;
  contract:register,
  paymentSchedule: register,
  possesionLater: register,
  allotmentLater: register,
  floorPlan: register,
  builtUpAreaStatement: register,
  specificationList:register,
}

let registration = {
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

const salesDetailSchema = new Schema<ISalesDetail>({
  salesId: {
    type:Schema.Types.ObjectId,
  },
  docName:{
    type:String
  },
  contract:registration,
  paymentSchedule: registration,
  possesionLater: registration,
  allotmentLater: registration,
  floorPlan: registration,
  builtUpAreaStatement: registration,
  specificationList:registration,
});

const SalesDetail = model("SalesDetail",salesDetailSchema)

export {SalesDetail,ISalesDetail}


// // --------------------------------------------------------------------

// const contractSchema = new Schema<ISales>(
//   registration
// );

// export const Contract = model(
//   "Contract",
//   contractSchema
// );

// // ----------------------------------------------------------------------

// const paymentScheduleSchema = new Schema<ISales>(
//   registration
// );
// export const paymentSchedule = model(
//   "PaymentSchedule",
//   paymentScheduleSchema
// );

// // ----------------------------------------------------------------------

// const possesionLaterSchema = new Schema<ISales>(
//   registration
// );

// export const PossesionLater = model(
//   "possesionLater",
//   possesionLaterSchema
// );

// // ----------------------------------------------------------------------

// const allotmentLaterSchema = new Schema<ISales>(
//   registration
// );

// export const AllotmentLater = model(
//   "AllotmentLater",
//   allotmentLaterSchema
// );

// // ----------------------------------------------------------------------

// const floorPlanSchema = new Schema<ISales>(
//   registration
// );

// export const FloorPlan = model(
//   "FloorPlan",
//   floorPlanSchema
// );

// // ----------------------------------------------------------------------

// const builtUpAreaStatementSchema = new Schema<ISales>(
//   registration
// );

// export const BuiltUpAreaStatement = model(
//   "BuiltUpAreaStatement",
//   builtUpAreaStatementSchema
// );

// // ----------------------------------------------------------------------

// const specificationListSchema = new Schema<ISales>(
//   registration
// );

// export const SpecificationList = model(
//   "SpecificationList",
//   specificationListSchema
// );

// // ----------------------------------------------------------------------