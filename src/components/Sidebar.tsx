import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Car,
  Compass,
  GraduationCap,
  LayoutDashboard,
  ClipboardCheck,
  Settings,
  ShieldAlert,
  LogIn,
  LogOut,
  UserPlus,
  Leaf,
  FileBarChart,
  Trophy,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  session?: {
    user: any;
    isAuthenticated: boolean;
    logout: () => void;
  };
}

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, public: true },
  { label: "Attendance", path: "/attendance", icon: ClipboardCheck },
  { label: "Marks", path: "/marks", icon: Trophy },
  { label: "Assignments", path: "/assignments", icon: GraduationCap },
  { label: "Reports", path: "/reports", icon: FileBarChart },
  { label: "AI Performance", path: "/ai-performance", icon: BarChart3 },
  { label: "Career Intelligence", path: "/career", icon: BriefcaseBusiness },
  { label: "AI Assistant", path: "/ai-assistant", icon: Bot },
  { label: "Navigation", path: "/navigation", icon: Compass },
  { label: "Activity", path: "/activity", icon: Activity },
  { label: "Traffic", path: "/traffic", icon: Car },
  { label: "Events", path: "/events", icon: CalendarDays },
  { label: "Environment", path: "/environment", icon: Leaf },
  { label: "Emergency", path: "/emergency", icon: ShieldAlert },
  { label: "Alerts", path: "/alerts", icon: AlertTriangle },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({
  mobileOpen = false,
  onClose,
  session,
}: SidebarProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  const user = session?.user ?? auth.user;
  const isAuthenticated =
    session?.isAuthenticated ?? auth.isAuthenticated;
  const logout = session?.logout ?? auth.logout;

  const isAdmin = user?.role === "admin";

  function handleNavigation(path: string, isPublic?: boolean) {
    onClose?.();

    if (isPublic || isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  }

  function handleLogout() {
    logout();
    onClose?.();
    navigate("/dashboard");
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Building2 size={25} />
          </div>

          <div>
            <h2>Campus OS</h2>
            <p>Intelligent Campus</p>
          </div>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map(({ label, path, icon: Icon, public: isPublic }) => (
            <NavLink
              key={path}
              to={isPublic || isAuthenticated ? path : "/login"}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(path, isPublic);
              }}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to="/build"
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Building2 size={18} />
              <span>Campus Management</span>
            </NavLink>
          )}
        </nav>

        <div className="sidebar-bottom">
          {isAuthenticated ? (
            <>
              <div className="sidebar-user">
                <div className="sidebar-avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="sidebar-user-info">
                  <strong>{user?.name || "Campus User"}</strong>
                  <span>{isAdmin ? "Administrator" : "Student"}</span>
                </div>
              </div>

              <button
                type="button"
                className="sidebar-link sidebar-auth-button"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="sidebar-auth-actions">
              <NavLink
                to="/login"
                onClick={onClose}
                className="sidebar-link"
              >
                <LogIn size={18} />
                <span>Login</span>
              </NavLink>

              <NavLink
                to="/register"
                onClick={onClose}
                className="sidebar-link"
              >
                <UserPlus size={18} />
                <span>Student Registration</span>
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}