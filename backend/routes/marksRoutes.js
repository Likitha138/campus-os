const express = require("express");

const {
  getMarks,
  getMarksByUser,
  getMarksSummary,
  createMarks,
  updateMarks,
  deleteMarks
} = require("../controllers/marksController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getMarks);

router.get(
  "/user/:userId",
  authMiddleware,
  getMarksByUser
);

router.get(
  "/summary/:userId",
  authMiddleware,
  getMarksSummary
);

router.post(
  "/",
  authMiddleware,
  createMarks
);

router.put(
  "/:id",
  authMiddleware,
  updateMarks
);

router.delete(
  "/:id",
  authMiddleware,
  deleteMarks
);

module.exports = router;