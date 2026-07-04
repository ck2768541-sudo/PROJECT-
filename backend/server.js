const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const instituteRoutes = require("./routes/instituteRoutes");
const classRoutes = require("./routes/classRoutes");
const studentRoutes = require("./routes/studentRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Upsthiti Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});