const { pool } = require("../config/db");

// ======================================================
// GET DASHBOARD OVERVIEW
// GET /api/dashboard
// ======================================================

const getDashboardOverview = async (req, res) => {
  try {
    const [
      [buildingRows],
      [roomRows],
      [studentRows],
      [eventRows],
      [attendanceRows],
      [marksRows],
      [assignmentRows],
      [activityRows],
      [trafficRows],
      [alertRows],
    ] = await Promise.all([
      // Total campus buildings
      pool.query(`
        SELECT COUNT(*) AS total
        FROM buildings
      `),

      // Total campus rooms
      pool.query(`
        SELECT COUNT(*) AS total
        FROM rooms
      `),

      // Registered students
      pool.query(`
        SELECT COUNT(*) AS total
        FROM users
        WHERE role = 'student'
      `),

      // Events scheduled for today
      pool.query(`
        SELECT COUNT(*) AS total
        FROM events
        WHERE event_date = CURDATE()
      `),

      // Today's attendance
      pool.query(`
        SELECT
          COUNT(*) AS total_classes,
          SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present,
          SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent,
          SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS late
        FROM attendance
        WHERE attendance_date = CURDATE()
      `),

      // Overall marks performance
      pool.query(`
        SELECT
          COUNT(*) AS total_exams,
          COALESCE(SUM(marks_obtained), 0) AS total_obtained,
          COALESCE(SUM(total_marks), 0) AS total_possible,
          COALESCE(
            ROUND(
              SUM(marks_obtained) * 100 /
              NULLIF(SUM(total_marks), 0),
              2
            ),
            0
          ) AS average_percentage
        FROM marks
      `),

      // Pending assignments
      pool.query(`
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END) AS submitted,
          SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) AS overdue
        FROM assignments
      `),

      // Latest recorded campus activity
      pool.query(`
        SELECT
          activity_type,
          location,
          student_count,
          faculty_count,
          visitor_count,
          recorded_at
        FROM campus_activity
        ORDER BY recorded_at DESC
        LIMIT 1
      `),

      // Latest traffic information
      pool.query(`
        SELECT
          road_name,
          zone,
          vehicle_count,
          average_speed,
          traffic_level,
          recorded_at
        FROM traffic
        ORDER BY recorded_at DESC
        LIMIT 1
      `),

      // Unread alerts
      pool.query(`
        SELECT COUNT(*) AS total
        FROM alerts
        WHERE is_read = 0
      `),
    ]);

    const attendance = attendanceRows[0] || {};
    const marks = marksRows[0] || {};
    const assignments = assignmentRows[0] || {};
    const activity = activityRows[0] || null;
    const traffic = trafficRows[0] || null;

    const totalAttendance = Number(attendance.total_classes || 0);
    const presentAttendance = Number(attendance.present || 0);

    const attendancePercentage =
      totalAttendance > 0
        ? Number(((presentAttendance / totalAttendance) * 100).toFixed(2))
        : 0;

    const dashboardData = {
      // Main campus statistics
      buildings: Number(buildingRows[0].total || 0),
      rooms: Number(roomRows[0].total || 0),
      students: Number(studentRows[0].total || 0),
      eventsToday: Number(eventRows[0].total || 0),

      // Simulation values until actual sensor data is available
      occupancy: 63,
      airQuality: {
        value: 42,
        status: "Good",
      },

      // Latest traffic information
      traffic: traffic?.traffic_level || "Moderate",
      trafficDetails: traffic
        ? {
            roadName: traffic.road_name,
            zone: traffic.zone,
            vehicleCount: Number(traffic.vehicle_count || 0),
            averageSpeed: Number(traffic.average_speed || 0),
            level: traffic.traffic_level,
            recordedAt: traffic.recorded_at,
          }
        : null,

      // Attendance overview
      attendance: {
        totalClasses: totalAttendance,
        present: presentAttendance,
        absent: Number(attendance.absent || 0),
        late: Number(attendance.late || 0),
        percentage: attendancePercentage,
      },

      // Academic performance
      academic: {
        totalExams: Number(marks.total_exams || 0),
        totalObtained: Number(marks.total_obtained || 0),
        totalPossible: Number(marks.total_possible || 0),
        averagePercentage: Number(marks.average_percentage || 0),
      },

      // Assignment overview
      assignments: {
        total: Number(assignments.total || 0),
        pending: Number(assignments.pending || 0),
        submitted: Number(assignments.submitted || 0),
        overdue: Number(assignments.overdue || 0),
      },

      // Latest campus activity
      latestActivity: activity
        ? {
            type: activity.activity_type,
            location: activity.location,
            students: Number(activity.student_count || 0),
            faculty: Number(activity.faculty_count || 0),
            visitors: Number(activity.visitor_count || 0),
            recordedAt: activity.recorded_at,
          }
        : null,

      // Alerts
      unreadAlerts: Number(alertRows[0].total || 0),

      // Data source information
      dataSource: {
        campusStatistics: "database",
        attendance: "database",
        academic: "database",
        assignments: "database",
        traffic: traffic ? "database" : "simulation fallback",
        occupancy: "simulation",
        airQuality: "simulation",
      },
    };

    return res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard information",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardOverview,
};