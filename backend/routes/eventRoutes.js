// backend/routes/eventRoutes.js

const express = require("express");
const { pool } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ======================================================
// AUTHORIZATION HELPERS
// ======================================================

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access is required.",
    });
  }

  next();
};

const requireStudent = (req, res, next) => {
  if (req.user?.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only students can submit event responses.",
    });
  }

  next();
};

// ======================================================
// DATE/TIME HELPERS
// ======================================================

function formatDate(value) {
  if (!value) return "";

  // MySQL DATE values are commonly returned as YYYY-MM-DD strings.
  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return String(value).slice(0, 10);
}

function formatTime(value) {
  if (!value) return "";
  return String(value).slice(0, 5);
}

function formatEvent(event) {
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);

  return {
    id: event.id,
    title: event.title,
    description: event.description || "",
    date: formatDate(event.event_date),
    time:
      startTime && endTime
        ? `${startTime} - ${endTime}`
        : startTime,
    startTime,
    endTime,
    location: event.location || "",
    category: event.event_type || "Campus",
    eventType: event.event_type || "Campus",
    status: event.status || "upcoming",
    createdAt: event.created_at,
  };
}

const eventSelect = `
  SELECT
    id,
    title,
    description,
    event_date,
    start_time,
    end_time,
    location,
    event_type,
    status,
    created_at
  FROM events
`;

// ======================================================
// GET ALL EVENTS
// GET /api/events
// ======================================================

router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      ${eventSelect}
      ORDER BY event_date ASC, start_time ASC
    `);

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows.map(formatEvent),
    });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    next(error);
  }
});

// ======================================================
// GET STUDENT'S RESPONSE FOR AN EVENT
// GET /api/events/:id/my-response
// ======================================================

router.get(
  "/:id/my-response",
  authMiddleware,
  requireStudent,
  async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.user.id;

      const [rows] = await pool.query(
        `
        SELECT response, responded_at
        FROM event_responses
        WHERE event_id = ? AND user_id = ?
        LIMIT 1
        `,
        [eventId, userId]
      );

      return res.status(200).json({
        success: true,
        data: rows.length > 0
          ? {
              response: rows[0].response,
              respondedAt: rows[0].responded_at,
            }
          : null,
      });
    } catch (error) {
      console.error("GET STUDENT EVENT RESPONSE ERROR:", error);
      next(error);
    }
  }
);

// ======================================================
// STUDENT ACCEPT OR REJECT EVENT
// POST /api/events/:id/respond
// ======================================================

router.post(
  "/:id/respond",
  authMiddleware,
  requireStudent,
  async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const userId = req.user.id;
      const { response } = req.body;

      if (!["accepted", "rejected"].includes(response)) {
        return res.status(400).json({
          success: false,
          message: "Response must be accepted or rejected.",
        });
      }

      const [events] = await pool.query(
        "SELECT id, status FROM events WHERE id = ? LIMIT 1",
        [eventId]
      );

      if (events.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      if (events[0].status === "completed") {
        return res.status(400).json({
          success: false,
          message: "Responses are closed for completed events.",
        });
      }

      // Insert a new response, or update the student's existing response.
      await pool.query(
        `
        INSERT INTO event_responses
          (event_id, user_id, response)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          response = VALUES(response),
          responded_at = CURRENT_TIMESTAMP
        `,
        [eventId, userId, response]
      );

      return res.status(200).json({
        success: true,
        message:
          response === "accepted"
            ? "You have accepted this event."
            : "You have rejected this event.",
        data: {
          eventId,
          response,
        },
      });
    } catch (error) {
      console.error("SAVE EVENT RESPONSE ERROR:", error);
      next(error);
    }
  }
);

// ======================================================
// ADMIN: GET EVENT PARTICIPATION SUMMARY
// GET /api/events/:id/summary
// ======================================================

router.get(
  "/:id/summary",
  authMiddleware,
  requireAdmin,
  async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const [events] = await pool.query(
        "SELECT id, title FROM events WHERE id = ? LIMIT 1",
        [eventId]
      );

      if (events.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      const [studentRows] = await pool.query(
        `
        SELECT COUNT(*) AS totalStudents
        FROM users
        WHERE role = 'student'
        `
      );

      const [responseRows] = await pool.query(
        `
        SELECT
          COUNT(*) AS totalResponses,
          COALESCE(
            SUM(response = 'accepted'),
            0
          ) AS accepted,
          COALESCE(
            SUM(response = 'rejected'),
            0
          ) AS rejected
        FROM event_responses
        WHERE event_id = ?
        `,
        [eventId]
      );

      const totalStudents = Number(studentRows[0].totalStudents || 0);
      const accepted = Number(responseRows[0].accepted || 0);
      const rejected = Number(responseRows[0].rejected || 0);
      const pending = Math.max(
        0,
        totalStudents - accepted - rejected
      );

      return res.status(200).json({
        success: true,
        data: {
          eventId: events[0].id,
          eventTitle: events[0].title,
          totalStudents,
          accepted,
          rejected,
          pending,
        },
      });
    } catch (error) {
      console.error("GET EVENT SUMMARY ERROR:", error);
      next(error);
    }
  }
);

// ======================================================
// CREATE EVENT — ADMIN ONLY
// POST /api/events
// ======================================================

router.post(
  "/",
  authMiddleware,
  requireAdmin,
  async (req, res, next) => {
    try {
      const {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        eventType,
        category,
        status,
      } = req.body;

      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Event title is required.",
        });
      }

      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Event date is required.",
        });
      }

      if (!location?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Event location is required.",
        });
      }

      const cleanEventType = (
        eventType || category || "Campus"
      ).trim();

      const cleanStatus = status || "upcoming";

      const allowedStatuses = [
        "upcoming",
        "ongoing",
        "completed",
      ];

      if (!allowedStatuses.includes(cleanStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event status.",
        });
      }

      const [result] = await pool.query(
        `
        INSERT INTO events (
          title,
          description,
          event_date,
          start_time,
          end_time,
          location,
          event_type,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          title.trim(),
          description?.trim() || null,
          date,
          startTime || null,
          endTime || null,
          location.trim(),
          cleanEventType,
          cleanStatus,
        ]
      );

      const [rows] = await pool.query(
        `${eventSelect} WHERE id = ? LIMIT 1`,
        [result.insertId]
      );

      return res.status(201).json({
        success: true,
        message: "Event created successfully.",
        data: formatEvent(rows[0]),
      });
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      next(error);
    }
  }
);

// ======================================================
// GET SINGLE EVENT
// GET /api/events/:id
// ======================================================

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `${eventSelect} WHERE id = ? LIMIT 1`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: formatEvent(rows[0]),
    });
  } catch (error) {
    console.error("GET EVENT ERROR:", error);
    next(error);
  }
});

// ======================================================
// UPDATE EVENT — ADMIN ONLY
// PUT /api/events/:id
// ======================================================

router.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  async (req, res, next) => {
    try {
      const {
        title,
        description,
        date,
        startTime,
        endTime,
        location,
        eventType,
        category,
        status,
      } = req.body;

      if (
        !title?.trim() ||
        !date ||
        !location?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Title, date and location are required.",
        });
      }

      const cleanEventType = (
        eventType || category || "Campus"
      ).trim();

      const cleanStatus = status || "upcoming";

      const allowedStatuses = [
        "upcoming",
        "ongoing",
        "completed",
      ];

      if (!allowedStatuses.includes(cleanStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event status.",
        });
      }

      const [result] = await pool.query(
        `
        UPDATE events
        SET
          title = ?,
          description = ?,
          event_date = ?,
          start_time = ?,
          end_time = ?,
          location = ?,
          event_type = ?,
          status = ?
        WHERE id = ?
        `,
        [
          title.trim(),
          description?.trim() || null,
          date,
          startTime || null,
          endTime || null,
          location.trim(),
          cleanEventType,
          cleanStatus,
          req.params.id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Event updated successfully.",
      });
    } catch (error) {
      console.error("UPDATE EVENT ERROR:", error);
      next(error);
    }
  }
);

// ======================================================
// DELETE EVENT — ADMIN ONLY
// DELETE /api/events/:id
// ======================================================

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  async (req, res, next) => {
    try {
      const [result] = await pool.query(
        "DELETE FROM events WHERE id = ?",
        [req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Event deleted successfully.",
      });
    } catch (error) {
      console.error("DELETE EVENT ERROR:", error);
      next(error);
    }
  }
);

module.exports = router;