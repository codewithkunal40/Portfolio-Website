import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected Successfully");
  } catch {
    console.log("Error Occured");
  }
};

export default connectDB;
