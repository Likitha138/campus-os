const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const createToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from backend/.env");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" }
  );
};

// POST /api/auth/student/register
const registerStudent = async (req, res) => {
  try {
    const { name, studentId, email, password } = req.body;

    if (!name?.trim() || !studentId?.trim() ||
        !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, student ID, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedStudentId = studentId.trim();

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? OR student_id = ? LIMIT 1",
      [normalizedEmail, normalizedStudentId]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This email or student ID is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      `INSERT INTO users
       (name, student_id, email, password, role)
       VALUES (?, ?, ?, ?, 'student')`,
      [
        name.trim(),
        normalizedStudentId,
        normalizedEmail,
        hashedPassword,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Student registered successfully. Please log in.",
      user: {
        id: result.insertId,
        name: name.trim(),
        studentId: normalizedStudentId,
        email: normalizedEmail,
        role: "student",
      },
    });
  } catch (error) {
    console.error("Student registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Check the users table and database configuration.",
    });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email?.trim() || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required.",
      });
    }

    if (!["student", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account role.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [rows] = await pool.query(
      `SELECT id, name, student_id, email, password, role
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [normalizedEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = rows[0];

    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `This account is not registered as ${role}.`,
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        studentId: user.student_id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed. Check the backend configuration.",
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const [rows] = await pool.query(
      `SELECT id, name, student_id, email, role
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const user = rows[0];

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        studentId: user.student_id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve account details.",
    });
  }
};

module.exports = {
  registerStudent,
  login,
  getMe,
};