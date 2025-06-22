import mongoose, { model, Schema } from "mongoose";

interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  title:string,
  message:string,
  read:boolean,
  createdAt:Date
}

const notificationSchema = new Schema<INotification>({
userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
},
title:{
    type:String,
    required:true,
},
message:{
    type:String,
},
read:{
    type:Boolean,
    default:false
},
createdAt: {
     type: Date, 
     default: Date.now 
    },

})

const Notification = model("Notification",notificationSchema)

export {Notification,INotification}