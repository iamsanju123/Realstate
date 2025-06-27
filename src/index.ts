import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

async function main() {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log("mongodb is connected");
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
