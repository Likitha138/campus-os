const express = require("express");

const router = express.Router();

// GET /api/events
router.get("/", (req, res) => {
  const events = [
    {
      id: 1,
      title: "Annual Tech Fest",
      date: "2026-10-15",
      location: "Main Auditorium",
      type: "purple",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Placement Drive",
      date: "2026-10-20",
      location: "Placement Cell",
      type: "blue",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Sports Meet",
      date: "2026-10-25",
      location: "Sports Complex",
      type: "green",
      status: "upcoming",
    },
  ];

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

module.exports = router;