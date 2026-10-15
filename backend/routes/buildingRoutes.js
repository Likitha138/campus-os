const express = require("express");

const router = express.Router();

const buildings = [
  {
    id: 1,
    name: "Main Academic Block",
    code: "BLOCK A",
    floors: 4,
    rooms: 48,
    occupancy: 72,
    status: "Active",
  },
  {
    id: 2,
    name: "Science Block",
    code: "BLOCK B",
    floors: 3,
    rooms: 36,
    occupancy: 61,
    status: "Active",
  },
  {
    id: 3,
    name: "Computer Science Block",
    code: "BLOCK C",
    floors: 4,
    rooms: 42,
    occupancy: 78,
    status: "Active",
  },
  {
    id: 4,
    name: "Administration Block",
    code: "ADMIN",
    floors: 3,
    rooms: 28,
    occupancy: 54,
    status: "Active",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: buildings.length,
    data: buildings,
  });
});

router.get("/:id", (req, res) => {
  const building = buildings.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!building) {
    return res.status(404).json({
      success: false,
      message: "Building not found",
    });
  }

  res.status(200).json({
    success: true,
    data: building,
  });
});

module.exports = router;