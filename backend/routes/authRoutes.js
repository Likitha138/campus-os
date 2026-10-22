const express = require("express");

const {
  registerStudent,
  login,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| STUDENT REGISTRATION
|--------------------------------------------------------------------------
|
| POST /api/auth/student/register
|
*/

router.post(
  "/student/register",
  registerStudent
);

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
|
| POST /api/auth/login
|
| Used by:
| - Student
| - Admin
|
*/

router.post(
  "/login",
  login
);

/*
|--------------------------------------------------------------------------
| CURRENT USER
|--------------------------------------------------------------------------
|
| GET /api/auth/me
|
| Requires valid JWT.
|
*/

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;