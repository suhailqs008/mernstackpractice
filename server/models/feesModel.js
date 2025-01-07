const mongoose = require("mongoose");
const feesSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
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
  session: {
    type: String,
    required: true,
    enum: ["2024-2025", "2025-2026", "2026-2027"],
  },
  month: {
    type: String,
    required: true,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  rollNumber: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "Online"],
  },
});

const FeesDetails = mongoose.model("FeesDetails", feesSchema);
module.exports = FeesDetails;
