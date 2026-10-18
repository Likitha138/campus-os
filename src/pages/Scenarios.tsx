// ============================================================
// src/pages/Scenarios.tsx
// ============================================================

import { useState } from "react";
import {
  Car,
  CloudRain,
  Play,
  RotateCcw,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Scenarios() {
  const [running, setRunning] = useState(false);

  const scenarios = [
    {
      title: "Peak Traffic",
      description:
        "Simulate increased vehicle density.",
      icon: <Car size={19} />,
    },
    {
      title: "Campus Event",
      description:
        "Model high student movement.",
      icon: <Users size={19} />,
    },
    {
      title: "Heavy Rain",
      description:
        "Simulate environmental disruption.",
      icon: <CloudRain size={19} />,
    },
    {
      title: "Power Demand",
      description:
        "Simulate increased energy consumption.",
      icon: <Zap size={19} />,
    },
  ];

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="SIMULATION ENGINE"
        title="What-If Scenarios"
        description="Experiment with simulated campus conditions without affecting the real environment."
        icon={<Sparkles size={22} />}
      />

      <section className="scenario-hero">
        <div>
          <span>SIMULATION ENGINE</span>
          <h2>
            Test the campus before it happens.
          </h2>
          <p>
            Change conditions, observe predicted
            impact and compare operational outcomes.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => setRunning(!running)}
        >
          {running ? (
            <>
              <RotateCcw size={16} />
              Reset Simulation
            </>
          ) : (
            <>
              <Play size={16} />
              Run Scenario
            </>
          )}
        </button>
      </section>

      <section className="scenario-grid">
        {scenarios.map((scenario) => (
          <button
            type="button"
            className="scenario-card"
            key={scenario.title}
          >
            <div className="scenario-icon">
              {scenario.icon}
            </div>

            <strong>{scenario.title}</strong>
            <span>{scenario.description}</span>

            <div className="scenario-action">
              Configure
              <Play size={13} />
            </div>
          </button>
        ))}
      </section>

      {running && (
        <section className="simulation-running">
          <div className="simulation-orb">
            <Sparkles size={24} />
          </div>

          <div>
            <span>SIMULATION RUNNING</span>
            <h2>Processing campus response...</h2>
            <p>
              The digital twin is calculating
              movement, occupancy and traffic impact.
            </p>
          </div>

          <strong>74%</strong>
        </section>
      )}
    </div>
  );
}

export default Scenarios;