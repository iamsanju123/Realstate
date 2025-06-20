import { Schema, model } from "mongoose";
const userSessionSchema = new Schema({
    userSessionId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 60, // ⏱️ auto-delete after 60 seconds
    },
});
const UserSession = model("UserSession", userSessionSchema);
export { UserSession };
