// ============================================================
// src/pages/Traffic.tsx
// ============================================================

import {
  AlertTriangle,
  Car,
  Gauge,
  Map,
  Route,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { vehicles } from "../services/data";

function Traffic() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="TRANSPORT INTELLIGENCE"
        title="Traffic Command Center"
        description="Monitor simulated vehicle movement and congestion across campus roads."
        icon={<Car size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Active Vehicles"
          value="48"
          detail="Currently simulated"
          icon={<Car size={18} />}
          trend="+14%"
          tone="blue"
        />

        <StatCard
          label="Traffic Level"
          value="Moderate"
          detail="Campus average"
          icon={<Gauge size={18} />}
          tone="orange"
        />

        <StatCard
          label="Average Speed"
          value="24 km/h"
          detail="Network average"
          icon={<TrendingUp size={18} />}
          tone="green"
        />

        <StatCard
          label="Congested Zones"
          value="02"
          detail="Needs monitoring"
          icon={<AlertTriangle size={18} />}
          tone="purple"
        />
      </div>

      <section className="content-grid two-column">
        <div className="content-card traffic-map">
          <div className="card-header">
            <div>
              <span>LIVE NETWORK</span>
              <h2>Traffic Simulation</h2>
            </div>

            <Map size={18} />
          </div>

          <div className="traffic-network">
            <div className="traffic-road road-1" />
            <div className="traffic-road road-2" />
            <div className="traffic-road road-3" />
            <div className="traffic-road road-4" />

            <div className="traffic-node node-a" />
            <div className="traffic-node node-b" />
            <div className="traffic-node node-c" />
            <div className="traffic-node node-d" />

            <div className="traffic-car car-1">
              <Car size={14} />
            </div>

            <div className="traffic-car car-2">
              <Car size={14} />
            </div>

            <div className="traffic-car car-3">
              <Car size={14} />
            </div>

            <div className="traffic-warning">
              <AlertTriangle size={15} />
              Zone C congestion
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <span>VEHICLE NETWORK</span>
              <h2>Live Vehicles</h2>
            </div>

            <Route size={18} />
          </div>

          <div className="data-table">
            {vehicles.map((vehicle) => (
              <div
                className="data-row"
                key={vehicle.id}
              >
                <div className="row-leading-icon">
                  <Car size={14} />
                </div>

                <div className="row-main">
                  <strong>{vehicle.id}</strong>
                  <span>
                    {vehicle.type} · {vehicle.road}
                  </span>
                </div>

                <div className="row-value">
                  <strong>
                    {vehicle.speed}
                  </strong>
                  <span>km/h</span>
                </div>

                <span
                  className={`status-chip ${
                    vehicle.status === "Moving"
                      ? "success"
                      : vehicle.status === "Slow"
                        ? "warning"
                        : "neutral"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Traffic;