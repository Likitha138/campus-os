import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  return (
    <div className="app-layout">

      {/* Left navigation */}
      <Sidebar />

      {/* Main application area */}
      <div className="main-area">

        {/* Top navigation */}
        <Topbar />

        {/* Current page */}
        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;