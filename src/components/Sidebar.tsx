import {
  Compass,
  Navigation,
  Activity,
  Car,
  CalendarDays,
  TriangleAlert,
  Boxes,
  Leaf,
  Bot,
  Workflow,
  Settings,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Explore",
    path: "/",
    icon: Compass,
  },
  {
    name: "Navigation",
    path: "/attendance",
    icon: Navigation,
  },
  {
    name: "Campus Activity",
    path: "/marks",
    icon: Activity,
  },
  {
    name: "Traffic",
    path: "/assignments",
    icon: Car,
  },
  {
    name: "Events",
    path: "/reports",
    icon: CalendarDays,
  },
  {
    name: "Emergency",
    path: "/alerts",
    icon: TriangleAlert,
  },
  {
    name: "Build (Future)",
    path: "/ai-performance",
    icon: Boxes,
  },
  {
    name: "Environment",
    path: "/career",
    icon: Leaf,
  },
  {
    name: "AI Assistant",
    path: "/settings",
    icon: Bot,
  },
  {
    name: "Scenarios",
    path: "/settings",
    icon: Workflow,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="campus-logo">
        <div className="campus-logo-icon">
          <GraduationCap size={27} />
        </div>

        <div>
          <h2>CAMPUS OS</h2>
          <span>Smart Campus Operating System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={`${item.name}-${index}`}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `campus-nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />

              <span>{item.name}</span>

              <ChevronRight className="nav-arrow" size={15} />
            </NavLink>
          );
        })}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `campus-nav-item ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} />

          <span>Settings</span>

          <ChevronRight className="nav-arrow" size={15} />
        </NavLink>
      </nav>

      {/* AI Assistant */}
      <div className="ai-assistant-box">
        <div className="ai-glow"></div>

        <div className="ai-robot">
          <Bot size={35} />
        </div>

        <div className="ai-label">AI ASSISTANT</div>

        <p>Ask anything about campus...</p>

        <button className="ai-chat-button">→</button>
      </div>
    </aside>
  );
}

export default Sidebar;