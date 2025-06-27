import mongoose, { Schema, Document, Model } from "mongoose";

interface IProject extends Document {
  userId: Schema.Types.ObjectId;
  projectname: string;
  Address: string;
  city: string;
  state: string;
  zipcode: number;
  status: boolean;
  location: string;
}

const projectSchema = new Schema<IProject>(
  {
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
      default: false,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export { Project, IProject };
