import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Car,
  CalendarDays,
  ClipboardCheck,
  Compass,
  Cpu,
  DoorOpen,
  GraduationCap,
  HeartPulse,
  Layers3,
  LayoutDashboard,
  Leaf,
  Map,
  Navigation as NavigationIcon,
  Settings,
  ShieldAlert,
  Sparkles,
  TrafficCone,
  Users,
  Workflow,
} from "lucide-react";

import { NavLink } from "react-router-dom";

type Item = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const primary: Item[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Explore",
    path: "/explore",
    icon: Map,
  },
  {
    label: "Navigation",
    path: "/navigation",
    icon: Compass,
  },
  {
    label: "Activity",
    path: "/activity",
    icon: Activity,
  },
  {
    label: "Traffic",
    path: "/traffic",
    icon: TrafficCone,
  },
  {
    label: "Events",
    path: "/events",
    icon: CalendarDays,
  },
];

const operations: Item[] = [
  {
    label: "Emergency",
    path: "/emergency",
    icon: ShieldAlert,
  },
  {
    label: "Build",
    path: "/build",
    icon: Building2,
  },
  {
    label: "Environment",
    path: "/environment",
    icon: Leaf,
  },
  {
    label: "Scenarios",
    path: "/scenarios",
    icon: Workflow,
  },
  {
    label: "AI Assistant",
    path: "/ai",
    icon: Bot,
  },
];

const academic: Item[] = [
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
    icon: Layers3,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: Cpu,
  },
  {
    label: "AI Performance",
    path: "/ai-performance",
    icon: Sparkles,
  },
  {
    label: "Career",
    path: "/career",
    icon: GraduationCap,
  },
];

const system: Item[] = [
  {
    label: "Alerts",
    path: "/alerts",
    icon: AlertTriangle,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  return (
    <div className="sidebar-group">
      <div className="sidebar-section-title">{title}</div>

      <div className="sidebar-items">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-link-icon">
                <Icon size={17} />
              </span>

              <span className="sidebar-link-label">
                {item.label}
              </span>

              {item.label === "Alerts" && (
                <span className="sidebar-count">4</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <div className="brand-mark-inner">
            <Cpu size={22} />
          </div>
        </div>

        <div className="brand-copy">
          <strong>CAMPUS OS</strong>
          <span>Digital Campus Twin</span>
        </div>
      </div>

      <div className="sidebar-live-card">
        <div className="sidebar-live-icon">
          <HeartPulse size={16} />
        </div>

        <div>
          <span>Campus Status</span>
          <strong>Operational</strong>
        </div>

        <span className="live-dot" />
      </div>

      <div className="sidebar-scroll">
        <NavGroup title="MAIN" items={primary} />
        <NavGroup title="CAMPUS OPERATIONS" items={operations} />
        <NavGroup title="ACADEMIC INTELLIGENCE" items={academic} />
        <NavGroup title="SYSTEM" items={system} />
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <div className="footer-icon">
            <Users size={16} />
          </div>

          <div>
            <strong>3,248</strong>
            <span>Active students</span>
          </div>

          <DoorOpen size={16} />
        </div>

        <div className="sidebar-version">
          CAMPUS OS <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}