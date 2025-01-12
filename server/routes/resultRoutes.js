const express = require("express");
const Result = require("../models/resultModel");
const router = express.Router();

router.post("/result", async (req, res) => {
  try {
    const {
      studentName,
      gender,
      rollNumber,
      class: studentClass,
      parentName,
      session,
      dateOfBirth,
      marks,
    } = req.body;

    const requiredSubjects = [
      "english",
      "hindi",
      "mathematics",
      "science",
      "socialstudies",
      "sports",
    ];
    for (const subject of requiredSubjects) {
      if (!marks[subject]) {
        return res
          .status(400)
          .json({ error: `Marks for ${subject} are required.` });
      }
    }

    const newResult = new Result({
      studentName,
      gender,
      class: studentClass,
      parentName,
      session,
      dateOfBirth,
      marks,
      rollNumber,
    });

    await newResult.save();
    res.status(201).json({ message: "Result saved successfully!" });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/result", async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { studentName: { $regex: search, $options: "i" } },
          { class: { $regex: search, $options: "i" } },
          { parentName: { $regex: search, $options: "i" } },
        ],
      };
    }

    const admissions = await Result.find(filter);
    res.status(200).json(admissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch admissions" });
  }
});

router.put("/result/:id", async (req, res) => {
  try {
    const updateResult = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateResult)
      return res.status(404).json({ message: "Admission not found" });
    res.status(200).json(updateResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/result/:id", async (req, res) => {
  try {
    const deleteResult = await Result.findByIdAndDelete(req.params.id);
    if (!deleteResult)
      return res.status(404).json({ message: "Admission not found" });
    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the admission" });
  }
});
module.exports = router;
