var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
// import {pool} from './db/mysql.db.js'
dotenv.config({
    path: "./.env",
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("mongodb is connected");
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    });
}
main()
    .then(() => {
    app.listen(5500, () => {
        console.log("server is lisetn");
    });
})
    .catch((err) => {
    console.log("err", err);
});
