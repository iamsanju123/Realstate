import mongoose, { Document, model, Schema } from "mongoose";

type register = {
  registrationNumber: string;
  registrationTitle: string;
  registrationFilePath: string;
};

interface IFinancialDetail extends Document {
  financialId: Schema.Types.ObjectId;
  docName: string;
  MaintenanceAgreement: register;
  StampDutyPayment: register;
  RegistrationFeeReciept: register;
}

const registration = {
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

const financialDetailSchema = new Schema({
  financialId: {
    type:Schema.Types.ObjectId,
  },
  docName:{
    type:String
  },
  BankLoanApproval: registration,
  MortageRelease: registration,
  MaintenanceAgreement: registration,
  StampDutyPayment: registration,
  RegistrationFeeReciept: registration,
});

const FinancialDetail = model("FinancialDetail", financialDetailSchema);

export { FinancialDetail,IFinancialDetail };

// // // --------------------------------------------------------------------

// const bankLoanApprovalSchema = new Schema<IFinancialDetail>(registration);

// export const BankLoanApproval = model(
//   "BankLoanApproval",
//   bankLoanApprovalSchema
// );

// // ----------------------------------------------------------------------

// const mortageReleaseSchema = new Schema<IFinancialDetail>(registration);
// export const MortageRelease = model("MortageRelease", mortageReleaseSchema);

// // // ----------------------------------------------------------------------

// const maintenanceAgreementSchema = new Schema<IFinancialDetail>(registration);

// export const MaintenanceAgreement = model(
//   "MaintenanceAgreement",
//   maintenanceAgreementSchema
// );

// // // ----------------------------------------------------------------------

// const stampDutyPaymentSchema = new Schema<IFinancialDetail>(registration);

// export const StampDutyPayment = model(
//   "StampDutyPayment",
//   stampDutyPaymentSchema
// );

// // // ----------------------------------------------------------------------

// const registrationFeeRecieptSchema = new Schema<IFinancialDetail>(registration);

// export const RegistrationFeeReciept = model(
//   "RegistrationFeeReciept",
//   registrationFeeRecieptSchema
// );
