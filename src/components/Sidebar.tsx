// ============================================================
// src/components/Sidebar.tsx
// ============================================================

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  Car,
  ChevronRight,
  ClipboardCheck,
  Compass,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Map,
  Navigation,
  Settings,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  onNavigate?: () => void;
};

const primaryItems = [
  {
    label: "Explore",
    path: "/",
    icon: Map,
  },
  {
    label: "Navigate",
    path: "/navigation",
    icon: Navigation,
  },
  {
    label: "Activity",
    path: "/activity",
    icon: Activity,
  },
  {
    label: "Traffic",
    path: "/traffic",
    icon: Car,
  },
  {
    label: "Events",
    path: "/events",
    icon: CalendarDays,
  },
];

const academicItems = [
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
    icon: Target,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
];

const intelligenceItems = [
  {
    label: "AI Performance",
    path: "/ai-performance",
    icon: Sparkles,
  },
  {
    label: "Career Intelligence",
    path: "/career",
    icon: GraduationCap,
  },
  {
    label: "Campus AI",
    path: "/ai-assistant",
    icon: Bot,
  },
];

const systemItems = [
  {
    label: "Emergency",
    path: "/emergency",
    icon: ShieldAlert,
  },
  {
    label: "Environment",
    path: "/environment",
    icon: Leaf,
  },
  {
    label: "Scenarios",
    path: "/scenarios",
    icon: Zap,
  },
  {
    label: "Build",
    path: "/build",
    icon: Building2,
  },
  {
    label: "Alerts",
    path: "/alerts",
    icon: AlertTriangle,
  },
];

function Sidebar({ onNavigate }: SidebarProps) {
  const renderItem = (
    item: {
      label: string;
      path: string;
      icon: React.ComponentType<{ size?: number }>;
    },
  ) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-item-icon">
          <Icon size={17} />
        </span>

        <span className="sidebar-item-label">{item.label}</span>

        <ChevronRight
          className="sidebar-item-arrow"
          size={14}
        />
      </NavLink>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <div className="brand-core" />
          <div className="brand-ring ring-one" />
          <div className="brand-ring ring-two" />
        </div>

        <div className="brand-copy">
          <strong>CAMPUS OS</strong>
          <span>DIGITAL TWIN</span>
        </div>

        <button
          type="button"
          className="mobile-sidebar-close"
          onClick={onNavigate}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="sidebar-system-status">
        <span className="status-pulse" />

        <div>
          <strong>LIVE SYSTEM</strong>
          <small>All systems operational</small>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <div className="sidebar-section-title">
          <span>COMMAND CENTER</span>
        </div>

        {primaryItems.map(renderItem)}

        <div className="sidebar-section-title">
          <span>ACADEMIC INTELLIGENCE</span>
        </div>

        {academicItems.map(renderItem)}

        <div className="sidebar-section-title">
          <span>AI & INTELLIGENCE</span>
        </div>

        {intelligenceItems.map(renderItem)}

        <div className="sidebar-section-title">
          <span>CAMPUS OPERATIONS</span>
        </div>

        {systemItems.map(renderItem)}

        <div className="sidebar-section-title">
          <span>ADMINISTRATION</span>
        </div>

        {renderItem({
          label: "Settings",
          path: "/settings",
          icon: Settings,
        })}
      </nav>

      <div className="sidebar-bottom-card">
        <div className="sidebar-bottom-icon">
          <Compass size={18} />
        </div>

        <div>
          <strong>Campus AI</strong>
          <span>Ready to assist</span>
        </div>

        <div className="sidebar-ai-dot" />
      </div>

      <div className="sidebar-profile">
        <div className="profile-avatar">
          L
        </div>

        <div className="profile-info">
          <strong>Likitha</strong>
          <span>Student</span>
        </div>

        <Users size={16} />
      </div>
    </aside>
  );
}

export default Sidebar;