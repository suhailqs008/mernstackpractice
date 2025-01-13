const express = require("express");
const router = express.Router();
const ContactData = require("../models/contactModel");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new ContactData({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact request submitted successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/contact", async (req, res) => {
  try {
    const contacts = await ContactData.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contact requests:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
module.exports = router;
