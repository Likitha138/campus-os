
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/buildings
router.get("/", async (req, res, next) => {
  try {
    const [buildings] = await pool.query(
      "SELECT * FROM buildings ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      count: buildings.length,
      data: buildings,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
