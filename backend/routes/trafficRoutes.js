const express = require("express");

const router = express.Router();

const traffic = [
  {
    id: 1,
    zone: "Main Gate",
    vehicles: 84,
    averageSpeed: 18,
    congestion: "Moderate",
    status: "Moving",
  },
  {
    id: 2,
    zone: "Academic Block",
    vehicles: 52,
    averageSpeed: 24,
    congestion: "Low",
    status: "Moving",
  },
  {
    id: 3,
    zone: "Parking Area",
    vehicles: 118,
    averageSpeed: 8,
    congestion: "High",
    status: "Slow",
  },
  {
    id: 4,
    zone: "Canteen Road",
    vehicles: 67,
    averageSpeed: 16,
    congestion: "Moderate",
    status: "Moving",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: traffic.length,
    data: traffic,
  });
});

module.exports = router;