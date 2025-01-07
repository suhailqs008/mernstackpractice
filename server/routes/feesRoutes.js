const express = require("express");
const router = express.Router();
const Fees = require("../models/feesModel");
const mongoose = require("mongoose");

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
}

router.post("/fees", async (req, res) => {
  try {
    const newFee = new Fees(req.body);
    const savedFee = await newFee.save();
    res.status(201).json(savedFee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/fees", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const fees = await Fees.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fees records" });
  }
});

router.get("/fees/:id", validateObjectId, async (req, res) => {
  try {
    const fee = await Fees.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: "Fee record not found" });
    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the fee record" });
  }
});

router.put("/fees/:id", validateObjectId, async (req, res) => {
  try {
    const updatedFee = await Fees.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFee)
      return res.status(404).json({ message: "Fee record not found" });
    res.status(200).json(updatedFee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/fees/:id", validateObjectId, async (req, res) => {
  try {
    const deletedFee = await Fees.findByIdAndDelete(req.params.id);
    if (!deletedFee)
      return res.status(404).json({ message: "Fee record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the fee record" });
  }
});

router.get("/fees/class/:class", async (req, res) => {
  try {
    const { class: className } = req.params;
    const fees = await Fees.find({ class: className });
    if (!fees.length)
      return res
        .status(404)
        .json({ message: `No fee records found for ${className}` });
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fee records", error });
  }
});

module.exports = router;
