import React from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock3,
  CloudSun,
  Gauge,
  MapPin,
  Navigation,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

type DashboardStat = {
  label: string;
  value: string;
  sublabel: string;
  icon: React.ReactNode;
  trend: string;
};

const stats: DashboardStat[] = [
  {
    label: "Total Students",
    value: "3,248",
    sublabel: "Active students",
    icon: <Users size={18} />,
    trend: "+12.4%",
  },
  {
    label: "Active Buildings",
    value: "24",
    sublabel: "Campus facilities",
    icon: <Building2 size={18} />,
    trend: "+2",
  },
  {
    label: "Campus Activity",
    value: "78%",
    sublabel: "Current activity",
    icon: <Activity size={18} />,
    trend: "+8.2%",
  },
  {
    label: "System Load",
    value: "42%",
    sublabel: "Infrastructure load",
    icon: <Gauge size={18} />,
    trend: "+4.7%",
  },
];

const utilization = [
  {
    name: "Central Library",
    type: "Academic Facility",
    value: 86,
    status: "High",
  },
  {
    name: "Academic Block A",
    type: "Teaching Facility",
    value: 72,
    status: "Active",
  },
  {
    name: "Student Activity Center",
    type: "Recreation",
    value: 64,
    status: "Normal",
  },
  {
    name: "Innovation Lab",
    type: "Technology",
    value: 58,
    status: "Normal",
  },
];

const activityData = [
  { time: "06:00", value: 24 },
  { time: "08:00", value: 42 },
  { time: "10:00", value: 68 },
  { time: "12:00", value: 76 },
  { time: "14:00", value: 82 },
  { time: "16:00", value: 88 },
  { time: "18:00", value: 72 },
  { time: "20:00", value: 51 },
];

const quickActions = [
  {
    title: "Navigate Campus",
    description: "Open live campus navigation",
    icon: <Navigation size={18} />,
    href: "/navigation",
  },
  {
    title: "Start Simulation",
    description: "Run the campus simulation",
    icon: <Radio size={18} />,
    href: "/activity",
  },
  {
    title: "View Traffic",
    description: "Monitor road conditions",
    icon: <Zap size={18} />,
    href: "/traffic",
  },
  {
    title: "Campus Events",
    description: "Review scheduled events",
    icon: <CalendarDays size={18} />,
    href: "/events",
  },
];

const alerts = [
  {
    title: "Traffic congestion detected",
    description: "Main Gate → Academic Block A",
    time: "2 min ago",
    type: "warning",
  },
  {
    title: "Academic Block A occupancy rising",
    description: "Current occupancy is above 70%",
    time: "8 min ago",
    type: "info",
  },
  {
    title: "Simulation cycle completed",
    description: "Campus model updated successfully",
    time: "14 min ago",
    type: "success",
  },
];

function MiniBars() {
  return (
    <div className="dashboard-mini-bars">
      {activityData.map((item) => (
        <div className="dashboard-mini-bar-wrap" key={item.time}>
          <div
            className="dashboard-mini-bar"
            style={{ height: `${Math.max(item.value * 0.7, 12)}px` }}
          />
          <span>{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-top">
        <div className="dashboard-stat-icon">{stat.icon}</div>

        <span className="dashboard-stat-trend">
          ↗ {stat.trend}
        </span>
      </div>

      <div className="dashboard-stat-value">{stat.value}</div>

      <div className="dashboard-stat-label">{stat.label}</div>

      <div className="dashboard-stat-sublabel">
        {stat.sublabel}
      </div>

      <div className="dashboard-stat-line">
        <span />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="dashboard-hero">

        <div className="dashboard-hero-background">
          <div className="dashboard-hero-grid" />
          <div className="dashboard-hero-glow dashboard-glow-one" />
          <div className="dashboard-hero-glow dashboard-glow-two" />
        </div>

        <div className="dashboard-hero-content">

          <div className="dashboard-breadcrumb">
            <span>CAMPUS OS</span>
            <ChevronRight size={13} />
            <span>CONTROL CENTER</span>
          </div>

          <div className="dashboard-title-row">

            <div>
              <div className="dashboard-live-pill">
                <span className="dashboard-live-dot" />
                SIMULATION ONLINE
              </div>

              <h1>Campus Overview</h1>

              <p>
                Monitor campus activity, occupancy, traffic, events
                and operational intelligence from one unified control
                surface.
              </p>
            </div>

            <div className="dashboard-hero-status">

              <div className="dashboard-status-item">
                <Activity size={15} />
                <span>Activity</span>
                <strong>78%</strong>
              </div>

              <div className="dashboard-status-item">
                <Wifi size={15} />
                <span>Network</span>
                <strong className="dashboard-green">
                  Stable
                </strong>
              </div>

              <div className="dashboard-status-item">
                <CloudSun size={15} />
                <span>AQI</span>
                <strong>42</strong>
              </div>

            </div>

          </div>

          <div className="dashboard-quick-actions">

            {quickActions.map((action) => (
              <a
                href={action.href}
                className="dashboard-action-card"
                key={action.title}
              >
                <div className="dashboard-action-icon">
                  {action.icon}
                </div>

                <div>
                  <strong>{action.title}</strong>
                  <span>{action.description}</span>
                </div>

                <ArrowRight size={15} />
              </a>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}
      <section className="dashboard-section dashboard-stat-section">

        <div className="dashboard-section-heading">

          <div>
            <span className="dashboard-eyebrow">
              DIGITAL TWIN
            </span>

            <h2>Campus metrics</h2>

            <p>
              Real-time simulated infrastructure and population
              indicators.
            </p>
          </div>

          <button className="dashboard-outline-button">
            <RefreshCw size={14} />
            Refresh
          </button>

        </div>

        <div className="dashboard-stat-grid">

          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
            />
          ))}

        </div>

      </section>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}
      <section className="dashboard-main-grid">

        {/* ================================================
            CAMPUS UTILIZATION
        ================================================= */}

        <div className="dashboard-panel dashboard-utilization-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                FACILITIES
              </span>

              <h2>Campus utilization</h2>

              <p>
                Highest activity facilities right now.
              </p>
            </div>

            <a
              href="/activity"
              className="dashboard-text-button"
            >
              Details
              <ArrowRight size={14} />
            </a>

          </div>

          <div className="dashboard-utilization-list">

            {utilization.map((facility, index) => (

              <div
                className="dashboard-utilization-item"
                key={facility.name}
              >

                <div className="dashboard-utilization-number">
                  0{index + 1}
                </div>

                <div className="dashboard-utilization-main">

                  <div className="dashboard-utilization-title-row">

                    <div>
                      <h3>{facility.name}</h3>
                      <span>{facility.type}</span>
                    </div>

                    <div className="dashboard-utilization-value">
                      <strong>{facility.value}%</strong>
                      <small>{facility.status}</small>
                    </div>

                  </div>

                  <div className="dashboard-progress">
                    <span
                      style={{
                        width: `${facility.value}%`,
                      }}
                    />
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================================================
            OPERATIONAL STATE
        ================================================= */}

        <div className="dashboard-panel dashboard-operational-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                LIVE MONITOR
              </span>

              <h2>Operational state</h2>

              <p>
                Current simulated campus conditions.
              </p>
            </div>

            <div className="dashboard-live-label">
              <span />
              LIVE
            </div>

          </div>

          <div className="dashboard-operational-list">

            <div className="dashboard-operation-row">
              <div className="dashboard-operation-icon">
                <Users size={17} />
              </div>

              <div>
                <span>Campus Occupancy</span>
                <strong>63%</strong>
                <small>Students & staff</small>
              </div>

              <div className="dashboard-operation-status positive">
                Normal
              </div>
            </div>


            <div className="dashboard-operation-row">
              <div className="dashboard-operation-icon">
                <Navigation size={17} />
              </div>

              <div>
                <span>Traffic</span>
                <strong>Moderate</strong>
                <small>12 congested roads</small>
              </div>

              <div className="dashboard-operation-status warning">
                Monitor
              </div>
            </div>


            <div className="dashboard-operation-row">
              <div className="dashboard-operation-icon">
                <CloudSun size={17} />
              </div>

              <div>
                <span>Environment</span>
                <strong>AQI 42</strong>
                <small>Air quality index</small>
              </div>

              <div className="dashboard-operation-status positive">
                Good
              </div>
            </div>


            <div className="dashboard-operation-row">
              <div className="dashboard-operation-icon">
                <CalendarDays size={17} />
              </div>

              <div>
                <span>Events Today</span>
                <strong>08</strong>
                <small>03 currently active</small>
              </div>

              <div className="dashboard-operation-status info">
                Active
              </div>
            </div>


            <div className="dashboard-operation-row">
              <div className="dashboard-operation-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <span>Emergency</span>
                <strong>Secure</strong>
                <small>Safety monitoring</small>
              </div>

              <div className="dashboard-operation-status positive">
                Secure
              </div>
            </div>

          </div>

          <a
            href="/emergency"
            className="dashboard-monitor-button"
          >
            Open operational monitor
            <ArrowRight size={15} />
          </a>

        </div>

      </section>


      {/* =====================================================
          ACTIVITY + QUICK INTELLIGENCE
      ===================================================== */}
      <section className="dashboard-secondary-grid">

        <div className="dashboard-panel dashboard-activity-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                ACTIVITY ENGINE
              </span>

              <h2>Campus activity</h2>

              <p>
                Simulated activity levels throughout the day.
              </p>
            </div>

            <div className="dashboard-period-selector">
              <button className="active">Today</button>
              <button>Week</button>
              <button>Month</button>
            </div>

          </div>

          <div className="dashboard-chart-area">

            <div className="dashboard-chart-y-axis">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="dashboard-chart">

              <div className="dashboard-chart-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="dashboard-chart-bars">

                {activityData.map((item) => (

                  <div
                    className="dashboard-chart-column"
                    key={item.time}
                  >

                    <div className="dashboard-chart-tooltip">
                      {item.value}%
                    </div>

                    <div
                      className="dashboard-chart-fill"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                    <span>{item.time}</span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>


        <div className="dashboard-panel dashboard-intelligence-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                AI INSIGHTS
              </span>

              <h2>Campus intelligence</h2>

              <p>
                Automated observations from the digital twin.
              </p>
            </div>

            <div className="dashboard-ai-icon">
              <Sparkles size={17} />
            </div>

          </div>

          <div className="dashboard-ai-list">

            <div className="dashboard-ai-item">

              <div className="dashboard-ai-number">
                01
              </div>

              <div>
                <strong>
                  Academic Block A is approaching peak
                  occupancy.
                </strong>

                <span>
                  Predicted peak around 04:00 PM.
                </span>
              </div>

            </div>


            <div className="dashboard-ai-item">

              <div className="dashboard-ai-number">
                02
              </div>

              <div>
                <strong>
                  Main Gate traffic is above normal.
                </strong>

                <span>
                  Consider alternate campus routes.
                </span>
              </div>

            </div>


            <div className="dashboard-ai-item">

              <div className="dashboard-ai-number">
                03
              </div>

              <div>
                <strong>
                  Library utilization is currently high.
                </strong>

                <span>
                  Current simulated occupancy: 86%.
                </span>
              </div>

            </div>

          </div>

          <a
            href="/ai-assistant"
            className="dashboard-ai-button"
          >
            Open AI Assistant
            <ArrowRight size={15} />
          </a>

        </div>

      </section>


      {/* =====================================================
          ALERTS + TIMELINE
      ===================================================== */}
      <section className="dashboard-bottom-grid">

        <div className="dashboard-panel dashboard-alert-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                OPERATIONS
              </span>

              <h2>Recent alerts</h2>

              <p>
                Latest system events and notifications.
              </p>
            </div>

            <a
              href="/alerts"
              className="dashboard-text-button"
            >
              View all
              <ArrowRight size={14} />
            </a>

          </div>

          <div className="dashboard-alert-list">

            {alerts.map((alert) => (

              <div
                className={`dashboard-alert-item ${alert.type}`}
                key={alert.title}
              >

                <div className="dashboard-alert-icon">

                  {alert.type === "warning" && (
                    <Zap size={15} />
                  )}

                  {alert.type === "info" && (
                    <Bell size={15} />
                  )}

                  {alert.type === "success" && (
                    <ShieldCheck size={15} />
                  )}

                </div>

                <div className="dashboard-alert-content">

                  <strong>{alert.title}</strong>

                  <span>
                    {alert.description}
                  </span>

                </div>

                <time>{alert.time}</time>

              </div>

            ))}

          </div>

        </div>


        <div className="dashboard-panel dashboard-status-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="dashboard-panel-eyebrow">
                SIMULATION
              </span>

              <h2>System timeline</h2>

              <p>
                Current simulation cycle.
              </p>
            </div>

            <div className="dashboard-system-icon">
              <Radio size={17} />
            </div>

          </div>

          <div className="dashboard-timeline">

            <div className="dashboard-timeline-item active">

              <div className="dashboard-timeline-marker">
                <span />
              </div>

              <div>
                <strong>
                  Simulation online
                </strong>

                <span>
                  Digital twin engine connected
                </span>

                <time>Now</time>
              </div>

            </div>


            <div className="dashboard-timeline-item">

              <div className="dashboard-timeline-marker">
                <span />
              </div>

              <div>
                <strong>
                  Environment updated
                </strong>

                <span>
                  AQI and environmental state refreshed
                </span>

                <time>5 min ago</time>
              </div>

            </div>


            <div className="dashboard-timeline-item">

              <div className="dashboard-timeline-marker">
                <span />
              </div>

              <div>
                <strong>
                  Traffic model recalculated
                </strong>

                <span>
                  12 congestion points detected
                </span>

                <time>12 min ago</time>
              </div>

            </div>


            <div className="dashboard-timeline-item">

              <div className="dashboard-timeline-marker">
                <span />
              </div>

              <div>
                <strong>
                  Campus data synchronized
                </strong>

                <span>
                  Student and facility records updated
                </span>

                <time>18 min ago</time>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER STATUS
      ===================================================== */}
      <section className="dashboard-footer-status">

        <div className="dashboard-footer-left">

          <div className="dashboard-footer-live">
            <span />
            SYSTEM ONLINE
          </div>

          <span>
            Campus OS Digital Twin
          </span>

        </div>

        <div className="dashboard-footer-right">

          <span>
            <Clock3 size={13} />
            Simulation cycle: 00:42:18
          </span>

          <span>
            <MapPin size={13} />
            Bengaluru Campus
          </span>

          <span>
            <ShieldCheck size={13} />
            All systems operational
          </span>

        </div>

      </section>

    </div>
  );
}