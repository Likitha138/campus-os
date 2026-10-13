
const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

// GET /api/dashboard
router.get("/", async (req, res, next) => {
  try {
    const [users] = await pool.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        totalUsers: Number(users[0].total),
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
