import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";
import AIPerformance from "./pages/AIPerformance";
import Career from "./pages/Career";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

// Campus OS pages
import NavigationPage from "./pages/Navigation";
import ActivityPage from "./pages/Activity";
import TrafficPage from "./pages/Traffic";
import EventsPage from "./pages/Events";
import EmergencyPage from "./pages/Emergency";
import BuildPage from "./pages/Build";
import EnvironmentPage from "./pages/Environment";
import AIAssistantPage from "./pages/AIAssistant";
import ScenariosPage from "./pages/Scenarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          {/* Main */}
          <Route path="/" element={<Dashboard />} />

          {/* Academic */}
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-performance" element={<AIPerformance />} />
          <Route path="/career" element={<Career />} />
          <Route path="/alerts" element={<Alerts />} />

          {/* Campus OS */}
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/environment" element={<EnvironmentPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;