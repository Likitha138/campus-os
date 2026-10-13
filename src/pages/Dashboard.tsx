
import { useEffect, useState } from "react";

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
  TriangleAlert,
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
import { apiRequest } from "../services/api";

/* =========================================
   TYPES
========================================= */

type DashboardApiResponse = {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
  };
};

type EventsApiResponse = {
  success: boolean;
  count?: number;
  data: unknown[];
};

type CampusEvent = {
  title: string;
  date: string;
  location: string;
  type: string;
};

/* =========================================
   FALLBACK SAMPLE DATA
========================================= */

const activityData = [
  { time: "6 AM", students: 800, faculty: 500, visitors: 300 },
  { time: "9 AM", students: 1800, faculty: 1000, visitors: 650 },
  { time: "12 PM", students: 2400, faculty: 1400, visitors: 1100 },
  { time: "3 PM", students: 2200, faculty: 1800, visitors: 1400 },
  { time: "6 PM", students: 1500, faculty: 1000, visitors: 1100 },
  { time: "9 PM", students: 1200, faculty: 900, visitors: 700 },
];

const fallbackEvents: CampusEvent[] = [
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

/* =========================================
   EVENT HELPERS
========================================= */

function getEventType(index: number): string {
  const types = ["purple", "blue", "green"];
  return types[index % types.length];
}

function formatEventDate(value: unknown): string {
  if (typeof value !== "string" && !(value instanceof Date)) {
    return "Date not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalizeEvent(
  value: unknown,
  index: number
): CampusEvent {
  const event =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  const title =
    event.title ??
    event.name ??
    event.event_name ??
    event.eventName;

  const date =
    event.date ??
    event.event_date ??
    event.eventDate ??
    event.start_date ??
    event.startDate;

  const location =
    event.location ??
    event.venue ??
    event.place ??
    event.building_name;

  return {
    title:
      typeof title === "string" && title.trim()
        ? title
        : `Campus Event ${index + 1}`,

    date: formatEventDate(date),

    location:
      typeof location === "string" && location.trim()
        ? location
        : "Campus",

    type: getEventType(index),
  };
}

/* =========================================
   DASHBOARD
========================================= */

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  const [apiStatus, setApiStatus] = useState<
    "loading" | "connected" | "offline"
  >("loading");

  const [events, setEvents] = useState<CampusEvent[]>(fallbackEvents);

  const [eventsSource, setEventsSource] = useState<
    "loading" | "connected" | "fallback"
  >("loading");

  useEffect(() => {
    let active = true;

    async function loadDashboardData() {
      try {
        const response =
          await apiRequest<DashboardApiResponse>("/dashboard");

        if (
          active &&
          response.success &&
          typeof response.data?.totalUsers === "number"
        ) {
          setTotalUsers(response.data.totalUsers);
          setApiStatus("connected");
        } else if (active) {
          setApiStatus("offline");
        }
      } catch {
        if (active) {
          setApiStatus("offline");
        }
      }

      try {
        const response =
          await apiRequest<EventsApiResponse>("/events");

        if (active && response.success && Array.isArray(response.data)) {
          const normalizedEvents = response.data.map(normalizeEvent);

          setEvents(
            normalizedEvents.length > 0
              ? normalizedEvents
              : fallbackEvents
          );

          setEventsSource(
            normalizedEvents.length > 0 ? "connected" : "fallback"
          );
        } else if (active) {
          setEvents(fallbackEvents);
          setEventsSource("fallback");
        }
      } catch {
        if (active) {
          setEvents(fallbackEvents);
          setEventsSource("fallback");
        }
      }
    }

    void loadDashboardData();

    return () => {
      active = false;
    };
  }, []);

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

          <small
            role="status"
            aria-live="polite"
            style={{
              display: "block",
              marginTop: "8px",
              color:
                apiStatus === "connected"
                  ? "#26d67b"
                  : apiStatus === "offline"
                    ? "#f59e0b"
                    : "#718096",
            }}
          >
            {apiStatus === "loading" && "Connecting to backend..."}
            {apiStatus === "connected" &&
              `Backend connected • ${totalUsers} registered users`}
            {apiStatus === "offline" &&
              "Backend unavailable • Showing sample data"}
          </small>
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

          {/* Campus Map */}

          <div className="campus-map">
            <img
              src={campusMap}
              alt="Campus digital twin"
              className="campus-map-image"
            />

            <div className="map-label label-library">LIBRARY</div>

            <div className="map-label label-auditorium">
              AUDITORIUM
            </div>

            <div className="map-label label-a">BLOCK A</div>

            <div className="map-label label-b">BLOCK B</div>

            <div className="map-label label-c">BLOCK C</div>

            <div className="map-label label-admin">
              ADMIN BLOCK
            </div>

            <div className="campus-marker">
              <Navigation size={24} fill="currentColor" />
            </div>

            {/* 2D / 3D Controls */}

            <div className="map-mode-controls">
              <button type="button">2D</button>

              <button type="button" className="selected">
                3D
              </button>

              <button type="button" aria-label="Layers">
                <Layers size={18} />
              </button>

              <button type="button" aria-label="Zoom in">
                <Plus size={19} />
              </button>

              <button type="button" aria-label="Zoom out">
                <Minus size={19} />
              </button>

              <button type="button" aria-label="Reset view">
                <RotateCcw size={18} />
              </button>
            </div>

            {/* Map Toolbar */}

            <div className="map-toolbar">
              <button type="button">
                <Search size={20} />
                <span>Search</span>
              </button>

              <button type="button">
                <Route size={20} />
                <span>Route</span>
              </button>

              <button type="button">
                <Ruler size={20} />
                <span>Measure</span>
              </button>

              <button type="button">
                <Layers size={20} />
                <span>Layers</span>
              </button>

              <button type="button">
                <Info size={20} />
                <span>Info</span>
              </button>

              <button type="button">
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

              <a href="#events">View All</a>
            </div>

            <div className="events-list" id="events">
              {events.map((event, index) => (
                <div className="event-row" key={`${event.title}-${index}`}>
                  <div className={`event-icon ${event.type}`}>
                    <CalendarDays size={17} />
                  </div>

                  <div className="event-info">
                    <strong>{event.title}</strong>

                    <span>▣ {event.date}</span>

                    <span>⌖ {event.location}</span>
                  </div>

                  <span className={`event-status ${event.type}`}>
                    UPCOMING
                  </span>
                </div>
              ))}

              {eventsSource === "loading" && (
                <small role="status">Checking event updates...</small>
              )}

              {eventsSource === "fallback" && (
                <small>
                  Showing sample events because event data is unavailable.
                </small>
              )}
            </div>
          </div>

          {/* Campus Activity */}

          <div className="side-panel activity-panel">
            <div className="panel-heading">
              <h3>CAMPUS ACTIVITY (LIVE)</h3>
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
              <ResponsiveContainer width="100%" height="100%">
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
                    tickFormatter={(value) => `${value / 1000}K`}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#081321",
                      border: "1px solid rgba(96,165,250,.25)",
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
            <img src={campusMap} alt="Campus overview" />

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
      aria-hidden="true"
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
      <div className={`status-icon ${type}`}>{icon}</div>

      <div>
        <span>{label}</span>

        <strong>{value}</strong>

        <small className={type}>{note}</small>
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
    <button type="button" className={`quick-action ${type}`}>
      <div>{icon}</div>

      <span>{title}</span>
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
    <button type="button" className="shortcut">
      <div className={`shortcut-icon ${type}`}>{icon}</div>

      <span>{label}</span>
    </button>
  );
}

export default Dashboard;
