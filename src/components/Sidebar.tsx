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
  Network,
  Settings,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Explore",
    icon: Compass,
    path: "/",
  },
  {
    label: "Navigation",
    icon: Navigation,
    path: "/navigation",
  },
  {
    label: "Campus Activity",
    icon: Activity,
    path: "/activity",
  },
  {
    label: "Traffic",
    icon: Car,
    path: "/traffic",
  },
  {
    label: "Events",
    icon: CalendarDays,
    path: "/events",
  },
  {
    label: "Emergency",
    icon: TriangleAlert,
    path: "/emergency",
  },
  {
    label: "Build (Future)",
    icon: Boxes,
    path: "/build",
  },
  {
    label: "Environment",
    icon: Leaf,
    path: "/environment",
  },
  {
    label: "AI Assistant",
    icon: Bot,
    path: "/ai-assistant",
  },
  {
    label: "Scenarios",
    icon: Network,
    path: "/scenarios",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">

        <div className="logo-mark">
          <Compass size={25} />
        </div>

        <div className="logo-text">
          <strong>CAMPUS OS</strong>
          <span>Smart Campus Operating System</span>
        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-navigation">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >

              <div className="sidebar-item-left">

                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span>{item.label}</span>

              </div>

              <ChevronRight
                className="sidebar-chevron"
                size={17}
                strokeWidth={1.8}
              />

            </NavLink>
          );

        })}

      </nav>

      {/* AI ASSISTANT */}
      <div className="ai-assistant-box">

        <div className="ai-glow"></div>

        <div className="ai-robot">

          <Bot
            size={42}
            strokeWidth={1.5}
          />

        </div>

        <div className="ai-title">
          AI ASSISTANT
        </div>

        <div className="ai-description">
          Ask anything about campus...
        </div>

        <div className="ai-input">

          <span>
            Ask anything about campus...
          </span>

          <button>
            →
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;