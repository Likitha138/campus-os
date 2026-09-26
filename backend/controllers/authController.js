const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================================
// LOGIN USER
// POST /api/auth/login
// =====================================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user
    const [rows] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        password,
        role,
        student_id,
        department,
        semester
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = rows[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // JWT secret
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration is missing"
      });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      secret,
      {
        expiresIn: "7d"
      }
    );

    // Never send password to frontend
    delete user.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};


// =====================================================
// GET CURRENT USER
// GET /api/auth/me
// =====================================================
const getCurrentUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        student_id,
        department,
        semester,
        created_at
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch current user",
      error: error.message
    });
  }
};


module.exports = {
  loginUser,
  getCurrentUser
};