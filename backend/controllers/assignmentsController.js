const { pool } = require("../config/db");

// =====================================================
// GET ALL ASSIGNMENTS
// GET /api/assignments
// =====================================================

const getAssignments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        assignments.id,
        assignments.user_id,
        users.name AS student_name,
        users.email,
        users.student_id AS student_code,
        assignments.subject,
        assignments.title,
        assignments.description,
        assignments.due_date,
        assignments.status,
        assignments.submitted_at,
        assignments.created_at
      FROM assignments
      LEFT JOIN users
        ON assignments.user_id = users.id
      ORDER BY assignments.due_date ASC, assignments.id DESC
    `);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get assignments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments"
    });
  }
};

// =====================================================
// GET ASSIGNMENTS BY USER
// GET /api/assignments/user/:userId
// =====================================================

const getAssignmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        assignments.id,
        assignments.user_id,
        users.name AS student_name,
        users.student_id AS student_code,
        assignments.subject,
        assignments.title,
        assignments.description,
        assignments.due_date,
        assignments.status,
        assignments.submitted_at,
        assignments.created_at
      FROM assignments
      LEFT JOIN users
        ON assignments.user_id = users.id
      WHERE assignments.user_id = ?
      ORDER BY assignments.due_date ASC, assignments.id DESC
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get user assignments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user assignments"
    });
  }
};

// =====================================================
// GET ASSIGNMENT BY ID
// GET /api/assignments/:id
// =====================================================

const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        assignments.id,
        assignments.user_id,
        users.name AS student_name,
        users.email,
        users.student_id AS student_code,
        assignments.subject,
        assignments.title,
        assignments.description,
        assignments.due_date,
        assignments.status,
        assignments.submitted_at,
        assignments.created_at
      FROM assignments
      LEFT JOIN users
        ON assignments.user_id = users.id
      WHERE assignments.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error("Get assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch assignment"
    });
  }
};

// =====================================================
// CREATE ASSIGNMENT
// POST /api/assignments
// =====================================================

const createAssignment = async (req, res) => {
  try {
    const {
      user_id,
      subject,
      title,
      description,
      due_date,
      status
    } = req.body;

    if (
      !user_id ||
      !subject ||
      !title ||
      !due_date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, subject, title and due date are required"
      });
    }

    const allowedStatuses = [
      "pending",
      "submitted",
      "overdue"
    ];

    const assignmentStatus = status || "pending";

    if (!allowedStatuses.includes(assignmentStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be pending, submitted or overdue"
      });
    }

    // Check user
    const [user] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO assignments
      (
        user_id,
        subject,
        title,
        description,
        due_date,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        subject,
        title,
        description || null,
        due_date,
        assignmentStatus
      ]
    );

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignmentId: result.insertId
    });
  } catch (error) {
    console.error("Create assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create assignment",
      error: error.message
    });
  }
};

// =====================================================
// UPDATE ASSIGNMENT
// PUT /api/assignments/:id
// =====================================================

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      title,
      description,
      due_date,
      status
    } = req.body;

    if (
      !subject ||
      !title ||
      !due_date ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Subject, title, due date and status are required"
      });
    }

    const allowedStatuses = [
      "pending",
      "submitted",
      "overdue"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be pending, submitted or overdue"
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM assignments WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    await pool.query(
      `
      UPDATE assignments
      SET
        subject = ?,
        title = ?,
        description = ?,
        due_date = ?,
        status = ?
      WHERE id = ?
      `,
      [
        subject,
        title,
        description || null,
        due_date,
        status,
        id
      ]
    );

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully"
    });
  } catch (error) {
    console.error("Update assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update assignment"
    });
  }
};

// =====================================================
// SUBMIT ASSIGNMENT
// PATCH /api/assignments/:id/submit
// =====================================================

const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT id FROM assignments WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    await pool.query(
      `
      UPDATE assignments
      SET
        status = 'submitted',
        submitted_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Assignment submitted successfully"
    });
  } catch (error) {
    console.error("Submit assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit assignment"
    });
  }
};

// =====================================================
// DELETE ASSIGNMENT
// DELETE /api/assignments/:id
// =====================================================

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT id FROM assignments WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found"
      });
    }

    await pool.query(
      "DELETE FROM assignments WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully"
    });
  } catch (error) {
    console.error("Delete assignment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete assignment"
    });
  }
};

module.exports = {
  getAssignments,
  getAssignmentsByUser,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  submitAssignment,
  deleteAssignment
};