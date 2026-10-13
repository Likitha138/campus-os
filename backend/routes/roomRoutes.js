
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/rooms
router.get("/", async (req, res, next) => {
  try {
    const [rooms] = await pool.query(
      "SELECT * FROM rooms ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
