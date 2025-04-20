import mongoose from "mongoose";

const hireMeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    projectType: { type: String, required: true },
    rateType: { type: String, required: true },
    projectDetails: { type: String, required: true },
    applicationId: { type: String, unique: true, required: true },
    developerResponse : {type: String , default : " "},
  },
  { timestamps: true }
);

export default mongoose.model("hireMe", hireMeSchema);
