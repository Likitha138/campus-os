const { pool } = require("../config/db");

// GET all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, role, student_id, department, semester
       FROM users
       ORDER BY id DESC`
    );

    res.json({
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

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT id, name, email, role, student_id, department, semester
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

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};

// CREATE user
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
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

    const [result] = await pool.query(
      `INSERT INTO users
       (name, email, role, student_id, department, semester)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
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

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      role,
      student_id,
      department,
      semester
    } = req.body;

    const [result] = await pool.query(
      `UPDATE users
       SET name = ?,
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

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
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

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};