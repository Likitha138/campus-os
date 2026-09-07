import React from "react";

import {
  Search,
  Route,
  Ruler,
  Layers,
  Info,
  RotateCcw,
  BookOpen,
  Utensils,
  FlaskConical,
  CarFront,
  Users,
  Leaf,
  MapPin,
  CalendarDays,
  Building2,
  AlertTriangle,
  CloudSun,
  Compass,
  Navigation,
  Activity,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const activityData = [
  { time: "6 AM", students: 700, faculty: 500, visitors: 300 },
  { time: "9 AM", students: 1800, faculty: 1200, visitors: 700 },
  { time: "12 PM", students: 2500, faculty: 1600, visitors: 1300 },
  { time: "3 PM", students: 2100, faculty: 2200, visitors: 1500 },
  { time: "6 PM", students: 1500, faculty: 1800, visitors: 1200 },
  { time: "9 PM", students: 1300, faculty: 1500, visitors: 900 },
];

function Dashboard() {
  return (
    <div className="campus-dashboard">

      {/* HERO HEADER */}
      <section className="dashboard-hero">

        <div>
          <div className="welcome-small">
            WELCOME TO
          </div>

          <h1>
            CAMPUS OS
          </h1>

          <p>
            Explore. Simulate. Optimize.
          </p>

          <span>
            Your intelligent 3D campus twin.
          </span>
        </div>

        {/* Dashboard tabs */}
        <div className="dashboard-tabs">
          <button className="dashboard-tab active">
            <CompassIcon />
            <span>Explore</span>
          </button>

          <button className="dashboard-tab">
            <NavigationIcon />
            <span>Navigate</span>
          </button>

          <button className="dashboard-tab">
            <ActivityIcon />
            <span>Activity</span>
          </button>

          <button className="dashboard-tab">
            <CarFront size={21} />
            <span>Traffic</span>
          </button>

          <button className="dashboard-tab">
            <CalendarDays size={21} />
            <span>Events</span>
          </button>

          <button className="dashboard-tab">
            <span className="more-dots">•••</span>
            <span>More</span>
          </button>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="main-dashboard-grid">

        {/* CAMPUS MAP */}
        <div className="campus-map-card">

          <div className="map-stat-cards">

            <div className="map-stat">
              <Building2 size={20} />
              <div>
                <small>BUILDINGS</small>
                <strong>24</strong>
              </div>
            </div>

            <div className="map-stat">
              <BookOpen size={20} />
              <div>
                <small>ROOMS</small>
                <strong>215</strong>
              </div>
            </div>

            <div className="map-stat">
              <Users size={20} />
              <div>
                <small>STUDENTS</small>
                <strong>3,248</strong>
              </div>
            </div>

          </div>

          {/* Campus twin */}
          <div className="campus-map">

            <div className="map-glow"></div>

            {/* Roads */}
            <div className="road road-one"></div>
            <div className="road road-two"></div>
            <div className="road road-three"></div>

            {/* Green areas */}
            <div className="tree-zone tree-zone-one"></div>
            <div className="tree-zone tree-zone-two"></div>
            <div className="tree-zone tree-zone-three"></div>

            {/* Buildings */}
            <div className="building building-a">
              <span>BLOCK A</span>
            </div>

            <div className="building building-b">
              <span>BLOCK B</span>
            </div>

            <div className="building building-c">
              <span>BLOCK C</span>
            </div>

            <div className="building building-library">
              <span>LIBRARY</span>
            </div>

            <div className="building building-auditorium">
              <span>AUDITORIUM</span>
            </div>

            <div className="building building-admin">
              <span>ADMIN BLOCK</span>
            </div>

            {/* Sports ground */}
            <div className="sports-ground">
              <div className="football-field">
                <div className="field-line"></div>
                <div className="field-circle"></div>
              </div>
            </div>

            {/* Map pin */}
            <div className="map-pin">
              <MapPin size={25} fill="currentColor" />
            </div>

            {/* Map controls */}
            <div className="map-controls">

              <button>2D</button>

              <button className="selected-control">
                3D
              </button>

              <button>
                <Layers size={18} />
              </button>

              <button>+</button>
              <button>−</button>

              <button>
                <RotateCcw size={17} />
              </button>

            </div>

            {/* Bottom map toolbar */}
            <div className="map-toolbar">

              <button>
                <Search size={20} />
                <span>Search</span>
              </button>

              <button>
                <Route size={20} />
                <span>Route</span>
              </button>

              <button>
                <Ruler size={20} />
                <span>Measure</span>
              </button>

              <button>
                <Layers size={20} />
                <span>Layers</span>
              </button>

              <button>
                <Info size={20} />
                <span>Info</span>
              </button>

              <button>
                <RotateCcw size={20} />
                <span>Reset View</span>
              </button>

            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-dashboard">

          {/* Campus status */}
          <div className="side-card">

            <div className="side-card-header">
              <h3>CAMPUS STATUS</h3>

              <span className="live-status">
                <i></i>
                Live
              </span>
            </div>

            <div className="status-grid">

              <StatusBox
                icon={<Users size={22} />}
                title="Occupancy"
                value="63%"
                sub="Medium"
                type="orange"
              />

              <StatusBox
                icon={<CarFront size={22} />}
                title="Traffic"
                value="Moderate"
                sub="Smooth Flow"
                type="green"
              />

              <StatusBox
                icon={<CalendarDays size={22} />}
                title="Events Today"
                value="2"
                sub="Active"
                type="red"
              />

              <StatusBox
                icon={<Leaf size={22} />}
                title="Air Quality"
                value="Good"
                sub="AQI 42"
                type="green"
              />

            </div>
          </div>

          {/* Events */}
          <div className="side-card">

            <div className="side-card-header">
              <h3>UPCOMING EVENTS</h3>

              <button className="view-all">
                View All
              </button>
            </div>

            <EventItem
              icon={<CalendarDays size={20} />}
              title="Annual Tech Fest"
              date="15 - 17 Aug 2026"
              place="Main Auditorium"
              color="purple"
            />

            <EventItem
              icon={<CalendarDays size={20} />}
              title="Placement Drive"
              date="20 Aug 2026"
              place="Placement Cell"
              color="blue"
            />

            <EventItem
              icon={<Users size={20} />}
              title="Sports Meet"
              date="25 Aug 2026"
              place="Sports Complex"
              color="green"
            />

          </div>

          {/* Activity chart */}
          <div className="side-card activity-card">

            <div className="side-card-header">
              <h3>CAMPUS ACTIVITY (LIVE)</h3>
            </div>

            <div className="chart-legend">
              <span className="legend-student">
                <i></i> Students
              </span>

              <span className="legend-faculty">
                <i></i> Faculty
              </span>

              <span className="legend-visitor">
                <i></i> Visitors
              </span>
            </div>

            <div className="activity-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <XAxis
                    dataKey="time"
                    tick={{
                      fill: "#64748b",
                      fontSize: 9,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#64748b",
                      fontSize: 9,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0b1728",
                      border: "1px solid rgba(100,116,139,.3)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="faculty"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </section>

      {/* BOTTOM CARDS */}
      <section className="bottom-dashboard-grid">

        {/* Quick actions */}
        <div className="bottom-card">

          <h3>QUICK ACTIONS</h3>

          <div className="quick-actions">

            <QuickAction
              icon={<Navigation size={23} />}
              title="Find Route"
              type="green"
            />

            <QuickAction
              icon={<CalendarDays size={23} />}
              title="Book Facility"
              type="purple"
            />

            <QuickAction
              icon={<AlertTriangle size={23} />}
              title="Report Issue"
              type="red"
            />

          </div>
        </div>

        {/* Shortcuts */}
        <div className="bottom-card">

          <h3>SHORTCUTS</h3>

          <div className="shortcut-grid">

            <Shortcut icon={<BookOpen />} name="Library" />
            <Shortcut icon={<Utensils />} name="Canteen" />
            <Shortcut icon={<FlaskConical />} name="Labs" />
            <Shortcut icon={<CarFront />} name="Parking" />
            <Shortcut icon={<Users />} name="Washroom" />
            <Shortcut icon={<Leaf />} name="Help Desk" />

          </div>
        </div>

        {/* Weather */}
        <div className="bottom-card weather-card">

          <h3>WEATHER</h3>

          <div className="weather-main">
            <CloudSun size={48} />

            <div>
              <strong>28°C</strong>
              <span>Partly Cloudy</span>
            </div>
          </div>

          <div className="weather-details">
            <div>
              <small>Humidity</small>
              <strong>60%</strong>
            </div>

            <div>
              <small>Wind</small>
              <strong>12 km/h</strong>
            </div>

            <div>
              <small>Feels like</small>
              <strong>30°C</strong>
            </div>
          </div>

        </div>

        {/* Mini map */}
        <div className="bottom-card mini-map-card">

          <h3>CAMPUS MAP OVERVIEW</h3>

          <div className="mini-map">
            <div className="mini-road mini-road-one"></div>
            <div className="mini-road mini-road-two"></div>
            <div className="mini-campus-zone"></div>
          </div>

        </div>

      </section>

    </div>
  );
}

/* ---------- Small Components ---------- */

function StatusBox({
  icon,
  title,
  value,
  sub,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  type: string;
}) {
  return (
    <div className="status-box">
      <div className={`status-icon ${type}`}>
        {icon}
      </div>

      <div>
        <small>{title}</small>
        <strong>{value}</strong>
        <span className={type}>{sub}</span>
      </div>
    </div>
  );
}

function EventItem({
  icon,
  title,
  date,
  place,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  date: string;
  place: string;
  color: string;
}) {
  return (
    <div className="event-item">

      <div className={`event-icon ${color}`}>
        {icon}
      </div>

      <div className="event-info">
        <strong>{title}</strong>

        <span>
          <CalendarDays size={12} />
          {date}
        </span>

        <span>
          <MapPin size={12} />
          {place}
        </span>
      </div>

      <span className={`event-badge ${color}`}>
        UPCOMING
      </span>

    </div>
  );
}

function QuickAction({
  icon,
  title,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  type: string;
}) {
  return (
    <button className={`quick-action ${type}`}>
      {icon}
      <span>{title}</span>
    </button>
  );
}

function Shortcut({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) {
  return (
    <button className="shortcut-item">
      <div>{icon}</div>
      <span>{name}</span>
    </button>
  );
}

function CompassIcon() {
  return <Compass size={21} />;
}

function NavigationIcon() {
  return <Navigation size={21} />;
}

function ActivityIcon() {
  return <Activity size={21} />;
}

export default Dashboard;