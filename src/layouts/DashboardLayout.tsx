// ============================================================
// src/layouts/DashboardLayout.tsx
// ============================================================

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="campus-layout">
      <div
        className={`sidebar-wrapper ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="campus-main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="campus-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;