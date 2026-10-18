// ============================================================
// src/pages/Environment.tsx
// ============================================================

import {
  Activity,
  Droplets,
  Leaf,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Environment() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS ENVIRONMENT"
        title="Environmental Intelligence"
        description="Monitor simulated environmental conditions across campus."
        icon={<Leaf size={22} />}
      />

      <div className="environment-hero">
        <div className="aqi-orb">
          <span>AQI</span>
          <strong>42</strong>
          <small>GOOD</small>
        </div>

        <div>
          <span>ENVIRONMENTAL STATUS</span>
          <h2>Healthy campus conditions</h2>
          <p>
            Current simulated air quality and
            environmental conditions remain within
            the healthy operating range.
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Air Quality"
          value="42"
          detail="Good"
          icon={<Wind size={18} />}
          tone="green"
        />

        <StatCard
          label="Temperature"
          value="28°C"
          detail="Current"
          icon={<Thermometer size={18} />}
          tone="orange"
        />

        <StatCard
          label="Humidity"
          value="62%"
          detail="Relative humidity"
          icon={<Droplets size={18} />}
          tone="blue"
        />

        <StatCard
          label="Solar Index"
          value="6.4"
          detail="Moderate"
          icon={<Sun size={18} />}
          tone="purple"
        />
      </div>

      <section className="content-card">
        <div className="card-header">
          <div>
            <span>ENVIRONMENTAL ZONES</span>
            <h2>Campus Health Map</h2>
          </div>

          <Activity size={18} />
        </div>

        <div className="environment-zones">
          {[
            ["Zone A", "Good", 88],
            ["Zone B", "Good", 92],
            ["Zone C", "Moderate", 71],
            ["Library", "Excellent", 96],
          ].map(([zone, status, score]) => (
            <div
              className="environment-zone"
              key={zone}
            >
              <div>
                <strong>{zone}</strong>
                <span>{status}</span>
              </div>

              <div className="environment-score">
                <div>
                  <span
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>

                <strong>{score}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Environment;