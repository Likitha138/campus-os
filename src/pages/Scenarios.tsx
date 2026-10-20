import {
  ArrowRight,
  Check,
  Copy,
  GitCompare,
  Save,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { scenarios } from "../data/campus";

export default function Scenarios() {
  const [selected, setSelected] =
    useState("Normal Campus Day");

  return (
    <div className="page">
      <PageHeader
        title="Scenario Management"
        subtitle="Save, compare and simulate different campus conditions."
        actions={
          <button className="primary-button">
            <Save size={15} />
            Save Scenario
          </button>
        }
      />

      <div className="scenario-layout">
        <div className="scenario-list">
          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              className={`scenario-card ${
                selected === scenario.name
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelected(scenario.name)
              }
            >
              <div className="scenario-card-top">
                <span>
                  {selected === scenario.name ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
                </span>

                <small>SIMULATION</small>
              </div>

              <strong>{scenario.name}</strong>
              <p>{scenario.description}</p>

              <div className="scenario-mini-stats">
                <span>
                  <b>{scenario.occupancy}%</b>
                  occupancy
                </span>

                <span>
                  <b>{scenario.traffic}%</b>
                  traffic
                </span>

                <span>
                  <b>{scenario.events}</b>
                  events
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="scenario-detail">
          <div className="panel">
            <div className="scenario-detail-header">
              <div>
                <span className="panel-kicker">
                  SELECTED SCENARIO
                </span>

                <h2>{selected}</h2>

                <p>
                  {
                    scenarios.find(
                      (item) =>
                        item.name === selected
                    )?.description
                  }
                </p>
              </div>

              <span className="status-pill success">
                READY
              </span>
            </div>

            <div className="scenario-metrics">
              <div>
                <span>Campus Occupancy</span>
                <strong>
                  {
                    scenarios.find(
                      (item) =>
                        item.name === selected
                    )?.occupancy
                  }
                  %
                </strong>
                <div className="progress-bar">
                  <span
                    style={{
                      width: `${
                        scenarios.find(
                          (item) =>
                            item.name ===
                            selected
                        )?.occupancy
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <span>Traffic Load</span>
                <strong>
                  {
                    scenarios.find(
                      (item) =>
                        item.name === selected
                    )?.traffic
                  }
                  %
                </strong>
                <div className="progress-bar orange">
                  <span
                    style={{
                      width: `${
                        scenarios.find(
                          (item) =>
                            item.name ===
                            selected
                        )?.traffic
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <span>Events</span>
                <strong>
                  {
                    scenarios.find(
                      (item) =>
                        item.name === selected
                    )?.events
                  }
                </strong>
              </div>
            </div>

            <div className="scenario-actions">
              <button className="primary-button">
                <ArrowRight size={15} />
                Load Scenario
              </button>

              <button className="secondary-button">
                <GitCompare size={15} />
                Compare
              </button>

              <button className="danger-outline-button">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>

          <div className="scenario-comparison">
            <div>
              <span>SCENARIO OUTPUT</span>
              <strong>Operational Analysis</strong>
            </div>

            <div className="comparison-row">
              <span>Student movement</span>
              <b>High</b>
            </div>

            <div className="comparison-row">
              <span>Road congestion</span>
              <b>Moderate</b>
            </div>

            <div className="comparison-row">
              <span>Facility pressure</span>
              <b>Medium</b>
            </div>

            <div className="comparison-row">
              <span>Emergency readiness</span>
              <b className="success-text">
                Good
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}