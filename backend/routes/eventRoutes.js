
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/events
router.get("/", async (req, res, next) => {
  try {
    const [events] = await pool.query(
      "SELECT * FROM events ORDER BY id DESC"
    );

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
