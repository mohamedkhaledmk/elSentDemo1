import mongoose from "mongoose";

import "../models/bid.model.js";
import "../models/city.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.error("err", error);
    throw error;
  }
};

export default connectDB;
