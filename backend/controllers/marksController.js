const { pool } = require("../config/db");

// =====================================================
// CALCULATE GRADE
// =====================================================

const calculateGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

// =====================================================
// GET ALL MARKS
// GET /api/marks
// =====================================================

const getMarks = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        marks.id,
        marks.user_id,
        users.name AS student_name,
        users.email,
        users.student_id AS student_code,
        marks.subject,
        marks.exam_type,
        marks.marks_obtained,
        marks.total_marks,
        marks.grade,
        ROUND(
          (marks.marks_obtained / marks.total_marks) * 100,
          2
        ) AS percentage,
        marks.created_at
      FROM marks
      LEFT JOIN users
        ON marks.user_id = users.id
      ORDER BY marks.id DESC
    `);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch marks"
    });
  }
};

// =====================================================
// GET MARKS BY USER
// GET /api/marks/user/:userId
// =====================================================

const getMarksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        marks.id,
        marks.user_id,
        users.name AS student_name,
        users.student_id AS student_code,
        marks.subject,
        marks.exam_type,
        marks.marks_obtained,
        marks.total_marks,
        marks.grade,
        ROUND(
          (marks.marks_obtained / marks.total_marks) * 100,
          2
        ) AS percentage,
        marks.created_at
      FROM marks
      LEFT JOIN users
        ON marks.user_id = users.id
      WHERE marks.user_id = ?
      ORDER BY marks.id DESC
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get user marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user marks"
    });
  }
};

// =====================================================
// GET MARKS SUMMARY
// GET /api/marks/summary/:userId
// =====================================================

const getMarksSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        COUNT(*) AS total_exams,
        COALESCE(SUM(marks_obtained), 0) AS total_obtained,
        COALESCE(SUM(total_marks), 0) AS total_possible,
        ROUND(
          (
            COALESCE(SUM(marks_obtained), 0)
            /
            NULLIF(COALESCE(SUM(total_marks), 0), 0)
          ) * 100,
          2
        ) AS overall_percentage
      FROM marks
      WHERE user_id = ?
      `,
      [userId]
    );

    const summary = rows[0];

    const percentage =
      Number(summary.overall_percentage) || 0;

    res.status(200).json({
      success: true,
      data: {
        user_id: Number(userId),
        total_exams: Number(summary.total_exams) || 0,
        total_obtained: Number(summary.total_obtained) || 0,
        total_possible: Number(summary.total_possible) || 0,
        overall_percentage: percentage,
        grade: calculateGrade(percentage)
      }
    });
  } catch (error) {
    console.error("Marks summary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to calculate marks summary"
    });
  }
};

// =====================================================
// CREATE MARKS
// POST /api/marks
// =====================================================

const createMarks = async (req, res) => {
  try {
    const {
      user_id,
      subject,
      exam_type,
      marks_obtained,
      total_marks
    } = req.body;

    if (
      !user_id ||
      !subject ||
      !exam_type ||
      marks_obtained === undefined ||
      total_marks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, subject, exam type, marks obtained and total marks are required"
      });
    }

    if (
      Number(marks_obtained) < 0 ||
      Number(total_marks) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Marks obtained cannot be negative and total marks must be greater than zero"
      });
    }

    if (
      Number(marks_obtained) >
      Number(total_marks)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Marks obtained cannot be greater than total marks"
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

    const percentage =
      (Number(marks_obtained) /
        Number(total_marks)) *
      100;

    const grade = calculateGrade(percentage);

    const [result] = await pool.query(
      `
      INSERT INTO marks
      (
        user_id,
        subject,
        exam_type,
        marks_obtained,
        total_marks,
        grade
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        subject,
        exam_type,
        marks_obtained,
        total_marks,
        grade
      ]
    );

    res.status(201).json({
      success: true,
      message: "Marks created successfully",
      marksId: result.insertId,
      percentage: Number(percentage.toFixed(2)),
      grade
    });
  } catch (error) {
    console.error("Create marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create marks",
      error: error.message
    });
  }
};

// =====================================================
// UPDATE MARKS
// PUT /api/marks/:id
// =====================================================

const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      exam_type,
      marks_obtained,
      total_marks
    } = req.body;

    if (
      !subject ||
      !exam_type ||
      marks_obtained === undefined ||
      total_marks === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Subject, exam type, marks obtained and total marks are required"
      });
    }

    if (
      Number(marks_obtained) < 0 ||
      Number(total_marks) <= 0 ||
      Number(marks_obtained) > Number(total_marks)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid marks values"
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM marks WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Marks record not found"
      });
    }

    const percentage =
      (Number(marks_obtained) /
        Number(total_marks)) *
      100;

    const grade = calculateGrade(percentage);

    await pool.query(
      `
      UPDATE marks
      SET
        subject = ?,
        exam_type = ?,
        marks_obtained = ?,
        total_marks = ?,
        grade = ?
      WHERE id = ?
      `,
      [
        subject,
        exam_type,
        marks_obtained,
        total_marks,
        grade,
        id
      ]
    );

    res.status(200).json({
      success: true,
      message: "Marks updated successfully",
      percentage: Number(percentage.toFixed(2)),
      grade
    });
  } catch (error) {
    console.error("Update marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update marks"
    });
  }
};

// =====================================================
// DELETE MARKS
// DELETE /api/marks/:id
// =====================================================

const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT id FROM marks WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Marks record not found"
      });
    }

    await pool.query(
      "DELETE FROM marks WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Marks deleted successfully"
    });
  } catch (error) {
    console.error("Delete marks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete marks"
    });
  }
};

module.exports = {
  getMarks,
  getMarksByUser,
  getMarksSummary,
  createMarks,
  updateMarks,
  deleteMarks
};