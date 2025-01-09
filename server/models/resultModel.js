const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
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
  parentName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  marks: {
    english: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    hindi: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    mathematics: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    science: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    socialstudies: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    sports: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
});

module.exports = mongoose.model("Result", resultSchema);
