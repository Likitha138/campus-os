const { pool } = require("../config/db");

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        name,
        email,
        role,
        student_id,
        department,
        semester
      FROM users
      ORDER BY id DESC
    `);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      errorCode: error.code || null,
      errorMessage: error.sqlMessage || error.message || null
    });
  }
};


// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        student_id,
        department,
        semester
      FROM users
      WHERE id = ?
      `,
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
    console.error("GET USER BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      errorCode: error.code || null,
      errorMessage: error.sqlMessage || error.message || null
    });
  }
};


// CREATE USER
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

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        role,
        student_id,
        department,
        semester
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
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
    console.error("=================================");
    console.error("CREATE USER ERROR");
    console.error("Error Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("SQL Message:", error.sqlMessage);
    console.error("Message:", error.message);
    console.error("=================================");

    res.status(500).json({
      success: false,
      message: "Failed to create user",
      errorCode: error.code || null,
      sqlState: error.sqlState || null,
      errorMessage: error.sqlMessage || error.message || null
    });
  }
};


// UPDATE USER
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

    const [result] = await pool.query(
      `
      UPDATE users
      SET
        name = ?,
        email = ?,
        role = ?,
        student_id = ?,
        department = ?,
        semester = ?
      WHERE id = ?
      `,
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

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      affectedRows: result.affectedRows
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
      errorCode: error.code || null,
      errorMessage: error.sqlMessage || error.message || null
    });
  }
};


// DELETE USER
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
    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      errorCode: error.code || null,
      errorMessage: error.sqlMessage || error.message || null
    });
  }
};


// EXPORT CONTROLLERS
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};