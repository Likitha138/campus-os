import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="app-layout">
      <Sidebar />

      {mobileOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="app-main">
        <Topbar
          onMenu={() => setMobileOpen(true)}
        />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}