import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema({
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   // required:true
    // },
    projectname: {
        type: String,
        //   required: true,
        trim: true,
        // lowercase: true,
        // maxlength: 20,
    },
    Address: {
        type: String,
        //   required: true,
    },
    city: {
        type: String,
        //   required: true,
    },
    state: {
        type: String,
        //   required: true,
    },
    zipcode: {
        type: Number,
        //   required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
const Project = mongoose.model("Project", projectSchema);
export { Project };
