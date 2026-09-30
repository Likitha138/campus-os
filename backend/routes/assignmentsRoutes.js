const express = require("express");

const {
  getAssignments,
  getAssignmentsByUser,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  submitAssignment,
  deleteAssignment
} = require("../controllers/assignmentsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAssignments
);

router.get(
  "/user/:userId",
  authMiddleware,
  getAssignmentsByUser
);

router.get(
  "/:id",
  authMiddleware,
  getAssignmentById
);

router.post(
  "/",
  authMiddleware,
  createAssignment
);

router.put(
  "/:id",
  authMiddleware,
  updateAssignment
);

router.patch(
  "/:id/submit",
  authMiddleware,
  submitAssignment
);

router.delete(
  "/:id",
  authMiddleware,
  deleteAssignment
);

module.exports = router;