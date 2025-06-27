import { Schema, model } from "mongoose";
const verifyOtpSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (value) {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && (value || this.contact)) {
                    return true;
                }
                else
                    false;
            },
            message: "Invalid email format",
        },
    },
    contact: {
        type: Number,
        validate: {
            validator: function (value) {
                if (value || this.email) {
                    return true;
                }
                else
                    false;
            },
            message: "Invalid email format",
        },
    },
    sendOtp: {
        type: Number,
        required: true,
    },
    exp: {
        type: Date,
        default: Date.now,
        expires: 120, // Automatically delete after 120 seconds (2 minutes)
    }
});
const VerifyOtp = model('VerifyOtp', verifyOtpSchema);
export { VerifyOtp };
