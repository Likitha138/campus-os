import {
  Activity as ActivityIcon,
  ArrowRight,
  Bell,
  Car,
  CloudSun,
  MapPin,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Campus3D from "../components/Campus3D";
import EventNotificationPanel from "../components/EventNotificationPanel";
import { activityData, campusStats, trafficData } from "../data/campus";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS OS / EXPLORE"
        title="Welcome to Campus OS"
        description="Explore. Simulate. Optimize. Your intelligent digital campus twin."
        action="View live activity"
        onAction={() => navigate("/activity")}
      />

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
            <strong>{campusStats.occupancy}%</strong>
          </div>

          <div>
            <span>Traffic</span>
            <strong>{campusStats.traffic}</strong>
          </div>

          <div>
            <span>AQI</span>
            <strong>{campusStats.aqi}</strong>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Active Students"
          value={campusStats.students.toLocaleString()}
          change="+4.8%"
          trend="up"
          icon="users"
        />

        <StatCard
          label="Campus Buildings"
          value={campusStats.buildings}
          change="+2"
          trend="up"
          icon="buildings"
        />

        <StatCard
          label="Live Occupancy"
          value={campusStats.occupancy}
          suffix="%"
          change="+6.2%"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Active Vehicles"
          value="217"
          change="-3.4%"
          trend="down"
          icon="traffic"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main-card">
          <Campus3D />
        </div>

        <EventNotificationPanel />
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">CAMPUS PULSE</span>
          <h2>Current campus intelligence</h2>
        </div>
      </div>

      <div className="insight-grid">
        <div className="data-card">
          <div className="card-heading">
            <div>
              <span className="icon-heading">
                <ActivityIcon size={16} />
              </span>
              <div>
                <strong>Student Activity</strong>
                <small>Hourly movement</small>
              </div>
            </div>
            <span className="positive">+12.4%</span>
          </div>

          <div className="activity-bars">
            {activityData.map((item) => (
              <div className="bar-column" key={item.time}>
                <div
                  className="activity-bar"
                  style={{ height: `${Math.max(18, item.students / 20)}px` }}
                />
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

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
            {trafficData.map((zone) => (
              <div className="traffic-row" key={zone.zone}>
                <div>
                  <strong>{zone.zone}</strong>
                  <small>{zone.vehicles} vehicles</small>
                </div>

                <span className={`status-pill ${zone.status.toLowerCase()}`}>
                  {zone.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="data-card quick-card">
          <div className="quick-icon">
            <CloudSun size={25} />
          </div>
          <span className="eyebrow">ENVIRONMENT</span>
          <strong>Good air quality</strong>
          <p>AQI 42 · Temperature 26°C · Humidity 61%</p>
          <button onClick={() => navigate("/environment")}>
            Open environment <ArrowRight size={14} />
          </button>
        </div>

        <div className="data-card quick-card">
          <div className="quick-icon">
            <Bell size={25} />
          </div>
          <span className="eyebrow">EVENTS</span>
          <strong>2 events today</strong>
          <p>Placement orientation and campus activities are scheduled.</p>
          <button onClick={() => navigate("/events")}>
            View events <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="dashboard-footer-banner">
        <div>
          <Users size={20} />
          <div>
            <strong>Campus access</strong>
            <span>
              Login to view personalized attendance, marks, assignments and
              notifications.
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