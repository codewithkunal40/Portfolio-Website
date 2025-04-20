import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import hiremeRoutes from "./routes/hiremeRoutes.js";

dotenv.config({});
           
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",hiremeRoutes);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(3000, () => console.log(`Server Running on port ${PORT}`));
