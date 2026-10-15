
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");

// ======================================
// ROUTE IMPORTS
// ======================================

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

// ======================================
// APP CONFIGURATION
// ======================================

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
// API ROUTES
// Keep these BEFORE the 404 handler
// ======================================

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

// ======================================
// 404 HANDLER
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

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ======================================
// START SERVER
// ======================================

async function startServer() {
  try {
    await testDatabaseConnection();

    app.listen(PORT, () => {
      console.log("");
      console.log("======================================");
      console.log("          CAMPUS OS BACKEND");
      console.log("======================================");
      console.log(`Server:     http://localhost:${PORT}`);
      console.log(`Health:     http://localhost:${PORT}/api/health`);
      console.log(`Users:      http://localhost:${PORT}/api/users`);
      console.log(`Auth:       http://localhost:${PORT}/api/auth`);
      console.log(`Attendance: http://localhost:${PORT}/api/attendance`);
      console.log(`Marks:      http://localhost:${PORT}/api/marks`);
      console.log(`Assignments: http://localhost:${PORT}/api/assignments`);
      console.log(`Dashboard:  http://localhost:${PORT}/api/dashboard`);
      console.log(`Events:     http://localhost:${PORT}/api/events`);
      console.log(`Buildings:  http://localhost:${PORT}/api/buildings`);
      console.log(`Rooms:      http://localhost:${PORT}/api/rooms`);
      console.log(`Traffic:    http://localhost:${PORT}/api/traffic`);
      console.log("======================================");
      console.log("");
    });
  } catch (error) {
    console.error("Failed to start Campus OS backend:", error);
    process.exitCode = 1;
  }
}

startServer();
