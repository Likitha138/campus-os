import {
  Search,
  Route,
  Ruler,
  Layers,
  Info,
  RotateCcw,
  Plus,
  Minus,
  Navigation,
  Users,
  Car,
  CalendarDays,
  Leaf,
  Library,
  Utensils,
  FlaskConical,
  ParkingCircle,
  Accessibility,
  CircleHelp,
  Map,
  CloudSun,
  TriangleAlert,
  ChevronRight,
  Bell,
  Sun,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import campusMap from "../assets/campus-map.svg";

const activityData = [
  { time: "6 AM", students: 800, faculty: 500, visitors: 300 },
  { time: "9 AM", students: 1800, faculty: 1000, visitors: 650 },
  { time: "12 PM", students: 2400, faculty: 1400, visitors: 1100 },
  { time: "3 PM", students: 2200, faculty: 1800, visitors: 1400 },
  { time: "6 PM", students: 1500, faculty: 1000, visitors: 1100 },
  { time: "9 PM", students: 1200, faculty: 900, visitors: 700 },
];

const events = [
  {
    title: "Annual Tech Fest",
    date: "15 - 17 Aug 2026",
    location: "Main Auditorium",
    type: "purple",
  },
  {
    title: "Placement Drive",
    date: "20 Aug 2026",
    location: "Placement Cell",
    type: "blue",
  },
  {
    title: "Sports Meet",
    date: "25 Aug 2026",
    location: "Sports Complex",
    type: "green",
  },
];

function Dashboard() {
  return (
    <div className="explore-page">

      {/* =========================================
          TOP HEADER AREA
      ========================================= */}

      <section className="explore-header">

        <div className="explore-heading">
          <span>WELCOME TO</span>

          <h1>CAMPUS OS</h1>

          <p>Explore. Simulate. Optimize.</p>

          <small>Your intelligent 3D campus twin.</small>
        </div>

        <div className="explore-tabs">

          <button className="explore-tab active">
            <Map size={18} />
            <span>Explore</span>
          </button>

          <button className="explore-tab">
            <Navigation size={18} />
            <span>Navigate</span>
          </button>

          <button className="explore-tab">
            <ActivityIcon />
            <span>Activity</span>
          </button>

          <button className="explore-tab">
            <Car size={18} />
            <span>Traffic</span>
          </button>

          <button className="explore-tab">
            <CalendarDays size={18} />
            <span>Events</span>
          </button>

          <button className="explore-tab">
            <span className="more-dots">•••</span>
            <span>More</span>
          </button>

        </div>

      </section>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="dashboard-main-grid">

        {/* =====================================
            CAMPUS MAP
        ===================================== */}

        <div className="campus-map-panel">

          {/* Statistics floating over map */}

          <div className="map-statistics">

            <div className="map-stat">

              <div className="map-stat-icon purple">
                <Map size={21} />
              </div>

              <div>
                <span>BUILDINGS</span>
                <strong>24</strong>
              </div>

            </div>


            <div className="map-stat">

              <div className="map-stat-icon green">
                <Library size={21} />
              </div>

              <div>
                <span>ROOMS</span>
                <strong>215</strong>
              </div>

            </div>


            <div className="map-stat">

              <div className="map-stat-icon orange">
                <Users size={21} />
              </div>

              <div>
                <span>STUDENTS</span>
                <strong>3,248</strong>
              </div>

            </div>

          </div>


          {/* Map */}

          <div className="campus-map">

            <img
              src={campusMap}
              alt="Campus digital twin"
              className="campus-map-image"
            />

            {/* Map labels */}

            <div className="map-label label-library">
              LIBRARY
            </div>

            <div className="map-label label-auditorium">
              AUDITORIUM
            </div>

            <div className="map-label label-a">
              BLOCK A
            </div>

            <div className="map-label label-b">
              BLOCK B
            </div>

            <div className="map-label label-c">
              BLOCK C
            </div>

            <div className="map-label label-admin">
              ADMIN BLOCK
            </div>


            {/* Location marker */}

            <div className="campus-marker">
              <Navigation size={24} fill="currentColor" />
            </div>


            {/* 2D / 3D controls */}

            <div className="map-mode-controls">

              <button>
                2D
              </button>

              <button className="selected">
                3D
              </button>

              <button>
                <Layers size={18} />
              </button>

              <button>
                <Plus size={19} />
              </button>

              <button>
                <Minus size={19} />
              </button>

              <button>
                <RotateCcw size={18} />
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


        {/* =====================================
            RIGHT SIDEBAR
        ===================================== */}

        <aside className="right-dashboard">

          {/* Campus Status */}

          <div className="side-panel">

            <div className="panel-heading">

              <h3>CAMPUS STATUS</h3>

              <span className="live-badge">
                <span></span>
                Live
              </span>

            </div>


            <div className="status-grid">

              <StatusCard
                icon={<Users />}
                value="63%"
                label="Occupancy"
                note="Medium"
                type="orange"
              />

              <StatusCard
                icon={<Car />}
                value="Moderate"
                label="Traffic"
                note="Smooth Flow"
                type="green"
              />

              <StatusCard
                icon={<CalendarDays />}
                value="2"
                label="Events Today"
                note="Active"
                type="red"
              />

              <StatusCard
                icon={<Leaf />}
                value="Good"
                label="Air Quality"
                note="AQI 42"
                type="green"
              />

            </div>

          </div>


          {/* Upcoming Events */}

          <div className="side-panel">

            <div className="panel-heading">

              <h3>UPCOMING EVENTS</h3>

              <a href="#">
                View All
              </a>

            </div>


            <div className="events-list">

              {events.map((event) => (

                <div
                  className="event-row"
                  key={event.title}
                >

                  <div
                    className={`event-icon ${event.type}`}
                  >
                    <CalendarDays size={17} />
                  </div>


                  <div className="event-info">

                    <strong>
                      {event.title}
                    </strong>

                    <span>
                      ▣ {event.date}
                    </span>

                    <span>
                      ⌖ {event.location}
                    </span>

                  </div>


                  <span
                    className={`event-status ${event.type}`}
                  >
                    UPCOMING
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* Campus Activity */}

          <div className="side-panel activity-panel">

            <div className="panel-heading">

              <h3>
                CAMPUS ACTIVITY (LIVE)
              </h3>

            </div>


            <div className="activity-legend">

              <span>
                <i className="legend-student"></i>
                Students
              </span>

              <span>
                <i className="legend-faculty"></i>
                Faculty
              </span>

              <span>
                <i className="legend-visitor"></i>
                Visitors
              </span>

            </div>


            <div className="activity-chart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={activityData}>

                  <XAxis
                    dataKey="time"
                    tick={{
                      fill: "#718096",
                      fontSize: 9,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#718096",
                      fontSize: 9,
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `${value / 1000}K`
                    }
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#081321",
                      border:
                        "1px solid rgba(96,165,250,.25)",
                      borderRadius: 8,
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#26d67b"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="faculty"
                    stroke="#3d8bff"
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

        </aside>

      </section>


      {/* =========================================
          BOTTOM SECTION
      ========================================= */}

      <section className="bottom-dashboard-grid">

        {/* Quick Actions */}

        <div className="bottom-panel">

          <h3>QUICK ACTIONS</h3>

          <div className="quick-actions">

            <QuickAction
              icon={<Navigation />}
              title="Find Route"
              type="green"
            />

            <QuickAction
              icon={<CalendarDays />}
              title="Book Facility"
              type="purple"
            />

            <QuickAction
              icon={<TriangleAlert />}
              title="Report Issue"
              type="red"
            />

          </div>

        </div>


        {/* Shortcuts */}

        <div className="bottom-panel shortcuts-panel">

          <h3>SHORTCUTS</h3>

          <div className="shortcut-list">

            <Shortcut
              icon={<Library />}
              label="Library"
              type="green"
            />

            <Shortcut
              icon={<Utensils />}
              label="Canteen"
              type="red"
            />

            <Shortcut
              icon={<FlaskConical />}
              label="Labs"
              type="orange"
            />

            <Shortcut
              icon={<ParkingCircle />}
              label="Parking"
              type="blue"
            />

            <Shortcut
              icon={<Accessibility />}
              label="Washroom"
              type="purple"
            />

            <Shortcut
              icon={<CircleHelp />}
              label="Help Desk"
              type="green"
            />

          </div>

        </div>


        {/* Weather */}

        <div className="bottom-panel weather-panel">

          <h3>WEATHER</h3>

          <div className="weather-main">

            <Sun size={48} />

            <div>
              <strong>28°C</strong>
              <span>Partly Cloudy</span>
            </div>

          </div>


          <div className="weather-details">

            <div>
              <span>Humidity</span>
              <strong>60%</strong>
            </div>

            <div>
              <span>Wind</span>
              <strong>12 km/h</strong>
            </div>

            <div>
              <span>Feels like</span>
              <strong>30°C</strong>
            </div>

          </div>

        </div>


        {/* Campus Map Overview */}

        <div className="bottom-panel overview-panel">

          <h3>CAMPUS MAP OVERVIEW</h3>

          <div className="mini-map">

            <img
              src={campusMap}
              alt="Campus overview"
            />

            <div className="mini-map-focus"></div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================================
   ACTIVITY ICON
========================================= */

function ActivityIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  );
}


/* =========================================
   STATUS CARD
========================================= */

function StatusCard({
  icon,
  value,
  label,
  note,
  type,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  note: string;
  type: string;
}) {
  return (
    <div className="status-card">

      <div className={`status-icon ${type}`}>
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={type}>
          {note}
        </small>
      </div>

    </div>
  );
}


/* =========================================
   QUICK ACTION
========================================= */

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

      <div>
        {icon}
      </div>

      <span>
        {title}
      </span>

    </button>
  );
}


/* =========================================
   SHORTCUT
========================================= */

function Shortcut({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
}) {
  return (
    <button className="shortcut">

      <div className={`shortcut-icon ${type}`}>
        {icon}
      </div>

      <span>
        {label}
      </span>

    </button>
  );
}

export default Dashboard;