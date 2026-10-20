import {
  Cloud,
  Droplets,
  Leaf,
  Sun,
  Thermometer,
  Wind,
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

const environmentData = [
  { time: "08:00", aqi: 38, temperature: 24 },
  { time: "10:00", aqi: 41, temperature: 26 },
  { time: "12:00", aqi: 46, temperature: 28 },
  { time: "14:00", aqi: 49, temperature: 29 },
  { time: "16:00", aqi: 44, temperature: 28 },
  { time: "18:00", aqi: 40, temperature: 26 },
];

export default function Environment() {
  return (
    <div className="page">
      <PageHeader
        title="Environment Monitor"
        subtitle="Monitor simulated environmental conditions across campus."
      />

      <div className="stats-grid">
        <StatCard
          label="Air Quality Index"
          value="42"
          change="Good"
          trend="neutral"
          icon="activity"
        />

        <StatCard
          label="Temperature"
          value="27°C"
          change="+1.4°"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Humidity"
          value="64%"
          change="Stable"
          trend="neutral"
          icon="chart"
        />

        <StatCard
          label="Green Coverage"
          value="38%"
          change="+3%"
          trend="up"
          icon="building"
        />
      </div>

      <div className="environment-grid">
        <div className="panel environment-chart">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ENVIRONMENT TREND
              </span>
              <h3>Air Quality Timeline</h3>
            </div>

            <span className="status-pill success">
              GOOD
            </span>
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={environmentData}>
                <defs>
                  <linearGradient
                    id="aqiFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#4bd4a0"
                      stopOpacity=".32"
                    />
                    <stop
                      offset="100%"
                      stopColor="#4bd4a0"
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
                    background: "#111721",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />

                <Area
                  dataKey="aqi"
                  type="monotone"
                  stroke="#4bd4a0"
                  fill="url(#aqiFill)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="environment-metrics">
          <EnvironmentMetric
            icon={<Thermometer size={18} />}
            title="Temperature"
            value="27°C"
            status="Comfortable"
          />

          <EnvironmentMetric
            icon={<Droplets size={18} />}
            title="Humidity"
            value="64%"
            status="Normal"
          />

          <EnvironmentMetric
            icon={<Wind size={18} />}
            title="Wind Speed"
            value="12 km/h"
            status="Light"
          />

          <EnvironmentMetric
            icon={<Cloud size={18} />}
            title="Cloud Cover"
            value="31%"
            status="Partly cloudy"
          />

          <EnvironmentMetric
            icon={<Sun size={18} />}
            title="Solar Intensity"
            value="720 W/m²"
            status="High"
          />

          <EnvironmentMetric
            icon={<Leaf size={18} />}
            title="Green Index"
            value="82/100"
            status="Healthy"
          />
        </div>
      </div>
    </div>
  );
}

function EnvironmentMetric({
  icon,
  title,
  value,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: string;
}) {
  return (
    <div className="environment-metric">
      <div className="environment-metric-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{status}</small>
      </div>
    </div>
  );
}