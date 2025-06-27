import { Schema, model } from "mongoose";
const maindocSchema = new Schema({
    docname: {
        type: String
    }
});
const Maindoc = model('Maindoc', maindocSchema);
export { Maindoc };
