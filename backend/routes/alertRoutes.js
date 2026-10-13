
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET all campus alerts
router.get("/", async (req, res, next) => {
  try {
    const [tables] = await pool.query(
      "SHOW TABLES LIKE 'alerts'"
    );

    if (tables.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Alerts table is not configured yet",
        count: 0,
        data: [],
      });
    }

    const [alerts] = await pool.query(
      "SELECT * FROM alerts ORDER BY id DESC LIMIT 100"
    );

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
