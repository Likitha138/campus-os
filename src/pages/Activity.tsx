import { useEffect, useState } from "react";
import {
  Activity as ActivityIcon,
  Clock,
  Users,
  Building2,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Activity() {
  const [running, setRunning] = useState(false);
  const [hour, setHour] = useState(10);
  const [occupancy, setOccupancy] = useState(58);
  const [students, setStudents] = useState(1890);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setHour((previous) => {
        const next = previous >= 20 ? 8 : previous + 1;

        const newOccupancy = Math.min(
          95,
          Math.max(
            30,
            55 + Math.round(Math.sin(next / 2) * 25)
          )
        );

        setOccupancy(newOccupancy);
        setStudents(
          Math.round(1200 + newOccupancy * 25)
        );

        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [running]);

  const activityLevel =
    occupancy >= 75
      ? "High"
      : occupancy >= 50
      ? "Moderate"
      : "Low";

  const resetSimulation = () => {
    setRunning(false);
    setHour(10);
    setOccupancy(58);
    setStudents(1890);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Campus Activity"
        subtitle="Monitor and simulate campus activity in real time"
      />

      <div className="page-grid">
        <div className="feature-card">
          <Clock size={28} />

          <h2>Simulation Time</h2>

          <strong
            style={{
              display: "block",
              fontSize: 36,
              marginTop: 15,
            }}
          >
            {hour}:00
          </strong>

          <input
            className="feature-input"
            style={{ marginTop: 18 }}
            type="range"
            min="8"
            max="20"
            value={hour}
            onChange={(e) => {
              const value = Number(e.target.value);
              setHour(value);

              const newOccupancy = Math.min(
                95,
                Math.max(
                  30,
                  55 + Math.round(Math.sin(value / 2) * 25)
                )
              );

              setOccupancy(newOccupancy);
              setStudents(
                Math.round(1200 + newOccupancy * 25)
              );
            }}
          />

          <p>
            Adjust the simulation time to see campus
            activity change.
          </p>
        </div>

        <div className="feature-card">
          <Users size={28} />

          <h2>Students on Campus</h2>

          <strong
            style={{
              display: "block",
              fontSize: 36,
              marginTop: 15,
            }}
          >
            {students.toLocaleString()}
          </strong>

          <p>
            Estimated students currently active.
          </p>
        </div>

        <div className="feature-card">
          <Building2 size={28} />

          <h2>Campus Occupancy</h2>

          <strong
            style={{
              display: "block",
              fontSize: 36,
              marginTop: 15,
            }}
          >
            {occupancy}%
          </strong>

          <p>
            Activity level:{" "}
            <strong>{activityLevel}</strong>
          </p>
        </div>
      </div>

      <div className="campus-workspace">
        <ActivityIcon size={48} />

        <h2>Campus Activity Simulation</h2>

        <p>
          The simulation changes campus occupancy,
          student count and activity level over time.
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <button
            className="feature-button"
            onClick={() => setRunning(!running)}
          >
            {running ? (
              <>
                <Pause size={16} />
                Pause Simulation
              </>
            ) : (
              <>
                <Play size={16} />
                Start Simulation
              </>
            )}
          </button>

          <button
            className="feature-button"
            onClick={resetSimulation}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div
          style={{
            marginTop: 25,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <TrendingUp size={18} />

          <span>
            Status:{" "}
            <strong>
              {running ? "Simulation Running" : "Simulation Paused"}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Activity;