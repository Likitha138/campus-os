
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET all campus activities
router.get("/", async (req, res, next) => {
  try {
    const [tables] = await pool.query(
      "SHOW TABLES LIKE 'activities'"
    );

    if (tables.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Activities table is not configured yet",
        count: 0,
        data: [],
      });
    }

    const [activities] = await pool.query(
      "SELECT * FROM activities ORDER BY id DESC LIMIT 100"
    );

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
