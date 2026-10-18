import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  ChevronRight,
  Clock3,
  Compass,
  Info,
  Layers,
  Map,
  Minus,
  Navigation,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Users,
  Zap,
} from "lucide-react";

import campusMap from "../assets/campus-map.svg";

import {
  getActivities,
  getAlerts,
  getBuildings,
  getDashboard,
  getEvents,
  getTraffic,
} from "../services/api";

// =========================================================
// TYPES
// =========================================================

type MapMode = "2D" | "3D";

type Vehicle = {
  id: string;
  type: "Car" | "Bus" | "Bike";
  speed: number;
  road: string;
  status: "Moving" | "Stopped" | "Slow";
};

type CampusLocation = {
  name: string;
  type: string;
  occupancy: number;
  status:
    | "Operational"
    | "Maintenance"
    | "Restricted";
  activity:
    | "Low"
    | "Moderate"
    | "High";
};

// =========================================================
// FALLBACK CAMPUS DATA
// Used only when backend data is unavailable.
// =========================================================

const fallbackVehicles: Vehicle[] = [
  {
    id: "VH-001",
    type: "Car",
    speed: 32,
    road: "Main Road",
    status: "Moving",
  },
  {
    id: "VH-002",
    type: "Bus",
    speed: 18,
    road: "East Gate",
    status: "Moving",
  },
  {
    id: "VH-003",
    type: "Bike",
    speed: 12,
    road: "Library Road",
    status: "Slow",
  },
  {
    id: "VH-004",
    type: "Car",
    speed: 0,
    road: "Parking Zone",
    status: "Stopped",
  },
];

const fallbackLocations: CampusLocation[] = [
  {
    name: "Library",
    type: "Academic Facility",
    occupancy: 82,
    status: "Operational",
    activity: "High",
  },
  {
    name: "Main Auditorium",
    type: "Events Facility",
    occupancy: 64,
    status: "Operational",
    activity: "Moderate",
  },
  {
    name: "Block A",
    type: "Academic Block",
    occupancy: 68,
    status: "Operational",
    activity: "Moderate",
  },
  {
    name: "Block B",
    type: "Academic Block",
    occupancy: 51,
    status: "Operational",
    activity: "Moderate",
  },
  {
    name: "Block C",
    type: "Academic Block",
    occupancy: 37,
    status: "Operational",
    activity: "Low",
  },
  {
    name: "Admin Block",
    type: "Administration",
    occupancy: 59,
    status: "Operational",
    activity: "Moderate",
  },
];

const fallbackActivity = [
  {
    label: "08:00",
    value: 42,
  },
  {
    label: "09:00",
    value: 56,
  },
  {
    label: "10:00",
    value: 68,
  },
  {
    label: "11:00",
    value: 74,
  },
  {
    label: "12:00",
    value: 63,
  },
  {
    label: "13:00",
    value: 58,
  },
  {
    label: "14:00",
    value: 71,
  },
  {
    label: "15:00",
    value: 78,
  },
  {
    label: "16:00",
    value: 69,
  },
];

// =========================================================
// SAFE NUMBER
// =========================================================

function safeNumber(
  value: unknown,
  fallback: number,
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

// =========================================================
// DASHBOARD
// =========================================================

function Dashboard() {
  const navigate = useNavigate();

  // -------------------------------------------------------
  // UI STATE
  // -------------------------------------------------------

  const [mapMode, setMapMode] =
    useState<MapMode>("3D");

  const [zoom, setZoom] =
    useState(1);

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState<CampusLocation | null>(null);

  const [
    selectedTool,
    setSelectedTool,
  ] = useState<string | null>(null);

  const [
    simulationRunning,
    setSimulationRunning,
  ] = useState(false);

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  const [
    currentTime,
    setCurrentTime,
  ] = useState(new Date());

  // -------------------------------------------------------
  // BACKEND DATA STATE
  // -------------------------------------------------------

  const [
    backendBuildings,
    setBackendBuildings,
  ] = useState<unknown[]>([]);

  const [
    backendTraffic,
    setBackendTraffic,
  ] = useState<unknown[]>([]);

  const [
    backendEvents,
    setBackendEvents,
  ] = useState<unknown[]>([]);

  const [
    backendActivities,
    setBackendActivities,
  ] = useState<unknown[]>([]);

  const [
    backendAlerts,
    setBackendAlerts,
  ] = useState<unknown[]>([]);

  const [
    backendDashboard,
    setBackendDashboard,
  ] = useState<unknown>(null);

  const [
    backendLoading,
    setBackendLoading,
  ] = useState(true);

  // -------------------------------------------------------
  // CLOCK
  // -------------------------------------------------------

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

    return () =>
      window.clearInterval(timer);
  }, []);

  // -------------------------------------------------------
  // LOAD BACKEND
  // -------------------------------------------------------

  useEffect(() => {
    let mounted = true;

    async function loadCampusData() {
      setBackendLoading(true);

      const results =
        await Promise.allSettled([
          getDashboard(),
          getBuildings(),
          getTraffic(),
          getEvents(),
          getActivities(),
          getAlerts(),
        ]);

      if (!mounted) {
        return;
      }

      const [
        dashboardResult,
        buildingsResult,
        trafficResult,
        eventsResult,
        activitiesResult,
        alertsResult,
      ] = results;

      if (
        dashboardResult.status ===
        "fulfilled"
      ) {
        setBackendDashboard(
          dashboardResult.value,
        );
      }

      if (
        buildingsResult.status ===
        "fulfilled"
      ) {
        setBackendBuildings(
          normalizeArray(
            buildingsResult.value,
          ),
        );
      }

      if (
        trafficResult.status ===
        "fulfilled"
      ) {
        setBackendTraffic(
          normalizeArray(
            trafficResult.value,
          ),
        );
      }

      if (
        eventsResult.status ===
        "fulfilled"
      ) {
        setBackendEvents(
          normalizeArray(
            eventsResult.value,
          ),
        );
      }

      if (
        activitiesResult.status ===
        "fulfilled"
      ) {
        setBackendActivities(
          normalizeArray(
            activitiesResult.value,
          ),
        );
      }

      if (
        alertsResult.status ===
        "fulfilled"
      ) {
        setBackendAlerts(
          normalizeArray(
            alertsResult.value,
          ),
        );
      }

      setBackendLoading(false);
    }

    loadCampusData();

    return () => {
      mounted = false;
    };
  }, []);

  // -------------------------------------------------------
  // NORMALIZE API DATA
  // -------------------------------------------------------

  function normalizeArray(
    value: unknown,
  ): unknown[] {
    if (Array.isArray(value)) {
      return value;
    }

    if (
      typeof value === "object" &&
      value !== null
    ) {
      const object =
        value as Record<
          string,
          unknown
        >;

      const possibleArrays = [
        object.data,
        object.rows,
        object.results,
        object.buildings,
        object.traffic,
        object.events,
        object.activities,
        object.alerts,
      ];

      for (
        const item of possibleArrays
      ) {
        if (Array.isArray(item)) {
          return item;
        }
      }
    }

    return [];
  }

  // -------------------------------------------------------
  // BUILDING COUNT
  // -------------------------------------------------------

  const buildingCount =
    backendBuildings.length > 0
      ? backendBuildings.length
      : 24;

  // -------------------------------------------------------
  // VEHICLE COUNT
  // -------------------------------------------------------

  const vehicleCount =
    backendTraffic.length > 0
      ? backendTraffic.length
      : fallbackVehicles.length;

  const totalVehicles =
    simulationRunning
      ? Math.max(
          vehicleCount,
          48,
        )
      : vehicleCount;

  // -------------------------------------------------------
  // OCCUPANCY
  // -------------------------------------------------------

  const currentActivity =
    simulationRunning
      ? 81
      : 63;

  // -------------------------------------------------------
  // LOCATION SEARCH
  // -------------------------------------------------------

  const filteredLocations =
    useMemo(() => {
      if (
        !searchValue.trim()
      ) {
        return fallbackLocations;
      }

      return fallbackLocations.filter(
        (location) =>
          location.name
            .toLowerCase()
            .includes(
              searchValue
                .toLowerCase(),
            ),
      );
    }, [searchValue]);

  // -------------------------------------------------------
  // LOCATION SELECT
  // -------------------------------------------------------

  const handleLocationSelect =
    (name: string) => {
      const location =
        fallbackLocations.find(
          (item) =>
            item.name === name,
        );

      if (location) {
        setSelectedLocation(
          location,
        );

        setSelectedTool(null);
      }
    };

  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------

  const resetMap = () => {
    setZoom(1);
    setMapMode("3D");
    setSelectedTool(null);
    setSelectedLocation(null);
    setSearchOpen(false);
    setSearchValue("");
  };

  // -------------------------------------------------------
  // TOOLS
  // -------------------------------------------------------

  const handleTool = (
    tool: string,
  ) => {
    setSelectedTool(tool);

    if (tool === "Route") {
      navigate("/navigation");
      return;
    }

    if (tool === "Search") {
      setSearchOpen(true);
    }
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <div className="explore-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="explore-header">

        <div className="explore-heading">

          <span>
            CAMPUS OPERATING SYSTEM
          </span>

          <h1>
            Digital Campus Twin
          </h1>

          <p>
            Explore, monitor and simulate
            your campus environment in
            real time.
          </p>

        </div>

        <div className="explore-live-status">

          <span className="live-status-dot" />

          <div>

            <strong>
              LIVE SYSTEM
            </strong>

            <span>
              {currentTime.toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",
                  minute:
                    "2-digit",
                  second:
                    "2-digit",
                },
              )}
            </span>

          </div>

        </div>

      </section>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="explore-tabs">

        <button
          type="button"
          className="explore-tab active"
          onClick={() =>
            navigate("/")
          }
        >
          <Map size={18} />
          <span>
            Explore
          </span>
        </button>

        <button
          type="button"
          className="explore-tab"
          onClick={() =>
            navigate(
              "/navigation",
            )
          }
        >
          <Navigation size={18} />
          <span>
            Navigate
          </span>
        </button>

        <button
          type="button"
          className="explore-tab"
          onClick={() =>
            navigate(
              "/activity",
            )
          }
        >
          <Activity size={18} />
          <span>
            Activity
          </span>
        </button>

        <button
          type="button"
          className="explore-tab"
          onClick={() =>
            navigate(
              "/traffic",
            )
          }
        >
          <Car size={18} />
          <span>
            Traffic
          </span>
        </button>

        <button
          type="button"
          className="explore-tab"
          onClick={() =>
            navigate(
              "/events",
            )
          }
        >
          <CalendarDays
            size={18}
          />
          <span>
            Events
          </span>
        </button>

        <button
          type="button"
          className="explore-tab"
          onClick={() =>
            navigate(
              "/ai-assistant",
            )
          }
        >
          <span className="more-dots">
            •••
          </span>

          <span>
            More
          </span>
        </button>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="explore-stat-grid">

        <div className="explore-stat-card">

          <div className="explore-stat-icon">
            <Building2
              size={21}
            />
          </div>

          <div>

            <span>
              BUILDINGS
            </span>

            <strong>
              {buildingCount}
            </strong>

            <small>
              Campus facilities
            </small>

          </div>

        </div>

        <div className="explore-stat-card">

          <div className="explore-stat-icon">
            <Users size={21} />
          </div>

          <div>

            <span>
              STUDENTS
            </span>

            <strong>
              3,248
            </strong>

            <small>
              Currently registered
            </small>

          </div>

        </div>

        <div className="explore-stat-card">

          <div className="explore-stat-icon">
            <Car size={21} />
          </div>

          <div>

            <span>
              ACTIVE VEHICLES
            </span>

            <strong>
              {totalVehicles}
            </strong>

            <small>
              {simulationRunning
                ? "Simulation active"
                : "Live simulation"}
            </small>

          </div>

        </div>

        <div className="explore-stat-card">

          <div className="explore-stat-icon">
            <Activity
              size={21}
            />
          </div>

          <div>

            <span>
              OCCUPANCY
            </span>

            <strong>
              {currentActivity}%
            </strong>

            <small>
              Campus utilization
            </small>

          </div>

        </div>

      </section>

      {/* =================================================
          COMMAND CENTER
      ================================================= */}

      <section className="explore-command-grid">

        {/* =================================================
            MAP
        ================================================= */}

        <div className="explore-map-card">

          <div className="explore-map-header">

            <div>

              <span>
                LIVE DIGITAL TWIN
              </span>

              <h2>
                Campus Overview
              </h2>

            </div>

            <div className="map-live-indicator">

              <span />

              SIMULATION ONLINE

            </div>

          </div>

          <div className="explore-map-wrapper">

            {/* MAP MODE */}

            <div className="map-mode-controls">

              <button
                type="button"
                className={
                  mapMode === "2D"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setMapMode("2D")
                }
              >
                2D
              </button>

              <button
                type="button"
                className={
                  mapMode === "3D"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setMapMode("3D")
                }
              >
                3D
              </button>

            </div>

            {/* SEARCH */}

            {searchOpen && (
              <div className="campus-map-search">

                <Search
                  size={16}
                />

                <input
                  autoFocus
                  value={
                    searchValue
                  }
                  onChange={(
                    event,
                  ) =>
                    setSearchValue(
                      event
                        .target
                        .value,
                    )
                  }
                  placeholder="Search campus..."
                />

                {searchValue && (
                  <div className="campus-search-results">

                    {filteredLocations.length >
                    0 ? (
                      filteredLocations.map(
                        (
                          location,
                        ) => (
                          <button
                            type="button"
                            key={
                              location.name
                            }
                            onClick={() =>
                              handleLocationSelect(
                                location.name,
                              )
                            }
                          >
                            <Building2
                              size={
                                15
                              }
                            />

                            {
                              location.name
                            }
                          </button>
                        ),
                      )
                    ) : (
                      <span>
                        No campus
                        location
                        found.
                      </span>
                    )}

                  </div>
                )}

              </div>
            )}

            {/* =================================================
                MAP
            ================================================= */}

            <div
              className={`campus-map ${
                mapMode === "2D"
                  ? "map-2d"
                  : "map-3d"
              }`}
            >

              <img
                src={campusMap}
                alt="Campus digital twin"
                className="campus-map-image"
                style={{
                  transform:
                    `scale(${zoom})`,
                  transition:
                    "transform 0.25s ease",
                  width:
                    "100%",
                  height:
                    "100%",
                  objectFit:
                    "contain",
                }}
              />

              {/* VEHICLE ONE */}

              <div className="campus-vehicle vehicle-one">

                <span className="vehicle-pulse" />

                <Car
                  size={17}
                />

              </div>

              {/* VEHICLE TWO */}

              <div className="campus-vehicle vehicle-two">

                <span className="vehicle-pulse" />

                <Car
                  size={17}
                />

              </div>

              {/* VEHICLE THREE */}

              <div className="campus-vehicle vehicle-three">

                <span className="vehicle-pulse" />

                <Car
                  size={17}
                />

              </div>

              {/* INCIDENT */}

              <button
                type="button"
                className="campus-incident-marker"
                onClick={() =>
                  navigate(
                    "/emergency",
                  )
                }
                title="View active incident"
              >
                <AlertTriangle
                  size={16}
                />
              </button>

              {/* LABELS */}

              <button
                type="button"
                className="map-label label-library"
                onClick={() =>
                  handleLocationSelect(
                    "Library",
                  )
                }
              >
                LIBRARY
              </button>

              <button
                type="button"
                className="map-label label-auditorium"
                onClick={() =>
                  handleLocationSelect(
                    "Main Auditorium",
                  )
                }
              >
                AUDITORIUM
              </button>

              <button
                type="button"
                className="map-label label-a"
                onClick={() =>
                  handleLocationSelect(
                    "Block A",
                  )
                }
              >
                BLOCK A
              </button>

              <button
                type="button"
                className="map-label label-b"
                onClick={() =>
                  handleLocationSelect(
                    "Block B",
                  )
                }
              >
                BLOCK B
              </button>

              <button
                type="button"
                className="map-label label-c"
                onClick={() =>
                  handleLocationSelect(
                    "Block C",
                  )
                }
              >
                BLOCK C
              </button>

              <button
                type="button"
                className="map-label label-admin"
                onClick={() =>
                  handleLocationSelect(
                    "Admin Block",
                  )
                }
              >
                ADMIN BLOCK
              </button>

            </div>

            {/* MAP CONTROLS */}

            <div className="map-controls">

              <button
                type="button"
                aria-label="Zoom in"
                onClick={() =>
                  setZoom(
                    (value) =>
                      Math.min(
                        value +
                          0.1,
                        1.5,
                      ),
                  )
                }
              >
                <Plus size={18} />
              </button>

              <button
                type="button"
                aria-label="Zoom out"
                onClick={() =>
                  setZoom(
                    (value) =>
                      Math.max(
                        value -
                          0.1,
                        0.8,
                      ),
                  )
                }
              >
                <Minus size={18} />
              </button>

              <button
                type="button"
                aria-label="Reset view"
                onClick={
                  resetMap
                }
              >
                <RotateCcw
                  size={18}
                />
              </button>

            </div>

            {/* TOOLBAR */}

            <div className="map-toolbar">

              <button
                type="button"
                onClick={() =>
                  handleTool(
                    "Search",
                  )
                }
              >
                <Search
                  size={19}
                />

                <span>
                  Search
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTool(
                    "Route",
                  )
                }
              >
                <Navigation
                  size={19}
                />

                <span>
                  Route
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTool(
                    "Layers",
                  )
                }
              >
                <Layers
                  size={19}
                />

                <span>
                  Layers
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleTool(
                    "Info",
                  )
                }
              >
                <Info
                  size={19}
                />

                <span>
                  Info
                </span>
              </button>

            </div>

            {/* SIMULATION */}

            <div className="map-simulation-control">

              <button
                type="button"
                onClick={() =>
                  setSimulationRunning(
                    (value) =>
                      !value,
                  )
                }
              >

                <span
                  className={`simulation-dot ${
                    simulationRunning
                      ? "running"
                      : ""
                  }`}
                />

                {simulationRunning
                  ? "Simulation Running"
                  : "Start Simulation"}

              </button>

            </div>

            {/* TOOL FEEDBACK */}

            {selectedTool && (
              <div className="map-tool-feedback">

                <strong>
                  {selectedTool}
                </strong>

                <span>

                  {selectedTool ===
                    "Search" &&
                    "Search buildings, rooms and campus facilities."}

                  {selectedTool ===
                    "Route" &&
                    "Opening the campus route planner."}

                  {selectedTool ===
                    "Layers" &&
                    "Campus information layers are available."}

                  {selectedTool ===
                    "Info" &&
                    "Select a campus object to view details."}

                </span>

              </div>
            )}

          </div>

          {/* LOCATION */}

          {selectedLocation && (
            <div className="campus-selection-panel">

              <div>

                <span>
                  SELECTED LOCATION
                </span>

                <strong>
                  {
                    selectedLocation.name
                  }
                </strong>

                <small>
                  {
                    selectedLocation.type
                  }
                </small>

              </div>

              <div className="selection-details">

                <div>
                  <span>
                    Occupancy
                  </span>

                  <strong>
                    {
                      selectedLocation.occupancy
                    }%
                  </strong>
                </div>

                <div>
                  <span>
                    Status
                  </span>

                  <strong>
                    {
                      selectedLocation.status
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Activity
                  </span>

                  <strong>
                    {
                      selectedLocation.activity
                    }
                  </strong>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedLocation(
                    null,
                  )
                }
              >
                Close
              </button>

            </div>
          )}

        </div>

        {/* =================================================
            RIGHT COMMAND PANEL
        ================================================= */}

        <aside className="explore-side-panel">

          {/* STATUS */}

          <div className="explore-panel">

            <div className="panel-title-row">

              <div>

                <span>
                  SYSTEM MONITOR
                </span>

                <h3>
                  Campus Status
                </h3>

              </div>

              <span className="status-online">
                ONLINE
              </span>

            </div>

            <div className="status-list">

              <div>

                <span>
                  <Users
                    size={15}
                  />

                  Occupancy
                </span>

                <strong>
                  63%
                </strong>

              </div>

              <div>

                <span>
                  <Car
                    size={15}
                  />

                  Traffic
                </span>

                <strong className="status-warning">
                  Moderate
                </strong>

              </div>

              <div>

                <span>
                  <Zap
                    size={15}
                  />

                  Energy
                </span>

                <strong className="status-good">
                  Normal
                </strong>

              </div>

              <div>

                <span>
                  <ShieldAlert
                    size={15}
                  />

                  Security
                </span>

                <strong className="status-good">
                  Secure
                </strong>

              </div>

            </div>

          </div>

          {/* VEHICLES */}

          <div className="explore-panel">

            <div className="panel-title-row">

              <div>

                <span>
                  TRANSPORT
                </span>

                <h3>
                  Active Vehicles
                </h3>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/traffic",
                  )
                }
                className="panel-link"
              >
                View

                <ChevronRight
                  size={14}
                />
              </button>

            </div>

            <div className="vehicle-list">

              {fallbackVehicles.map(
                (
                  vehicle,
                ) => (

                  <button
                    type="button"
                    key={
                      vehicle.id
                    }
                    className="vehicle-row"
                    onClick={() =>
                      navigate(
                        "/traffic",
                      )
                    }
                  >

                    <div className="vehicle-icon">

                      <Car
                        size={16}
                      />

                    </div>

                    <div className="vehicle-info">

                      <strong>
                        {
                          vehicle.id
                        }
                      </strong>

                      <span>
                        {
                          vehicle.type
                        }{" "}
                        ·{" "}
                        {
                          vehicle.road
                        }
                      </span>

                    </div>

                    <div className="vehicle-speed">

                      <strong>
                        {
                          vehicle.speed
                        }
                      </strong>

                      <span>
                        km/h
                      </span>

                    </div>

                  </button>

                ),
              )}

            </div>

          </div>

          {/* ALERT */}

          <div className="explore-panel explore-alert-panel">

            <div className="panel-title-row">

              <div>

                <span>
                  ATTENTION
                </span>

                <h3>
                  Active Alert
                </h3>

              </div>

              <AlertTriangle
                size={19}
              />

            </div>

            <div className="alert-content">

              <strong>
                Traffic congestion
                detected
              </strong>

              <p>
                Zone C currently
                has higher than
                normal vehicle
                density.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/traffic",
                  )
                }
              >
                Analyze Traffic

                <ArrowRight
                  size={15}
                />
              </button>

            </div>

          </div>

        </aside>

      </section>

      {/* =================================================
          LOWER ANALYTICS
      ================================================= */}

      <section className="explore-bottom-grid">

        {/* ACTIVITY */}

        <div className="explore-analytics-card">

          <div className="analytics-header">

            <div>

              <span>
                LIVE ANALYTICS
              </span>

              <h3>
                Campus Activity
              </h3>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/activity",
                )
              }
            >
              Detailed View

              <ArrowRight
                size={14}
              />

            </button>

          </div>

          <div className="activity-chart">

            {fallbackActivity.map(
              (item) => (

                <div
                  className="activity-column"
                  key={
                    item.label
                  }
                >

                  <div className="activity-bar-wrapper">

                    <div
                      className="activity-bar"
                      style={{
                        height:
                          `${item.value}%`,
                      }}
                    />

                  </div>

                  <span>
                    {
                      item.label
                    }
                  </span>

                </div>

              ),
            )}

          </div>

        </div>

        {/* OPERATIONS */}

        <div className="explore-analytics-card">

          <div className="analytics-header">

            <div>

              <span>
                TODAY
              </span>

              <h3>
                Campus Operations
              </h3>

            </div>

            <Clock3
              size={18}
            />

          </div>

          <div className="operation-list">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/events",
                )
              }
            >

              <div>
                <CalendarDays
                  size={17}
                />
              </div>

              <span>

                <strong>
                  {
                    backendEvents.length ||
                    2
                  } Events
                </strong>

                <small>
                  Scheduled today
                </small>

              </span>

              <ChevronRight
                size={16}
              />

            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/emergency",
                )
              }
            >

              <div>
                <AlertTriangle
                  size={17}
                />
              </div>

              <span>

                <strong>
                  {
                    backendAlerts.length ||
                    2
                  } Alerts
                </strong>

                <small>
                  Requires monitoring
                </small>

              </span>

              <ChevronRight
                size={16}
              />

            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/environment",
                )
              }
            >

              <div>
                <Activity
                  size={17}
                />
              </div>

              <span>

                <strong>
                  AQI 42
                </strong>

                <small>
                  Air quality is good
                </small>

              </span>

              <ChevronRight
                size={16}
              />

            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          AI INSIGHT
      ================================================= */}

      <section className="explore-ai-insight">

        <div className="ai-insight-icon">

          <Compass
            size={22}
          />

        </div>

        <div className="ai-insight-content">

          <span>
            AI CAMPUS INSIGHT
          </span>

          <h3>
            Campus activity is
            currently stable with
            moderate traffic.
          </h3>

          <p>
            Zone C has the highest
            simulated traffic density.
            The East Gate route currently
            offers the lowest congestion
            level.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/ai-assistant",
            )
          }
        >
          Ask Campus AI

          <ArrowRight
            size={16}
          />

        </button>

      </section>

      {/* BACKEND STATUS */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",
          padding:
            "8px 0 0",
          fontSize:
            "11px",
          opacity: 0.55,
        }}
      >
        {backendLoading
          ? "Syncing campus data..."
          : "Campus data synchronized"}
      </div>

    </div>
  );
}

export default Dashboard;