const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

router.post("/create", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists." });

    const newAdmin = new Admin({ email, password, role });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin.", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins.", error });
  }
});
router.delete("/all/:id", async (req, res) => {
  try {
    const deletedAdmimn = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmimn)
      return res.status(404).json({ message: "Admin details not found" });
    res.status(200).json({ message: "Admin Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the admin Record" });
  }
});

module.exports = router;
