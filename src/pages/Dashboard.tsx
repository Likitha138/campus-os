import { useEffect, useState } from "react";
import {
  Activity as ActivityIcon,
  ArrowRight,
  Bell,
  Car,
  CloudSun,
  MapPin,
  Users,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Campus3D from "../components/Campus3D";
import EventNotificationPanel from "../components/EventNotificationPanel";

import { activityData, campusStats, trafficData } from "../data/campus";
import { api } from "../services/api";

interface DashboardData {
  buildings: number;
  rooms: number;
  students: number;
  eventsToday: number;
  occupancy: number;
  airQuality: {
    value: number;
    status: string;
  };
  traffic: string;
  trafficDetails: {
    roadName: string;
    zone: string;
    vehicleCount: number;
    averageSpeed: number;
    level: string;
  } | null;
  attendance: {
    totalClasses: number;
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
  academic: {
    totalExams: number;
    totalObtained: number;
    totalPossible: number;
    averagePercentage: number;
  };
  assignments: {
    total: number;
    pending: number;
    submitted: number;
    overdue: number;
  };
  unreadAlerts: number;
}

interface DashboardResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get<DashboardResponse>("/dashboard");

      if (!response.success) {
        throw new Error(
          response.message || "Unable to load dashboard"
        );
      }

      setDashboard(response.data);
    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Dashboard connection failed"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = dashboard;

  const trafficZones = stats?.trafficDetails
    ? [
        {
          zone: stats.trafficDetails.zone || "Campus Road",
          vehicles: stats.trafficDetails.vehicleCount,
          status: stats.trafficDetails.level,
        },
      ]
    : trafficData;

  return (
    <div className="page">

      <PageHeader
        eyebrow="CAMPUS OS / EXPLORE"
        title="Welcome to Campus OS"
        description="Explore. Simulate. Optimize. Your intelligent digital campus twin."
        action="View live activity"
        onAction={() => navigate("/activity")}
      />

      {/* DATABASE CONNECTION STATUS */}

      {loading && (
        <div className="data-card" style={{ marginBottom: 20 }}>
          Loading campus data...
        </div>
      )}

      {error && (
        <div className="data-card" style={{ marginBottom: 20 }}>
          <strong>Dashboard connection failed</strong>
          <p>{error}</p>
          <button className="primary-button" onClick={loadDashboard}>
            Retry
          </button>
        </div>
      )}

      {/* HERO */}

      <div className="dashboard-hero">

        <div className="hero-copy">

          <span className="hero-badge">
            <span className="live-dot" />
            DIGITAL TWIN ONLINE
          </span>

          <h2>
            Your campus,
            <br />
            <span>intelligently connected.</span>
          </h2>

          <p>
            Monitor campus activity, traffic, environment, events and
            student intelligence from one unified control layer.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={() => navigate("/activity")}
            >
              Explore Campus
              <ArrowRight size={16} />
            </button>

            <button
              className="ghost-button"
              onClick={() => navigate("/navigation")}
            >
              <MapPin size={16} />
              Navigate
            </button>

          </div>

        </div>

        <div className="hero-metrics">

          <div>
            <span>Occupancy</span>
            <strong>
              {stats?.occupancy ?? campusStats.occupancy}%
            </strong>
          </div>

          <div>
            <span>Traffic</span>
            <strong>
              {stats?.traffic ?? campusStats.traffic}
            </strong>
          </div>

          <div>
            <span>AQI</span>
            <strong>
              {stats?.airQuality.value ?? campusStats.aqi}
            </strong>
          </div>

        </div>

      </div>

      {/* MAIN STATISTICS */}

      <div className="stats-grid">

        <StatCard
          label="Registered Students"
          value={stats?.students.toLocaleString() ?? campusStats.students.toLocaleString()}
          change="Database"
          trend="up"
          icon="users"
        />

        <StatCard
          label="Campus Buildings"
          value={stats?.buildings ?? campusStats.buildings}
          change="Database"
          trend="up"
          icon="buildings"
        />

        <StatCard
          label="Campus Rooms"
          value={stats?.rooms ?? 0}
          change="Database"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Events Today"
          value={stats?.eventsToday ?? 0}
          change="Database"
          trend="up"
          icon="traffic"
        />

      </div>

      {/* CAMPUS 3D AND EVENTS */}

      <div className="dashboard-grid">

        <div className="dashboard-main-card">
          <Campus3D />
        </div>

        <EventNotificationPanel />

      </div>

      {/* CAMPUS INTELLIGENCE */}

      <div className="section-heading">
        <div>
          <span className="eyebrow">CAMPUS PULSE</span>
          <h2>Current campus intelligence</h2>
        </div>
      </div>

      <div className="insight-grid">

        {/* STUDENT ACTIVITY */}

        <div className="data-card">

          <div className="card-heading">

            <div>
              <span className="icon-heading">
                <ActivityIcon size={16} />
              </span>

              <div>
                <strong>Student Activity</strong>
                <small>Hourly movement simulation</small>
              </div>
            </div>

            <span className="positive">Simulation</span>

          </div>

          <div className="activity-bars">

            {activityData.map((item) => (
              <div className="bar-column" key={item.time}>

                <div
                  className="activity-bar"
                  style={{
                    height: `${Math.max(
                      18,
                      item.students / 20
                    )}px`,
                  }}
                />

                <span>{item.time}</span>

              </div>
            ))}

          </div>

        </div>

        {/* TRAFFIC */}

        <div className="data-card">

          <div className="card-heading">

            <div>
              <span className="icon-heading">
                <Car size={16} />
              </span>

              <div>
                <strong>Traffic Zones</strong>
                <small>Current vehicle density</small>
              </div>
            </div>

          </div>

          <div className="traffic-list">

            {trafficZones.map((zone, index) => (
              <div
                className="traffic-row"
                key={`${zone.zone}-${index}`}
              >

                <div>
                  <strong>{zone.zone}</strong>
                  <small>{zone.vehicles} vehicles</small>
                </div>

                <span
                  className={`status-pill ${String(
                    zone.status
                  ).toLowerCase()}`}
                >
                  {zone.status}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* ENVIRONMENT */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <CloudSun size={25} />
          </div>

          <span className="eyebrow">ENVIRONMENT</span>

          <strong>
            {stats?.airQuality.status ?? "Good"} air quality
          </strong>

          <p>
            AQI {stats?.airQuality.value ?? 42} · Simulated environment data
          </p>

          <button onClick={() => navigate("/environment")}>
            Open environment <ArrowRight size={14} />
          </button>

        </div>

        {/* EVENTS */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <Bell size={25} />
          </div>

          <span className="eyebrow">EVENTS</span>

          <strong>
            {stats?.eventsToday ?? 0} events today
          </strong>

          <p>Campus events scheduled for today.</p>

          <button onClick={() => navigate("/events")}>
            View events <ArrowRight size={14} />
          </button>

        </div>

        {/* ATTENDANCE */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <ClipboardCheck size={25} />
          </div>

          <span className="eyebrow">ATTENDANCE</span>

          <strong>
            {stats?.attendance.percentage ?? 0}%
          </strong>

          <p>
            Today's overall recorded attendance.
          </p>

          <button onClick={() => navigate("/attendance")}>
            View attendance <ArrowRight size={14} />
          </button>

        </div>

        {/* ACADEMIC PERFORMANCE */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <BookOpen size={25} />
          </div>

          <span className="eyebrow">ACADEMIC PERFORMANCE</span>

          <strong>
            {stats?.academic.averagePercentage ?? 0}%
          </strong>

          <p>
            Overall recorded examination performance.
          </p>

          <button onClick={() => navigate("/marks")}>
            View marks <ArrowRight size={14} />
          </button>

        </div>

        {/* ASSIGNMENTS */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <ClipboardCheck size={25} />
          </div>

          <span className="eyebrow">ASSIGNMENTS</span>

          <strong>
            {stats?.assignments.pending ?? 0} pending
          </strong>

          <p>
            {stats?.assignments.total ?? 0} total assignments.
          </p>

          <button onClick={() => navigate("/assignments")}>
            View assignments <ArrowRight size={14} />
          </button>

        </div>

        {/* NOTIFICATIONS */}

        <div className="data-card quick-card">

          <div className="quick-icon">
            <Bell size={25} />
          </div>

          <span className="eyebrow">NOTIFICATIONS</span>

          <strong>
            {stats?.unreadAlerts ?? 0} unread alerts
          </strong>

          <p>Campus alerts and important notifications.</p>

          <button onClick={() => navigate("/notifications")}>
            View notifications <ArrowRight size={14} />
          </button>

        </div>

      </div>

      {/* FOOTER */}

      <div className="dashboard-footer-banner">

        <div>
          <Users size={20} />

          <div>
            <strong>Campus access</strong>

            <span>
              Login to view personalized attendance, marks,
              assignments and notifications.
            </span>
          </div>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/register")}
        >
          Student Login
        </button>

      </div>

    </div>
  );
}