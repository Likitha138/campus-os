import {
  Activity as ActivityIcon,
  Clock,
  Users,
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
import { activityData, campusLocations } from "../data/campus";

export default function Activity() {
  return (
    <div className="page">
      <PageHeader
        title="Campus Activity"
        subtitle="Observe simulated occupancy and movement across the campus."
      />

      <div className="stats-grid">
        <StatCard
          label="Current Occupancy"
          value="63%"
          change="+4.2%"
          trend="up"
          icon="users"
        />

        <StatCard
          label="Active Zones"
          value="08"
          change="6 busy"
          trend="neutral"
          icon="building"
        />

        <StatCard
          label="Peak Occupancy"
          value="83%"
          change="16:00"
          trend="neutral"
          icon="chart"
        />

        <StatCard
          label="Activity Index"
          value="78/100"
          change="+6.8%"
          trend="up"
          icon="activity"
        />
      </div>

      <div className="two-column-grid">
        <div className="panel large-chart-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                TIME SIMULATION
              </span>
              <h3>Campus Occupancy Timeline</h3>
            </div>

            <div className="simulation-control">
              <Clock size={14} />
              12:00 PM
            </div>
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient
                    id="activityFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4f8cff"
                      stopOpacity=".35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#4f8cff"
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
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#10151f",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />

                <Area
                  dataKey="occupancy"
                  type="monotone"
                  stroke="#4f8cff"
                  fill="url(#activityFill)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                LOCATION ANALYSIS
              </span>
              <h3>Zone Occupancy</h3>
            </div>

            <Users size={18} />
          </div>

          <div className="occupancy-list">
            {campusLocations.map((location) => (
              <div
                className="occupancy-item"
                key={location.id}
              >
                <div className="occupancy-item-top">
                  <strong>{location.name}</strong>
                  <span>
                    {location.occupancy}%
                  </span>
                </div>

                <div className="progress-bar">
                  <span
                    style={{
                      width: `${location.occupancy}%`,
                    }}
                  />
                </div>

                <small>
                  {location.capacity.toLocaleString()} capacity
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel simulation-timeline">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              SIMULATION CONTROL
            </span>
            <h3>Activity Time Controller</h3>
          </div>

          <span className="status-pill success">
            RUNNING
          </span>
        </div>

        <div className="time-controller">
          <div className="time-label">
            <span>06:00</span>
            <strong>12:00 PM</strong>
            <span>20:00</span>
          </div>

          <input
            type="range"
            min="6"
            max="20"
            defaultValue="12"
          />

          <div className="timeline-markers">
            <span>Morning</span>
            <span>Peak</span>
            <span>Afternoon</span>
            <span>Evening</span>
          </div>
        </div>
      </div>
    </div>
  );
}