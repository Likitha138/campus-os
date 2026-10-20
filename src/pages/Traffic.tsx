import {
  Car,
  Gauge,
  MapPin,
  Play,
  Route,
  Square,
  TriangleAlert,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import {
  trafficData,
  trafficVehicles,
} from "../data/campus";

export default function Traffic() {
  return (
    <div className="page">
      <PageHeader
        title="Traffic Simulation"
        subtitle="Monitor congestion, vehicle movement and alternate campus routes."
      />

      <div className="stats-grid">
        <StatCard
          label="Vehicles Active"
          value="148"
          change="+18"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Congestion Index"
          value="58%"
          change="+7%"
          trend="up"
          icon="chart"
        />

        <StatCard
          label="Average Speed"
          value="22 km/h"
          change="-4 km/h"
          trend="down"
          icon="activity"
        />

        <StatCard
          label="Blocked Roads"
          value="02"
          change="Simulation"
          trend="neutral"
          icon="building"
        />
      </div>

      <div className="traffic-main-grid">
        <div className="panel traffic-chart-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                CONGESTION ANALYTICS
              </span>
              <h3>Traffic Load</h3>
            </div>

            <div className="simulation-buttons">
              <button className="primary-button compact">
                <Play size={14} />
                Run
              </button>

              <button className="secondary-button compact">
                <Square size={14} />
                Stop
              </button>
            </div>
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient
                    id="trafficFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ffb84d"
                      stopOpacity=".35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#ffb84d"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,.05)"
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  stroke="#657084"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#657084"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111721",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />

                <Area
                  dataKey="congestion"
                  type="monotone"
                  stroke="#ffb84d"
                  fill="url(#trafficFill)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                VEHICLE MONITOR
              </span>
              <h3>Active Vehicles</h3>
            </div>

            <Car size={18} />
          </div>

          <div className="vehicle-list">
            {trafficVehicles.map((vehicle) => (
              <div
                className="vehicle-row"
                key={vehicle.id}
              >
                <div className="vehicle-icon">
                  <Car size={15} />
                </div>

                <div className="vehicle-main">
                  <strong>{vehicle.id}</strong>
                  <span>{vehicle.road}</span>
                </div>

                <div className="vehicle-speed">
                  <Gauge size={12} />
                  {vehicle.speed}
                </div>

                <span
                  className={`vehicle-status ${
                    vehicle.status === "Stopped"
                      ? "danger"
                      : vehicle.status === "Slow"
                      ? "warning"
                      : "success"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="traffic-map">
        <div className="traffic-map-header">
          <div>
            <span className="panel-kicker">
              DIGITAL ROAD NETWORK
            </span>
            <h3>Live Traffic Map</h3>
          </div>

          <div className="traffic-legend">
            <span>
              <i className="traffic-green" />
              Low
            </span>
            <span>
              <i className="traffic-yellow" />
              Moderate
            </span>
            <span>
              <i className="traffic-red" />
              Heavy
            </span>
          </div>
        </div>

        <div className="traffic-map-canvas">
          <div className="map-grid" />

          <div className="traffic-road road-1">
            <span>North Gate Road</span>
          </div>

          <div className="traffic-road road-2">
            <span>Central Avenue</span>
          </div>

          <div className="traffic-road road-3">
            <span>Library Road</span>
          </div>

          <div className="traffic-road road-4">
            <span>Sports Road</span>
          </div>

          <div className="traffic-vehicle-marker marker-1">
            <Car size={13} />
          </div>

          <div className="traffic-vehicle-marker marker-2">
            <Car size={13} />
          </div>

          <div className="traffic-vehicle-marker marker-3">
            <Car size={13} />
          </div>

          <div className="traffic-incident">
            <TriangleAlert size={15} />
          </div>

          <div className="road-block">
            <MapPin size={14} />
            Blocked Road
          </div>
        </div>
      </div>

      <div className="panel alternate-route-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              INTELLIGENT ROUTING
            </span>
            <h3>Alternate Route Recommendation</h3>
          </div>

          <Route size={18} />
        </div>

        <div className="alternate-route">
          <div className="route-card">
            <span>PRIMARY</span>
            <strong>Central Avenue</strong>
            <small>1.2 km · 11 min</small>
            <b className="warning-text">
              Moderate congestion
            </b>
          </div>

          <div className="route-card recommended">
            <span>RECOMMENDED</span>
            <strong>East Service Road</strong>
            <small>1.5 km · 8 min</small>
            <b className="success-text">
              Low congestion
            </b>
          </div>

          <div className="route-card">
            <span>ALTERNATIVE</span>
            <strong>Library Road</strong>
            <small>1.8 km · 10 min</small>
            <b className="success-text">
              Stable
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}