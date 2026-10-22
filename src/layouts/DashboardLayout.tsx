import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useAuth } from "../auth/AuthContext";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const session = {
    user,
    isAuthenticated,
    logout,
  };

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        session={session}
      />

      <div className="main-shell">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          session={session}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}