
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET all campus bookings
router.get("/", async (req, res, next) => {
  try {
    const [tables] = await pool.query(
      "SHOW TABLES LIKE 'bookings'"
    );

    if (tables.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Bookings table is not configured yet",
        count: 0,
        data: [],
      });
    }

    const [bookings] = await pool.query(
      "SELECT * FROM bookings ORDER BY id DESC LIMIT 100"
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
