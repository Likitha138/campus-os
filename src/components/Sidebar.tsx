import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  FileBarChart,
  BrainCircuit,
  BriefcaseBusiness,
  Bell,
  Settings,
  GraduationCap,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Marks",
    path: "/marks",
    icon: BookOpen,
  },
  {
    name: "Assignments",
    path: "/assignments",
    icon: ClipboardList,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
  {
    name: "AI Performance",
    path: "/ai-performance",
    icon: BrainCircuit,
  },
  {
    name: "Career Intelligence",
    path: "/career",
    icon: BriefcaseBusiness,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-area">
        <div className="logo-icon">
          <GraduationCap size={23} />
        </div>

        <div>
          <h2>Campus OS</h2>
          <span>SMART CAMPUS PLATFORM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <span className="status-dot"></span>

          <span>Campus OS System Online</span>

          <Activity size={13} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;