import { Schema, model } from "mongoose";
const docSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    docname: {
        type: String
    },
    iconlink: {
        type: String
    }
});
const Doc = model('Doc', docSchema);
export { Doc };
