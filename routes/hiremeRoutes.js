import express from "express";
import { v4 as uuidv4 } from "uuid";
import HireMeModel from "../models/HireMeModel.js";

const router = express.Router();

// POST

router.post("/hireme", async (req, res) => {
  try {
    const { name, phone, gender, projectType, rateType, projectDetails } =
      req.body;

    const newApplication = new HireMeModel({
      name,
      phone,
      gender,
      projectType,
      rateType,
      projectDetails,
      applicationId: uuidv4(),
    });
    await newApplication.save();

    res.status(201).json({
      applicationId: newApplication.applicationId,
      message: "Application Submitted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET

router.get("/:applicationId", async (req, res) => {
  try {
    const application = await HireMeModel.findOne({
      applicationId: req.params.applicationId,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Error Fetching data", error });
  }
});

// DELETE

router.delete("/:applicationId", async (req, res) => {
  try {
    const deletedApp = await HireMeModel.findOneAndDelete({
      applicationId: req.params.applicationId,
    });
    if (!deletedApp)
      return res.status(404).json({ message: "Application Not Found" });
    res.json({ message: "Application Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Applicayion", error });
  }
});


// PUT

router.put("/:id/response", async (req, res) => {
  try {
    const { developerResponse } = req.body;

    const application = await HireMeModel.findByIdAndUpdate(
      req.params.id,
      { developerResponse },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


// GET All Applications for admin

router.get("/", async (req, res) => {
  try {
    const allApplications = await HireMeModel.find().sort({ createdAt: -1 });
    res.json(allApplications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error", err });
  }
});



export default router;
