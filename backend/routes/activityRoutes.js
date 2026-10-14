const express = require("express");

const router = express.Router();

const activities = [
  {
    time: "6 AM",
    students: 800,
    faculty: 500,
    visitors: 300,
  },
  {
    time: "9 AM",
    students: 1800,
    faculty: 1000,
    visitors: 650,
  },
  {
    time: "12 PM",
    students: 2400,
    faculty: 1400,
    visitors: 1100,
  },
  {
    time: "3 PM",
    students: 2200,
    faculty: 1800,
    visitors: 1400,
  },
  {
    time: "6 PM",
    students: 1500,
    faculty: 1000,
    visitors: 1100,
  },
  {
    time: "9 PM",
    students: 1200,
    faculty: 900,
    visitors: 700,
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: activities.length,
    data: activities,
  });
});

module.exports = router;