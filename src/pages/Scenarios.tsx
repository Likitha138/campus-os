import { Play, RotateCcw, Zap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useState } from "react";

const scenarios = [
  {
    title: "Peak Hour Traffic",
    description: "Simulate increased vehicle density around campus gates.",
    impact: "High",
  },
  {
    title: "Event Crowd",
    description: "Simulate a large event and student movement.",
    impact: "Medium",
  },
  {
    title: "Emergency Evacuation",
    description: "Model emergency movement and route availability.",
    impact: "Critical",
  },
  {
    title: "Rainfall Simulation",
    description: "Simulate environmental impact and movement changes.",
    impact: "Medium",
  },
];

export default function Scenarios() {
  const [running, setRunning] = useState("");

  return (
    <div className="page">
      <PageHeader
        eyebrow="DIGITAL SIMULATION"
        title="What-If Scenarios"
        description="Run controlled campus simulations without affecting the real environment."
      />

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <div className="scenario-card" key={scenario.title}>
            <div className="scenario-icon">
              <Zap size={20} />
            </div>

            <span className={`impact ${scenario.impact.toLowerCase()}`}>
              {scenario.impact} impact
            </span>

            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>

            <button
              className="primary-button"
              onClick={() => setRunning(scenario.title)}
            >
              <Play size={15} />
              Run simulation
            </button>
          </div>
        ))}
      </div>

      {running && (
        <div className="simulation-running">
          <div>
            <strong>{running}</strong>
            <span>Simulation engine running...</span>
          </div>

          <button onClick={() => setRunning("")}>
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}