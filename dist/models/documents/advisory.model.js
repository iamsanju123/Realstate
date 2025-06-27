import { model, Schema } from "mongoose";
const advisorySchema = new Schema({
    advisoryName: {
        type: String,
    },
    email: {
        type: String,
    },
    AdvisorId: {
        type: String
    },
    location: {
        type: String
    },
    contact: {
        type: Number
    },
    experience: {
        type: String
    },
    designation: {
        type: String
    },
    fees: {
        type: String,
    },
    addessCity: {
        type: String
    },
    state: {
        type: String,
    },
    pinCode: {
        type: String
    }
});
const Advisory = model('Advisory', advisorySchema);
export { Advisory };
