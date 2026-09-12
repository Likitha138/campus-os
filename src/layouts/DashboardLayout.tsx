import {
  Search,
  Sun,
  Bell,
  ChevronDown,
  User,
} from "lucide-react";

import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="app-shell">

      {/* =========================
          LEFT SIDEBAR
      ========================= */}
      <Sidebar />

      {/* =========================
          RIGHT SIDE
      ========================= */}
      <div className="app-main">

        {/* =========================
            TOP HEADER
        ========================= */}
        <header className="top-header">

          {/* Search */}
          <div className="top-search">

            <Search
              size={19}
              strokeWidth={1.8}
            />

            <input
              type="text"
              placeholder="Search for buildings, rooms, labs..."
            />

            <span className="search-shortcut">
              ⌘ K
            </span>

          </div>

          {/* Header Right */}
          <div className="header-actions">

            {/* Weather */}
            <div className="header-weather">

              <Sun
                size={21}
                strokeWidth={1.8}
              />

              <strong>28°C</strong>

            </div>

            {/* Time */}
            <div className="header-time">
              12:45 PM
            </div>

            {/* Divider */}
            <div className="header-divider"></div>

            {/* Notification */}
            <button className="notification-button">

              <Bell
                size={21}
                strokeWidth={1.8}
              />

              <span className="notification-count">
                3
              </span>

            </button>

            {/* Profile */}
            <button className="profile-button">

              <div className="profile-avatar">
                <User
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div className="profile-info">

                <strong>
                  Likitha
                </strong>

                <span>
                  Student
                </span>

              </div>

              <ChevronDown
                size={16}
                strokeWidth={1.8}
              />

            </button>

          </div>

        </header>

        {/* =========================
            PAGE CONTENT
        ========================= */}
        <main className="app-content">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;