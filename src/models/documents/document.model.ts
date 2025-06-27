import mongoose, { Schema,Document, model } from "mongoose";

interface IDoc extends Document {
userId:Schema.Types.ObjectId,
docname:string,
iconlink:string,
}

const docSchema = new Schema<IDoc>({
userId:{
   type:Schema.Types.ObjectId,
   ref:'User'
},
docname:{
    type:String
},
iconlink:{
  type:String
}
})
const Doc = model('Doc',docSchema)

export {IDoc,Doc}