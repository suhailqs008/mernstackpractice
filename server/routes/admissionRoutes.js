const express = require("express");
const router = express.Router();
const Admission = require("../models/admissionModel");

router.post("/admission", async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    const savedAdmission = await newAdmission.save();
    res.status(201).json(savedAdmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/admission", async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? {
          $or: [
            { studentName: { $regex: search, $options: "i" } },
            { class: { $regex: search, $options: "i" } },
            { admissionDate: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const admissions = await Admission.find(filter);
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admissions" });
  }
});

router.get("/admission/:id", async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission)
      return res.status(404).json({ message: "Admission not found" });
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the admission" });
  }
});

router.put("/admission/:id", async (req, res) => {
  try {
    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAdmission)
      return res.status(404).json({ message: "Admission not found" });
    res.status(200).json(updatedAdmission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/admission/:id", async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
    if (!deletedAdmission)
      return res.status(404).json({ message: "Admission not found" });
    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the admission" });
  }
});

router.get("/admission/class/:class", async (req, res) => {
  try {
    const { class: className } = req.params;
    const admissions = await Admission.find({ class: className });
    if (admissions.length === 0)
      return res
        .status(404)
        .json({ message: `No students found in ${className}` });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

module.exports = router;
