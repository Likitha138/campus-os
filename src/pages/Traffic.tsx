import { useState } from "react";
import {
  Car,
  Gauge,
  AlertTriangle,
  Play,
  Square,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function TrafficPage() {

  const [running, setRunning] = useState(false);
  const [vehicles, setVehicles] = useState(42);

  const speed = Math.max(
    12,
    42 - Math.floor(vehicles / 3)
  );

  const congestion =
    vehicles > 80
      ? "High"
      : vehicles > 55
      ? "Moderate"
      : "Low";

  const simulate = () => {
    setRunning(!running);

    if (!running) {
      setVehicles((value) => value + 10);
    }
  };

  return (
    <div className="page-container">

      <PageHeader
        title="Campus Traffic"
        subtitle="Monitor and simulate campus vehicle movement"
      />

      <div className="page-grid">

        <div className="feature-card">

          <Car size={28} />

          <h2>Active Vehicles</h2>

          <strong className="feature-number">
            {vehicles}
          </strong>

          <p>
            Simulated vehicles currently moving.
          </p>

        </div>


        <div className="feature-card">

          <Gauge size={28} />

          <h2>Average Speed</h2>

          <strong className="feature-number">
            {speed} km/h
          </strong>

          <p>
            Current simulated speed.
          </p>

        </div>


        <div className="feature-card">

          <AlertTriangle size={28} />

          <h2>Congestion</h2>

          <strong className="feature-number">
            {congestion}
          </strong>

          <p>
            Based on simulated vehicle count.
          </p>

        </div>

      </div>


      <div className="campus-workspace">

        <Car size={42} />

        <h2>
          Traffic Simulation
        </h2>

        <p>
          Vehicles: {vehicles} · Speed: {speed} km/h ·
          Congestion: {congestion}
        </p>

        <button
          className="feature-button"
          onClick={simulate}
        >
          {running ? (
            <>
              <Square size={16} />
              Stop Simulation
            </>
          ) : (
            <>
              <Play size={16} />
              Start Simulation
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default TrafficPage;