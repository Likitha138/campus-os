const express = require("express");
const { pool } = require("../config/db");

const router = express.Router();

// ======================================================
// GET ALL EVENTS
// GET /api/events
// ======================================================

router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
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
      ORDER BY event_date ASC, start_time ASC
    `);

    const events = rows.map((event) => {
      const date = event.event_date
        ? new Date(event.event_date).toISOString().split("T")[0]
        : "";

      const startTime = event.start_time
        ? String(event.start_time).slice(0, 5)
        : "";

      const endTime = event.end_time
        ? String(event.end_time).slice(0, 5)
        : "";

      let time = startTime;

      if (startTime && endTime) {
        time = `${startTime} - ${endTime}`;
      }

      return {
        id: event.id,
        title: event.title,
        description: event.description || "",
        date,
        time,
        startTime,
        endTime,
        location: event.location || "",
        category: event.event_type || "Campus",
        eventType: event.event_type || "Campus",
        status: event.status || "upcoming",
        createdAt: event.created_at,
      };
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    next(error);
  }
});

// ======================================================
// CREATE EVENT
// POST /api/events
// ======================================================

router.post("/", async (req, res, next) => {
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

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!title || !title.trim()) {
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

    if (!location || !location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event location is required.",
      });
    }

    // --------------------------------------------------
    // NORMALIZE VALUES
    // --------------------------------------------------

    const cleanTitle = title.trim();
    const cleanDescription = description
      ? description.trim()
      : null;

    const cleanLocation = location.trim();

    const cleanEventType =
      (eventType || category || "Campus").trim();

    const cleanStatus =
      status || "upcoming";

    // --------------------------------------------------
    // VALID STATUS
    // --------------------------------------------------

    const allowedStatuses = [
      "upcoming",
      "ongoing",
      "completed",
    ];

    if (!allowedStatuses.includes(cleanStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid event status. Use upcoming, ongoing or completed.",
      });
    }

    // --------------------------------------------------
    // INSERT EVENT
    // --------------------------------------------------

    const [result] = await pool.query(
      `
      INSERT INTO events
      (
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
        cleanTitle,
        cleanDescription,
        date,
        startTime || null,
        endTime || null,
        cleanLocation,
        cleanEventType,
        cleanStatus,
      ]
    );

    // --------------------------------------------------
    // RETURN CREATED EVENT
    // --------------------------------------------------

    const [rows] = await pool.query(
      `
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
      WHERE id = ?
      LIMIT 1
      `,
      [result.insertId]
    );

    const event = rows[0];

    return res.status(201).json({
      success: true,
      message:
        "Event created successfully.",
      data: {
        id: event.id,
        title: event.title,
        description: event.description || "",
        date: event.event_date
          ? new Date(event.event_date)
              .toISOString()
              .split("T")[0]
          : "",
        startTime: event.start_time
          ? String(event.start_time).slice(0, 5)
          : "",
        endTime: event.end_time
          ? String(event.end_time).slice(0, 5)
          : "",
        location: event.location || "",
        category:
          event.event_type || "Campus",
        eventType:
          event.event_type || "Campus",
        status:
          event.status || "upcoming",
        createdAt: event.created_at,
      },
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    next(error);
  }
});

// ======================================================
// GET SINGLE EVENT
// GET /api/events/:id
// ======================================================

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `
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
      WHERE id = ?
      LIMIT 1
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const event = rows[0];

    return res.status(200).json({
      success: true,
      data: {
        id: event.id,
        title: event.title,
        description: event.description || "",
        date: event.event_date
          ? new Date(event.event_date)
              .toISOString()
              .split("T")[0]
          : "",
        startTime: event.start_time
          ? String(event.start_time).slice(0, 5)
          : "",
        endTime: event.end_time
          ? String(event.end_time).slice(0, 5)
          : "",
        location: event.location || "",
        category:
          event.event_type || "Campus",
        eventType:
          event.event_type || "Campus",
        status:
          event.status || "upcoming",
        createdAt: event.created_at,
      },
    });
  } catch (error) {
    console.error("GET EVENT ERROR:", error);
    next(error);
  }
});

// ======================================================
// UPDATE EVENT
// PUT /api/events/:id
// ======================================================

router.put("/:id", async (req, res, next) => {
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

    if (!title || !date || !location) {
      return res.status(400).json({
        success: false,
        message:
          "Title, date and location are required.",
      });
    }

    const cleanEventType =
      (eventType || category || "Campus").trim();

    const cleanStatus =
      status || "upcoming";

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
        description
          ? description.trim()
          : null,
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
      message:
        "Event updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    next(error);
  }
});

// ======================================================
// DELETE EVENT
// DELETE /api/events/:id
// ======================================================

router.delete("/:id", async (req, res, next) => {
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
      message:
        "Event deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    next(error);
  }
});

module.exports = router;