import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string
const connectToDatabase = (mongoDatabaseURI = MONGO_URI) =>
  mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
