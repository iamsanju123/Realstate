import mongoose, { model, Schema } from "mongoose";

import { Document } from 'mongoose';

 interface IAdvisory extends Document {
  advisoryName?: string;
  email?: string;
  AdvisorId?: string;
  location?: string;
  contact?: number;
  experience?: string;
  designation?: string;
  fees?: string;
  addessCity?: string;
  state?: string;
  pinCode?: number;
}

    
const advisorySchema = new Schema<IAdvisory>({
    advisoryName:{
        type:String,
    },
    email:{
        type:String,
    },
    AdvisorId:{
        type:String
    },
    location:{
        type:String
    },
    contact:{
        type:Number
    },
    experience:{
        type:String
    },
    designation:{
        type:String
    },
    fees:{
        type:String,
    },
    addessCity:{
        type:String
    },
    state:{
       type:String, 
    },          
    pinCode:{
        type:Number
    }
})

const Advisory = model('Advisory',advisorySchema)

export {Advisory,IAdvisory}