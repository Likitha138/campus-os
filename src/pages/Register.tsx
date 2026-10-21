import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  IdCard,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { registerStudent } = useAuth();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /*
   * If a student is already logged in,
   * registration should not be necessary.
   */
  const from =
    (location.state as { from?: string } | null)
      ?.from || "/dashboard";

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setSuccess(false);

    const cleanName = name.trim();
    const cleanStudentId = studentId.trim();
    const cleanEmail = email.trim().toLowerCase();

    /*
     * Required fields
     */
    if (
      !cleanName ||
      !cleanStudentId ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    /*
     * Password length
     */
    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    /*
     * Password confirmation
     */
    if (password !== confirmPassword) {
      setError(
        "Password and confirm password do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const successResult =
        await registerStudent(
          cleanName,
          cleanEmail,
          password,
          cleanStudentId
        );

      if (!successResult) {
        setError(
          "Registration failed. This student ID or email may already be registered."
        );
        return;
      }

      /*
       * Registration succeeded.
       *
       * IMPORTANT:
       * The student is NOT logged in automatically.
       *
       * Show success message first.
       */
      setSuccess(true);

      /*
       * Give the user a moment to see the success
       * message, then send them to login.
       */
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            registered: true,
            email: cleanEmail,
            from,
          },
        });
      }, 1200);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-grid" />

      <div className="auth-container">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <Link
          to="/dashboard"
          className="auth-brand"
        >
          <div className="auth-brand-icon">
            <span>CO</span>
          </div>

          <div>
            <strong>CAMPUS OS</strong>
            <small>Student Registration</small>
          </div>
        </Link>

        {/* =====================================================
            REGISTER CARD
        ===================================================== */}

        <div className="auth-card register-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              <UserRound size={22} />
            </div>

            <span className="auth-eyebrow">
              STUDENT ACCESS
            </span>

            <h1>Create your account</h1>

            <p>
              Register first and create your password
              to access Campus OS.
            </p>

          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success ? (
            <div className="registration-success">

              <div className="registration-success-icon">
                <CheckCircle2 size={28} />
              </div>

              <h2>
                Registration successful
              </h2>

              <p>
                Your student account has been created.
                Please login using your registered
                email and password.
              </p>

              <span>
                Redirecting to login...
              </span>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >

              {/* =================================================
                  NAME
              ================================================= */}

              <label>
                Full name

                <div className="input-with-icon">
                  <UserRound size={17} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    autoComplete="name"
                  />
                </div>
              </label>

              {/* =================================================
                  STUDENT ID
              ================================================= */}

              <label>
                Student ID

                <div className="input-with-icon">
                  <IdCard size={17} />

                  <input
                    type="text"
                    placeholder="Example: STU-2026-001"
                    value={studentId}
                    onChange={(event) =>
                      setStudentId(
                        event.target.value
                      )
                    }
                    autoComplete="off"
                  />
                </div>
              </label>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <label>
                College email

                <div className="input-with-icon">
                  <Mail size={17} />

                  <input
                    type="email"
                    placeholder="student@campus.edu"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    autoComplete="email"
                  />
                </div>
              </label>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <label>
                Create password

                <div className="input-with-icon">
                  <Lock size={17} />

                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                  />
                </div>
              </label>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

              <label>
                Confirm password

                <div className="input-with-icon">
                  <Lock size={17} />

                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                  />
                </div>
              </label>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              {/* =================================================
                  REGISTER BUTTON
              ================================================= */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Creating account..."
                  : "Create student account"}

                {!loading && (
                  <ArrowRight size={17} />
                )}
              </button>

            </form>
          )}

          {/* =====================================================
              LOGIN LINK
          ===================================================== */}

          {!success && (
            <div className="auth-footer">

              <span>
                Already registered?
              </span>

              <Link to="/login">
                Student Login
                <ArrowRight size={14} />
              </Link>

            </div>
          )}

          {/* =====================================================
              ADMIN INFORMATION
          ===================================================== */}

          <div className="auth-admin-note">
            <span>
              Administrator accounts are created
              separately by the system administrator.
              Admin registration is not available.
            </span>
          </div>

        </div>

        {/* =====================================================
            BACK TO DASHBOARD
        ===================================================== */}

        <Link
          to="/dashboard"
          className="back-dashboard"
        >
          ← Return to public dashboard
        </Link>

      </div>
    </div>
  );
}