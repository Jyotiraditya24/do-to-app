import mongoose from "mongoose";

export default async function connection() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log("Error connection to DB", error.message);
  }
}
