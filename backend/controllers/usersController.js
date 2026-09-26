const { pool } = require("../config/db");

// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================
const getUsers = async (req, res) => {
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
      ORDER BY id DESC
      `
    );

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
      error: error.message
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
      error: error.message
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

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required"
      });
    }

    // Validate role
    const allowedRoles = ["student", "faculty", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be student, faculty or admin"
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

    // Check duplicate student ID if provided
    if (student_id) {
      const [existingStudent] = await pool.query(
        "SELECT id FROM users WHERE student_id = ?",
        [student_id]
      );

      if (existingStudent.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User with this student ID already exists"
        });
      }
    }

    // Insert user
    const [result] = await pool.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role,
        student_id,
        department,
        semester
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        email,
        password,
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
    console.error("====================================");
    console.error("CREATE USER ERROR");
    console.error("Error Code:", error.code);
    console.error("SQL State:", error.sqlState);
    console.error("SQL Message:", error.sqlMessage);
    console.error("Message:", error.message);
    console.error("====================================");

    res.status(500).json({
      success: false,
      message: "Failed to create user",
      errorCode: error.code || null,
      errorMessage: error.sqlMessage || error.message || null
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

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email and role are required"
      });
    }

    // Validate role
    const allowedRoles = ["student", "faculty", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be student, faculty or admin"
      });
    }

    // Check user exists
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

    // Check duplicate email
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

    // Check duplicate student ID
    if (student_id) {
      const [studentUser] = await pool.query(
        "SELECT id FROM users WHERE student_id = ? AND id != ?",
        [student_id, id]
      );

      if (studentUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Another user already uses this student ID"
        });
      }
    }

    let result;

    // If password is provided, update password too
    if (password) {
      [result] = await pool.query(
        `
        UPDATE users
        SET
          name = ?,
          email = ?,
          password = ?,
          role = ?,
          student_id = ?,
          department = ?,
          semester = ?
        WHERE id = ?
        `,
        [
          name,
          email,
          password,
          role,
          student_id || null,
          department || null,
          semester || null,
          id
        ]
      );
    } else {
      // Keep existing password
      [result] = await pool.query(
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
    }

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


// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check user exists
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

    // Delete user
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


// =====================================================
// EXPORT ALL CONTROLLERS
// =====================================================
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};