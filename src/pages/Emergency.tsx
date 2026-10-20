import {
  AlertOctagon,
  ArrowRight,
  Flame,
  MapPin,
  Play,
  ShieldAlert,
  Users,
  Waves,
} from "lucide-react";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Emergency() {
  const [scenario, setScenario] =
    useState("Fire Drill");

  return (
    <div className="page">
      <PageHeader
        title="Emergency Simulation"
        subtitle="Test affected zones, evacuation routes and emergency response."
      />

      <div className="emergency-banner">
        <div className="emergency-banner-icon">
          <AlertOctagon size={22} />
        </div>

        <div>
          <strong>Controlled Simulation Mode</strong>
          <span>
            No physical campus systems are affected.
            All emergency activity is simulated.
          </span>
        </div>

        <span className="status-pill warning">
          SIMULATED
        </span>
      </div>

      <div className="emergency-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SCENARIO SELECTOR
              </span>
              <h3>Emergency Type</h3>
            </div>
          </div>

          <div className="emergency-options">
            <button
              className={
                scenario === "Fire Drill"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setScenario("Fire Drill")
              }
            >
              <Flame size={20} />
              <strong>Fire Drill</strong>
              <span>Building evacuation</span>
            </button>

            <button
              className={
                scenario === "Flood"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setScenario("Flood")
              }
            >
              <Waves size={20} />
              <strong>Flood</strong>
              <span>Road and zone blockage</span>
            </button>

            <button
              className={
                scenario === "Building Closure"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setScenario(
                  "Building Closure"
                )
              }
            >
              <ShieldAlert size={20} />
              <strong>Building Closure</strong>
              <span>Facility unavailable</span>
            </button>
          </div>

          <div className="emergency-control">
            <span>Selected scenario</span>
            <strong>{scenario}</strong>
          </div>

          <button className="danger-button">
            <Play size={16} />
            Start Emergency Simulation
          </button>
        </div>

        <div className="panel emergency-map-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                EVACUATION MAP
              </span>
              <h3>Affected Area</h3>
            </div>

            <span className="status-pill danger">
              ACTIVE ZONE
            </span>
          </div>

          <div className="emergency-map">
            <div className="emergency-grid" />

            <div className="affected-zone">
              <div>
                <AlertOctagon size={18} />
                AFFECTED
              </div>
            </div>

            <div className="exit exit-one">
              <MapPin size={16} />
              EXIT A
            </div>

            <div className="exit exit-two">
              <MapPin size={16} />
              EXIT B
            </div>

            <div className="evacuation-path">
              <ArrowRight size={18} />
            </div>

            <div className="people-count">
              <Users size={16} />
              <strong>286</strong>
              <span>people affected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="emergency-bottom-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                RESPONSE STATUS
              </span>
              <h3>Emergency Readiness</h3>
            </div>
          </div>

          <div className="readiness-list">
            <div>
              <span>Emergency Exits</span>
              <strong>8 / 8</strong>
              <b>Ready</b>
            </div>

            <div>
              <span>Evacuation Routes</span>
              <strong>5 / 6</strong>
              <b>Available</b>
            </div>

            <div>
              <span>Blocked Roads</span>
              <strong>1</strong>
              <b>Detected</b>
            </div>

            <div>
              <span>Response Units</span>
              <strong>4</strong>
              <b>Active</b>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                RECOMMENDATION
              </span>
              <h3>Campus Intelligence</h3>
            </div>
          </div>

          <div className="ai-recommendation">
            <div className="ai-recommendation-icon">
              <ShieldAlert size={18} />
            </div>

            <p>
              Redirect occupants from the eastern
              corridor and use Exit B as the primary
              evacuation route for this simulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}