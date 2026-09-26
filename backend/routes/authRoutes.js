const express = require("express");

const {
  loginUser,
  getCurrentUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;