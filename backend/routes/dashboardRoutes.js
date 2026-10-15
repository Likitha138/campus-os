const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      buildings: 24,
      rooms: 215,
      students: 3248,
      occupancy: 63,
      traffic: "Moderate",
      eventsToday: 2,
      airQuality: {
        value: 42,
        status: "Good",
      },
    },
  });
});

module.exports = router;