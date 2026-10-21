import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  Car,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Map,
  Megaphone,
  Navigation2,
  Settings,
  ShieldAlert,
  Sparkles,
  Thermometer,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
}

interface Session {
  user: SessionUser | null;
  isAuthenticated: boolean;
  logout: () => void;
}

interface Props {
  mobileOpen?: boolean;
  onClose?: () => void;
  session?: Session;
}

const campusNavigation = [
  {
    label: "Activity",
    path: "/activity",
    icon: Activity,
  },
  {
    label: "Navigation",
    path: "/navigation",
    icon: Navigation2,
  },
  {
    label: "Traffic",
    path: "/traffic",
    icon: Car,
  },
  {
    label: "Events",
    path: "/events",
    icon: Megaphone,
  },
];

const intelligenceNavigation = [
  {
    label: "Environment",
    path: "/environment",
    icon: Thermometer,
  },
  {
    label: "Scenarios",
    path: "/scenarios",
    icon: Building2,
  },
  {
    label: "AI Assistant",
    path: "/ai",
    icon: Bot,
  },
];

const studentNavigation = [
  {
    label: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
  },
  {
    label: "Marks",
    path: "/marks",
    icon: BarChart3,
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: GraduationCap,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: Map,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Career",
    path: "/career",
    icon: BriefcaseBusiness,
  },
  {
    label: "AI Performance",
    path: "/ai-performance",
    icon: Sparkles,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
  session,
}: Props) {
  const navigate = useNavigate();

  const isAuthenticated = session?.isAuthenticated ?? false;
  const user = session?.user ?? null;

  const handleLogout = () => {
    session?.logout();
    onClose?.();
    navigate("/dashboard", { replace: true });
  };

  const handleLogin = () => {
    onClose?.();
    navigate("/login");
  };

  const renderItem = (
    item: {
      label: string;
      path: string;
      icon: React.ElementType;
    },
    closeOnClick = true
  ) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => {
          if (closeOnClick) {
            onClose?.();
          }
        }}
        className={({ isActive }) =>
          `side-link ${isActive ? "active" : ""}`
        }
      >
        <Icon size={17} />
        <span>{item.label}</span>

        <ChevronRight
          className="side-chevron"
          size={14}
        />
      </NavLink>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* =====================================================
            SIDEBAR HEADER
        ===================================================== */}

        <div className="sidebar-top">
          <div
            className="sidebar-brand"
            onClick={() => {
              navigate("/dashboard");
              onClose?.();
            }}
            role="button"
            tabIndex={0}
          >
            <div className="brand-mark">
              C
            </div>

            <div>
              <strong>CAMPUS OS</strong>
              <span>Digital Campus Twin</span>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={onClose}
            type="button"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================================
            SYSTEM STATUS
        ===================================================== */}

        <div className="sidebar-status">
          <span className="live-dot" />
          <span>Campus system online</span>
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="sidebar-nav">

          {/* PUBLIC */}
          <div className="nav-section-title">
            EXPLORE
          </div>

          {renderItem({
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
          })}

          {/* =================================================
              LOGGED-IN AREA
          ================================================= */}

          {isAuthenticated && (
            <>
              {/* CAMPUS */}
              <div className="nav-section-title">
                CAMPUS
              </div>

              {campusNavigation.map((item) =>
                renderItem(item)
              )}

              {/* INTELLIGENCE */}
              <div className="nav-section-title">
                INTELLIGENCE
              </div>

              {intelligenceNavigation.map((item) =>
                renderItem(item)
              )}

              {/* STUDENT SERVICES */}
              {user?.role === "student" && (
                <>
                  <div className="nav-section-title">
                    STUDENT SERVICES
                  </div>

                  {studentNavigation.map((item) =>
                    renderItem(item)
                  )}
                </>
              )}

              {/* ADMIN CONTROL */}
              {user?.role === "admin" && (
                <>
                  <div className="nav-section-title">
                    ADMIN CONTROL
                  </div>

                  {renderItem({
                    label: "Campus Management",
                    path: "/build",
                    icon: Building2,
                  })}

                  {renderItem({
                    label: "Emergency",
                    path: "/emergency",
                    icon: ShieldAlert,
                  })}

                  {renderItem({
                    label: "Settings",
                    path: "/settings",
                    icon: Settings,
                  })}
                </>
              )}

              {/* STUDENT SETTINGS */}
              {user?.role === "student" && (
                <>
                  <div className="nav-section-title">
                    CAMPUS CONTROL
                  </div>

                  {renderItem({
                    label: "Emergency",
                    path: "/emergency",
                    icon: ShieldAlert,
                  })}

                  {renderItem({
                    label: "Settings",
                    path: "/settings",
                    icon: Settings,
                  })}
                </>
              )}
            </>
          )}
        </nav>

        {/* =====================================================
            USER / LOGIN AREA
        ===================================================== */}

        <div className="sidebar-bottom">

          {!isAuthenticated ? (
            <button
              className="login-sidebar-button"
              onClick={handleLogin}
              type="button"
            >
              <LogIn size={17} />

              <span>
                Sign in to access campus
              </span>
            </button>
          ) : (
            <div className="profile-box">

              <div className="profile-avatar">
                <CircleUserRound size={20} />
              </div>

              <div className="profile-info">
                <strong>
                  {user?.name || "Campus User"}
                </strong>

                <span>
                  {user?.role === "admin"
                    ? "Administrator"
                    : "Student"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                type="button"
                className="logout-button"
              >
                <LogOut size={17} />
              </button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}