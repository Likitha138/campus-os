const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");

// ======================================================
// EXISTING ROUTE IMPORTS
// ======================================================

const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const marksRoutes = require("./routes/marksRoutes");
const assignmentsRoutes = require("./routes/assignmentsRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");
const eventRoutes = require("./routes/eventRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const activityRoutes = require("./routes/activityRoutes");
const alertRoutes = require("./routes/alertRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// ======================================================
// APP CONFIGURATION
// ======================================================

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// ======================================================
// CORS — ALLOW FRONTEND PORTS 5173 AND 5174
// ======================================================

const allowedOrigins = new Set([
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked request from origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ======================================================
// ROOT ROUTE
// GET /
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus OS Backend API is running",
    version: "1.0.0",
    port: PORT,
  });
});

// ======================================================
// API HEALTH CHECK
// GET /api/health
// ======================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Campus OS API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ======================================================
// DATABASE HEALTH CHECK
// GET /api/health/database
// ======================================================

app.get("/api/health/database", async (req, res) => {
  try {
    await testDatabaseConnection();

    res.status(200).json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ======================================================
// EXISTING API ROUTES
// ======================================================

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/assignments", assignmentsRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/events", eventRoutes);

app.use("/api/buildings", buildingRoutes);
app.use("/api/rooms", roomRoutes);

app.use("/api/traffic", trafficRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/bookings", bookingRoutes);

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// ======================================================
// CENTRAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message?.startsWith("CORS blocked")) {
    console.warn(err.message);

    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed",
    });
  }

  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================================
// START SERVER AFTER DATABASE CHECK
// ======================================================

async function startServer() {
  try {
    const databaseConnected = await testDatabaseConnection();

    if (databaseConnected === false) {
      throw new Error("MySQL connection check returned false.");
    }

    const server = app.listen(PORT, () => {
      console.log("");
      console.log("========================================");
      console.log("          CAMPUS OS BACKEND");
      console.log("========================================");
      console.log(`Server:      http://localhost:${PORT}`);
      console.log(`Health:      http://localhost:${PORT}/api/health`);
      console.log(`DB check:    http://localhost:${PORT}/api/health/database`);
      console.log(`Users:       http://localhost:${PORT}/api/users`);
      console.log(`Auth:        http://localhost:${PORT}/api/auth`);
      console.log(`Attendance:  http://localhost:${PORT}/api/attendance`);
      console.log(`Marks:       http://localhost:${PORT}/api/marks`);
      console.log(`Assignments: http://localhost:${PORT}/api/assignments`);
      console.log(`Dashboard:   http://localhost:${PORT}/api/dashboard`);
      console.log(`Events:      http://localhost:${PORT}/api/events`);
      console.log(`Buildings:   http://localhost:${PORT}/api/buildings`);
      console.log(`Rooms:       http://localhost:${PORT}/api/rooms`);
      console.log(`Traffic:     http://localhost:${PORT}/api/traffic`);
      console.log(`Activities:  http://localhost:${PORT}/api/activities`);
      console.log(`Alerts:      http://localhost:${PORT}/api/alerts`);
      console.log(`Bookings:    http://localhost:${PORT}/api/bookings`);
      console.log("Frontend:    http://localhost:5174");
      console.log("========================================");
      console.log("");
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
        console.error("Stop the other server or choose another PORT.");
      } else {
        console.error("HTTP server error:", error);
      }

      process.exitCode = 1;
    });
  } catch (error) {
    console.error("");
    console.error("CAMPUS OS BACKEND FAILED TO START");
    console.error(error.message);
    console.error("");

    process.exitCode = 1;
  }
}

startServer();

module.exports = app;