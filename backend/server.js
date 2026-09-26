const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");

const { testDatabaseConnection } = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.use(morgan("dev"));

// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Campus OS Backend API is running",
    version: "1.0.0",
  });
});

// ======================================
// HEALTH CHECK
// ======================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Campus OS API is healthy",
    timestamp: new Date().toISOString(),
  });
});

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
  });
});

// ======================================
// START SERVER
// ======================================

app.listen(PORT, async () => {
  console.log("");
  console.log("======================================");
  console.log("         CAMPUS OS BACKEND");
  console.log("======================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`❤️  http://localhost:${PORT}/api/health`);
  console.log("======================================");
  console.log("");

  await testDatabaseConnection();
});