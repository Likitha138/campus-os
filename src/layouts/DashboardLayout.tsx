import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  return (
    <div className="campus-layout">

      {/* SIDEBAR */}
      <div className="campus-sidebar">
        <Sidebar />
      </div>

      {/* MAIN APPLICATION AREA */}
      <div className="campus-main">

        <Topbar />

        <main className="campus-page">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;