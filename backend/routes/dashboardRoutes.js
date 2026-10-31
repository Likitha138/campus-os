const express = require("express");

const {
  getDashboardOverview,
} = require("../controllers/dashboardController");

const router = express.Router();

// GET /api/dashboard
router.get("/", getDashboardOverview);

module.exports = router;