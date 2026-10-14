const express = require("express");

const router = express.Router();

const bookings = [
  {
    id: 1,
    facility: "Seminar Hall",
    date: "2026-10-16",
    time: "10:00 AM - 12:00 PM",
    purpose: "Project Presentation",
    status: "Confirmed",
  },
  {
    id: 2,
    facility: "Computer Lab",
    date: "2026-10-18",
    time: "2:00 PM - 4:00 PM",
    purpose: "Workshop",
    status: "Pending",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

router.post("/", (req, res) => {
  const { facility, date, time, purpose } = req.body;

  if (!facility || !date || !time || !purpose) {
    return res.status(400).json({
      success: false,
      message: "Facility, date, time and purpose are required",
    });
  }

  const booking = {
    id: bookings.length + 1,
    facility,
    date,
    time,
    purpose,
    status: "Pending",
  };

  bookings.push(booking);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

module.exports = router;