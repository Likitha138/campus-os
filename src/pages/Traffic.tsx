import { Car, CircleAlert, Gauge } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { trafficData } from "../data/campus";

export default function Traffic() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="MOBILITY INTELLIGENCE"
        title="Traffic Control"
        description="Monitor simulated campus vehicle movement and congestion."
      />

      <div className="stats-grid">
        <StatCard label="Active Vehicles" value="217" change="+12" trend="up" icon="traffic" />
        <StatCard label="Average Speed" value="28" suffix=" km/h" icon="activity" />
        <StatCard label="Congestion Index" value="42" change="-5.2%" trend="down" icon="chart" />
        <StatCard label="Critical Zones" value="2" icon="traffic" />
      </div>

      <div className="content-grid-2">
        <div className="data-card large traffic-map-placeholder">
          <div className="map-simulation">
            <div className="simulation-road road-a" />
            <div className="simulation-road road-b" />
            <div className="simulation-road road-c" />

            {[...Array(12)].map((_, index) => (
              <span
                key={index}
                className="simulation-car"
                style={{
                  left: `${12 + (index * 7) % 78}%`,
                  top: `${25 + (index * 13) % 55}%`,
                }}
              >
                <Car size={13} />
              </span>
            ))}
          </div>
        </div>

        <div className="data-card large">
          <div className="card-heading">
            <div>
              <strong>Traffic zones</strong>
              <small>Live simulated density</small>
            </div>
          </div>

          {trafficData.map((zone) => (
            <div className="traffic-control-row" key={zone.zone}>
              <div className="traffic-control-icon">
                {zone.status === "High" ? (
                  <CircleAlert size={17} />
                ) : (
                  <Gauge size={17} />
                )}
              </div>

              <div className="traffic-control-info">
                <strong>{zone.zone}</strong>
                <span>{zone.vehicles} active vehicles</span>
              </div>

              <span className={`status-pill ${zone.status.toLowerCase()}`}>
                {zone.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}