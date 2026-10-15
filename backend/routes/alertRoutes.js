const express = require("express");

const router = express.Router();

const alerts = [
  {
    id: 1,
    title: "Low Attendance",
    message: "DBMS attendance is below the recommended level.",
    type: "warning",
    isRead: false,
  },
  {
    id: 2,
    title: "New Event",
    message: "Placement Drive is scheduled for the campus.",
    type: "info",
    isRead: false,
  },
  {
    id: 3,
    title: "Performance Improved",
    message: "Academic performance improved this month.",
    type: "success",
    isRead: true,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: alerts.length,
    data: alerts,
  });
});

module.exports = router;