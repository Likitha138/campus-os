import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  useAuth,
  type UserRole,
} from "../auth/AuthContext";

interface LoginLocationState {
  from?: string;
  registered?: boolean;
  email?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const locationState =
    (location.state as LoginLocationState | null) ||
    null;

  const [role, setRole] =
    useState<UserRole>("student");

  const [email, setEmail] = useState(
    locationState?.email || ""
  );

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [registeredMessage, setRegisteredMessage] =
    useState(
      Boolean(locationState?.registered)
    );

  const from =
    locationState?.from ||
    "/dashboard";

  /*
   * Remove the registration state from the
   * browser history after displaying it.
   */
  useEffect(() => {
    if (locationState?.registered) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
    }
  }, [locationState?.registered]);

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setRegisteredMessage(false);

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const success =
        await login(
          email,
          password,
          role
        );

      if (!success) {
        if (role === "student") {
          setError(
            "Invalid student email or password. Please register first or check your credentials."
          );
        } else {
          setError(
            "Invalid administrator email or password."
          );
        }

        return;
      }

      navigate(from, {
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (
    selectedRole: UserRole
  ) => {
    setRole(selectedRole);
    setError("");
    setRegisteredMessage(false);
    setPassword("");
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

            <small>
              Intelligent Campus Platform
            </small>
          </div>
        </Link>

        {/* =====================================================
            LOGIN CARD
        ===================================================== */}

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              <ShieldCheck size={22} />
            </div>

            <span className="auth-eyebrow">
              SECURE ACCESS
            </span>

            <h1>
              Welcome back
            </h1>

            <p>
              Sign in to access your
              Campus OS workspace.
            </p>

          </div>

          {/* =================================================
              REGISTRATION SUCCESS
          ================================================= */}

          {registeredMessage && (
            <div className="login-success-message">

              <CheckCircle2 size={17} />

              <div>
                <strong>
                  Registration successful
                </strong>

                <span>
                  Your account is ready.
                  Login using your registered
                  email and password.
                </span>
              </div>

            </div>
          )}

          {/* =================================================
              ROLE SELECTOR
          ================================================= */}

          <div className="auth-role-switch">

            <button
              type="button"
              className={
                role === "student"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleRoleChange(
                  "student"
                )
              }
            >
              <UserRound size={17} />
              Student
            </button>

            <button
              type="button"
              className={
                role === "admin"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleRoleChange(
                  "admin"
                )
              }
            >
              <ShieldCheck size={17} />
              Admin
            </button>

          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* EMAIL */}

            <label>
              Email address

              <div className="input-with-icon">
                <Mail size={17} />

                <input
                  type="email"
                  placeholder={
                    role === "admin"
                      ? "admin@campus.edu"
                      : "student@campus.edu"
                  }
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

            {/* PASSWORD */}

            <label>
              Password

              <div className="input-with-icon">
                <Lock size={17} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="current-password"
                />
              </div>
            </label>

            {/* ERROR */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : `Sign in as ${role}`}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

          {/* =================================================
              STUDENT REGISTER
          ================================================= */}

          {role === "student" && (
            <div className="auth-footer">

              <span>
                New student?
              </span>

              <Link to="/register">
                Register first
                <ArrowRight size={14} />
              </Link>

            </div>
          )}

          {/* =================================================
              ADMIN INFORMATION
          ================================================= */}

          {role === "admin" && (
            <div className="auth-admin-note">

              <ShieldCheck size={15} />

              <span>
                Administrator accounts are
                created and managed by the
                system administrator.
                Admin registration is not
                available.
              </span>

            </div>
          )}

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