const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");

// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        name,
        email,
        role,
        student_id,
        department,
        semester,
        created_at
       FROM users
       ORDER BY id DESC`
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

// =====================================================
// GET USER BY ID
// GET /api/users/:id
// =====================================================

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT
        id,
        name,
        email,
        role,
        student_id,
        department,
        semester,
        created_at
       FROM users
       WHERE id = ?`,
      [id]
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
    console.error("Get user by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};

// =====================================================
// CREATE USER
// POST /api/users
// =====================================================

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      student_id,
      department,
      semester
    } = req.body;

    // Required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required"
      });
    }

    // Check duplicate email
    const [existingEmail] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      `INSERT INTO users
       (
         name,
         email,
         password,
         role,
         student_id,
         department,
         semester
       )
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        role,
        student_id || null,
        department || null,
        semester || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: result.insertId
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
};

// =====================================================
// UPDATE USER
// PUT /api/users/:id
// =====================================================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      role,
      student_id,
      department,
      semester
    } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email and role are required"
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const [emailUser] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );

    if (emailUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Another user already uses this email"
      });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        `UPDATE users
         SET
           name = ?,
           email = ?,
           password = ?,
           role = ?,
           student_id = ?,
           department = ?,
           semester = ?
         WHERE id = ?`,
        [
          name,
          email,
          hashedPassword,
          role,
          student_id || null,
          department || null,
          semester || null,
          id
        ]
      );
    } else {
      await pool.query(
        `UPDATE users
         SET
           name = ?,
           email = ?,
           role = ?,
           student_id = ?,
           department = ?,
           semester = ?
         WHERE id = ?`,
        [
          name,
          email,
          role,
          student_id || null,
          department || null,
          semester || null,
          id
        ]
      );
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully"
    });
  } catch (error) {
    console.error("Update user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user"
    });
  }
};

// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      affectedRows: result.affectedRows
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};