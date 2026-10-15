const express = require("express");

const router = express.Router();

const rooms = [
  {
    id: 1,
    roomNumber: "A-101",
    building: "BLOCK A",
    type: "Classroom",
    capacity: 60,
    occupancy: 42,
    status: "Available",
  },
  {
    id: 2,
    roomNumber: "A-204",
    building: "BLOCK A",
    type: "Classroom",
    capacity: 60,
    occupancy: 58,
    status: "Occupied",
  },
  {
    id: 3,
    roomNumber: "C-301",
    building: "BLOCK C",
    type: "Computer Lab",
    capacity: 40,
    occupancy: 35,
    status: "Occupied",
  },
  {
    id: 4,
    roomNumber: "B-102",
    building: "BLOCK B",
    type: "Laboratory",
    capacity: 45,
    occupancy: 0,
    status: "Available",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms,
  });
});

router.get("/:id", (req, res) => {
  const room = rooms.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  res.status(200).json({
    success: true,
    data: room,
  });
});

module.exports = router;