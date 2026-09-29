const { pool } = require("../config/db");

// =====================================================
// GET ALL ATTENDANCE
// GET /api/attendance
// =====================================================

const getAttendance = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        attendance.id,
        attendance.user_id,
        users.name AS student_name,
        users.email,
        users.student_id AS student_code,
        attendance.subject,
        attendance.attendance_date,
        attendance.status,
        attendance.created_at
      FROM attendance
      LEFT JOIN users
        ON attendance.user_id = users.id
      ORDER BY attendance.attendance_date DESC, attendance.id DESC
    `);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance"
    });
  }
};

// =====================================================
// GET ATTENDANCE BY USER
// GET /api/attendance/user/:userId
// =====================================================

const getAttendanceByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        attendance.id,
        attendance.user_id,
        users.name AS student_name,
        users.email,
        users.student_id AS student_code,
        attendance.subject,
        attendance.attendance_date,
        attendance.status,
        attendance.created_at
      FROM attendance
      LEFT JOIN users
        ON attendance.user_id = users.id
      WHERE attendance.user_id = ?
      ORDER BY attendance.attendance_date DESC, attendance.id DESC
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error("Get user attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user attendance"
    });
  }
};

// =====================================================
// GET ATTENDANCE SUMMARY
// GET /api/attendance/summary/:userId
// =====================================================

const getAttendanceSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        COUNT(*) AS total_classes,
        SUM(status = 'present') AS present_classes,
        SUM(status = 'absent') AS absent_classes,
        SUM(status = 'late') AS late_classes
      FROM attendance
      WHERE user_id = ?
      `,
      [userId]
    );

    const summary = rows[0];

    const totalClasses = Number(summary.total_classes) || 0;
    const presentClasses = Number(summary.present_classes) || 0;
    const absentClasses = Number(summary.absent_classes) || 0;
    const lateClasses = Number(summary.late_classes) || 0;

    const attendancePercentage =
      totalClasses === 0
        ? 0
        : (presentClasses / totalClasses) * 100;

    let attendanceStatus = "Good";

    if (attendancePercentage < 75 && attendancePercentage >= 60) {
      attendanceStatus = "Warning";
    } else if (attendancePercentage < 60) {
      attendanceStatus = "Critical";
    }

    res.status(200).json({
      success: true,
      data: {
        user_id: Number(userId),
        total_classes: totalClasses,
        present_classes: presentClasses,
        absent_classes: absentClasses,
        late_classes: lateClasses,
        attendance_percentage: Number(
          attendancePercentage.toFixed(2)
        ),
        status: attendanceStatus
      }
    });
  } catch (error) {
    console.error("Attendance summary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to calculate attendance summary"
    });
  }
};

// =====================================================
// CREATE ATTENDANCE
// POST /api/attendance
// =====================================================

const createAttendance = async (req, res) => {
  try {
    const {
      user_id,
      subject,
      attendance_date,
      status
    } = req.body;

    if (
      !user_id ||
      !subject ||
      !attendance_date ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "User ID, subject, attendance date and status are required"
      });
    }

    const allowedStatuses = [
      "present",
      "absent",
      "late"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be present, absent or late"
      });
    }

    // Check whether user exists
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
      INSERT INTO attendance
      (
        user_id,
        subject,
        attendance_date,
        status
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        user_id,
        subject,
        attendance_date,
        status
      ]
    );

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendanceId: result.insertId
    });
  } catch (error) {
    console.error("Create attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create attendance",
      error: error.message
    });
  }
};

// =====================================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// =====================================================

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      subject,
      attendance_date,
      status
    } = req.body;

    if (
      !subject ||
      !attendance_date ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Subject, attendance date and status are required"
      });
    }

    const allowedStatuses = [
      "present",
      "absent",
      "late"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be present, absent or late"
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM attendance WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found"
      });
    }

    await pool.query(
      `
      UPDATE attendance
      SET
        subject = ?,
        attendance_date = ?,
        status = ?
      WHERE id = ?
      `,
      [
        subject,
        attendance_date,
        status,
        id
      ]
    );

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully"
    });
  } catch (error) {
    console.error("Update attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update attendance"
    });
  }
};

// =====================================================
// DELETE ATTENDANCE
// DELETE /api/attendance/:id
// =====================================================

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      "SELECT id FROM attendance WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found"
      });
    }

    await pool.query(
      "DELETE FROM attendance WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully"
    });
  } catch (error) {
    console.error("Delete attendance error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete attendance"
    });
  }
};

module.exports = {
  getAttendance,
  getAttendanceByUser,
  getAttendanceSummary,
  createAttendance,
  updateAttendance,
  deleteAttendance
};