import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      <AuthProvider>
        <Routes>
          {/* =====================================================
              MAIN APPLICATION LAYOUT
          ===================================================== */}

          <Route element={<DashboardLayout />}>
            {/* PUBLIC DASHBOARD */}

            <Route
              index
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/explore"
              element={<Dashboard />}
            />

            {/* =================================================
                LOGIN / REGISTER
            ================================================= */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* =================================================
                PROTECTED CAMPUS OS AREA
            ================================================= */}

            <Route element={<ProtectedRoute />}>
              <Route
                path="/activity"
                element={<Activity />}
              />

              <Route
                path="/navigation"
                element={<Navigation />}
              />

              <Route
                path="/traffic"
                element={<Traffic />}
              />

              <Route
                path="/events"
                element={<Events />}
              />

              <Route
                path="/emergency"
                element={<Emergency />}
              />

              <Route
                path="/build"
                element={<Build />}
              />

              <Route
                path="/environment"
                element={<Environment />}
              />

              <Route
                path="/scenarios"
                element={<Scenarios />}
              />

              <Route
                path="/ai"
                element={<AIAssistant />}
              />

              <Route
                path="/attendance"
                element={<Attendance />}
              />

              <Route
                path="/marks"
                element={<Marks />}
              />

              <Route
                path="/assignments"
                element={<Assignments />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />

              <Route
                path="/alerts"
                element={<Alerts />}
              />

              <Route
                path="/notifications"
                element={<Notifications />}
              />

              <Route
                path="/career"
                element={<Career />}
              />

              <Route
                path="/ai-performance"
                element={<AIPerformance />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />
            </Route>

            {/* =================================================
                FALLBACK
            ================================================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}