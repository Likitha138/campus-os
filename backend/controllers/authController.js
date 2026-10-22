const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

/*
|--------------------------------------------------------------------------
| Helper: Generate JWT
|--------------------------------------------------------------------------
*/

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

/*
|--------------------------------------------------------------------------
| STUDENT REGISTRATION
|--------------------------------------------------------------------------
|
| Student creates their account and password.
| Registration DOES NOT automatically log them in.
|
*/

const registerStudent = async (req, res, next) => {
  try {
    const {
      name,
      studentId,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !studentId ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, student ID, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    const cleanEmail = email
      .trim()
      .toLowerCase();

    /*
     * Check whether email already exists.
     */

    const [existingEmail] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [cleanEmail]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    /*
     * Check whether student ID already exists.
     */

    const [existingStudent] =
      await db.query(
        "SELECT id FROM users WHERE student_id = ? LIMIT 1",
        [studentId.trim()]
      );

    if (existingStudent.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This student ID is already registered.",
      });
    }

    /*
     * Hash password before storing it.
     */

    const hashedPassword =
      await bcrypt.hash(password, 10);

    /*
     * Insert student.
     */

    const [result] = await db.query(
      `
      INSERT INTO users
      (
        name,
        student_id,
        email,
        password,
        role
      )
      VALUES (?, ?, ?, ?, 'student')
      `,
      [
        name.trim(),
        studentId.trim(),
        cleanEmail,
        hashedPassword,
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Student registration successful. Please login.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(
      "Student registration error:",
      error
    );

    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
|
| Handles both:
| - Student login
| - Admin login
|
*/

const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const cleanEmail = email
      .trim()
      .toLowerCase();

    /*
     * Find user.
     */

    const [users] = await db.query(
      `
      SELECT
        id,
        name,
        student_id,
        email,
        password,
        role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [cleanEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const user = users[0];

    /*
     * If frontend specifies a role,
     * make sure it matches the database.
     */

    if (
      role &&
      user.role !== role
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to login using this role.",
      });
    }

    /*
     * Verify password.
     */

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    /*
     * Create JWT.
     */

    const token =
      generateToken(user);

    /*
     * Do not send password back
     * to frontend.
     */

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,

      user: {
        id: user.id,
        name: user.name,
        studentId:
          user.student_id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET CURRENT USER
|--------------------------------------------------------------------------
|
| This endpoint requires authMiddleware.
|
*/

const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      `
      SELECT
        id,
        name,
        student_id,
        email,
        role
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: users[0].id,
        name: users[0].name,
        studentId:
          users[0].student_id,
        email: users[0].email,
        role: users[0].role,
      },
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error
    );

    next(error);
  }
};

module.exports = {
  registerStudent,
  login,
  getMe,
};