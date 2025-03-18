import mongoose, { Error } from "mongoose";
import { MONGO_URI } from "../config/config";

export function connectMongo() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MONGO DB");
    })
    .catch((err: Error) => {
      console.log("Error connecting to MONGO DB", err);
    });
}
