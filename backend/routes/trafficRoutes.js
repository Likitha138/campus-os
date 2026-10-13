
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/traffic
router.get("/", async (req, res, next) => {
  try {
    const [tables] = await pool.query(
      "SHOW TABLES LIKE 'traffic'"
    );

    if (tables.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Traffic table is not configured yet",
        data: [],
      });
    }

    const [traffic] = await pool.query(
      "SELECT * FROM traffic LIMIT 100"
    );

    res.status(200).json({
      success: true,
      count: traffic.length,
      data: traffic,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
