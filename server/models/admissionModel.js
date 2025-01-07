const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentName: { type: String, required: true },
  gender: { type: String, required: true },
  class: {
    type: String,
    required: true,
    enum: [
      "class-1",
      "class-2",
      "class-3",
      "class-4",
      "class-5",
      "class-6",
      "class-7",
      "class-8",
      "class-9",
      "class-10",
    ],
  },
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  admissionDate: { type: Date, required: true },
  session: {
    type: String,
    required: true,
    enum: ["2024-2025", "2025-2026", "2026-2027"],
  },
  aadharNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]{12}$/.test(value),
      message: "Aadhar number must be a 12-digit numeric value.",
    },
  },
  panNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value),
      message: "PAN number must be in the correct format (e.g., ABCDE1234F).",
    },
  },
  studentId: {
    type: String,
    required: true,
    default: () => `1${uuidv4().replace(/-/g, "").slice(0, 5)}`,
  },
});

const AdmissionDetails = mongoose.model("AdmissionDetails", admissionSchema);

module.exports = AdmissionDetails;
