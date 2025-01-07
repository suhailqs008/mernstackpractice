const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
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
});

const AdmissionDetails = mongoose.model("AdmissionDetails", admissionSchema);

module.exports = AdmissionDetails;
