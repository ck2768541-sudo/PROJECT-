const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/database");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const instituteRoutes = require("./routes/instituteRoutes");
const classRoutes = require("./routes/classRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const reportRoutes = require("./routes/reportRoutes");
const reportAnalyticsRoutes = require("./routes/reportAnalyticsRoutes");
const dashboardAnalyticsRoutes = require("./routes/dashboardAnalyticsRoutes");

const app = express();

connectDB();

/*
  Render jaise reverse proxy hosting par client IP ko
  correctly identify karne ke liye.
*/
app.set("trust proxy", 1);

/*
  Express technology header remove karta hai.
*/
app.disable("x-powered-by");

/*
  Common security-related HTTP headers add karta hai.
*/
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
  process.env.CUSTOM_FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman, mobile app aur server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy: Origin not allowed")
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/*
  Request body ko reasonable size tak limit karta hai.
*/
app.use(
  express.json({
    limit: "100kb",
  })
);

/*
  Login aur password-reset endpoints par repeated
  automated attempts ko limit karta hai.
*/
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again after 15 minutes.",
  },
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);
app.use("/api/auth/verify-otp", authLimiter);
app.use("/api/auth/reset-password", authLimiter);

app.get("/", (req, res) => {
  res.send("Upsthiti Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/reports", reportRoutes);

app.use(
  "/api/dashboard-analytics",
  dashboardAnalyticsRoutes
);

app.use(
  "/api/report-analytics",
  reportAnalyticsRoutes
);

/*
  Unknown API route ke liye controlled response.
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

/*
  Central production-safe error handler.
  Actual error server logs mein rahega,
  client ko internal details nahi milengi.
*/
app.use((error, req, res, next) => {
  console.error(error);

  if (
    error.message ===
    "CORS policy: Origin not allowed"
  ) {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});