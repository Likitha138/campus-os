import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import Navigation from "./pages/Navigation";
import Traffic from "./pages/Traffic";
import Events from "./pages/Events";
import Emergency from "./pages/Emergency";
import Build from "./pages/Build";
import Environment from "./pages/Environment";
import Scenarios from "./pages/Scenarios";
import AIAssistant from "./pages/AIAssistant";

import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Notifications from "./pages/Notifications";
import Career from "./pages/Career";
import AIPerformance from "./pages/AIPerformance";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/events" element={<Events />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/build" element={<Build />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/ai" element={<AIAssistant />} />

          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/career" element={<Career />} />
          <Route path="/ai-performance" element={<AIPerformance />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/explore" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}