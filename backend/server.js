const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const marksRoutes = require("./routes/marksRoutes");

const { testDatabaseConnection } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus OS Backend API is running",
    version: "1.0.0",
  });
});

// ======================================
// HEALTH CHECK
// ======================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus OS API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ======================================
// USER ROUTES
// ======================================

app.use("/api/users", usersRoutes);

// ======================================
// ATTENDANCE ROUTES
// ======================================

app.use("/api/attendance", attendanceRoutes);

// ======================================
// MARKS ROUTES
// ======================================

app.use("/api/marks", marksRoutes);

// ======================================
// AUTH ROUTES
// ======================================

app.use("/api/auth", authRoutes);

// ======================================
// 404 ROUTE
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// ======================================
// ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================
// START SERVER
// ======================================

const startServer = async () => {
  try {
    await testDatabaseConnection();

    app.listen(PORT, () => {
      console.log("");
      console.log("======================================");
      console.log("          CAMPUS OS BACKEND");
      console.log("======================================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
      console.log(`❤️  http://localhost:${PORT}/api/health`);
      console.log(`👥 http://localhost:${PORT}/api/users`);
      console.log(`🔐 http://localhost:${PORT}/api/auth`);
      console.log(`📅 http://localhost:${PORT}/api/attendance`);
      console.log(`📊 http://localhost:${PORT}/api/marks`);
      console.log("======================================");
      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error("======================================");
    console.error("❌ FAILED TO START CAMPUS OS BACKEND");
    console.error("======================================");
    console.error(error);
    console.error("======================================");
  }
};

startServer();