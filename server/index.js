require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const admissionRoutes = require("./routes/admissionRoutes");
const fessRoutes = require("./routes/feesRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/adminRoute");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome To HomePage");
});
app.use("/api", admissionRoutes);
app.use("/api", fessRoutes);
app.use("/api", resultRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server running on port ${PORT}`);
    console.log("Connected to DataBase");
  } catch (error) {
    console.log("Couldn't connect to DataBase", error);
  }
});
