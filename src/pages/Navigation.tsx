import {
  ArrowRight,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  Route,
  Search,
} from "lucide-react";

import { useState } from "react";
import PageHeader from "../components/PageHeader";
import MapControls from "../components/MapControls";
import { campusLocations } from "../data/campus";

export default function Navigation() {
  const [from, setFrom] = useState(
    campusLocations[0].name
  );

  const [to, setTo] = useState(
    campusLocations[1].name
  );

  return (
    <div className="page">
      <PageHeader
        title="Campus Navigation"
        subtitle="Find locations and calculate simulated shortest routes."
      />

      <div className="navigation-layout">
        <aside className="navigation-sidebar">
          <div className="route-builder">
            <div className="route-builder-title">
              <Route size={18} />
              <div>
                <strong>Build Route</strong>
                <span>Shortest path simulation</span>
              </div>
            </div>

            <label className="field">
              <span>Starting point</span>
              <div className="input-with-icon">
                <LocateFixed size={15} />
                <select
                  value={from}
                  onChange={(e) =>
                    setFrom(e.target.value)
                  }
                >
                  {campusLocations.map(
                    (location) => (
                      <option
                        key={location.id}
                      >
                        {location.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </label>

            <div className="route-connector">
              <span />
            </div>

            <label className="field">
              <span>Destination</span>
              <div className="input-with-icon">
                <MapPin size={15} />
                <select
                  value={to}
                  onChange={(e) =>
                    setTo(e.target.value)
                  }
                >
                  {campusLocations.map(
                    (location) => (
                      <option
                        key={location.id}
                      >
                        {location.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </label>

            <button className="primary-button">
              <NavigationIcon size={16} />
              Calculate Route
            </button>
          </div>

          <div className="route-result">
            <div className="route-result-header">
              <span>BEST ROUTE</span>
              <strong>Route A</strong>
            </div>

            <div className="route-stat-row">
              <div>
                <span>Distance</span>
                <strong>0.8 km</strong>
              </div>

              <div>
                <span>ETA</span>
                <strong>7 min</strong>
              </div>
            </div>

            <div className="route-steps">
              <div>
                <i className="route-dot green" />
                <span>{from}</span>
              </div>

              <div className="route-line" />

              <div>
                <i className="route-dot blue" />
                <span>Central Avenue</span>
              </div>

              <div className="route-line" />

              <div>
                <i className="route-dot red" />
                <span>{to}</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="map-simulation">
          <div className="map-overlay-title">
            <div>
              <span>LIVE CAMPUS MAP</span>
              <strong>
                {from} → {to}
              </strong>
            </div>

            <div className="map-live">
              <span />
              SIMULATED
            </div>
          </div>

          <div className="map-canvas">
            <div className="map-grid" />

            <div className="map-road map-road-a" />
            <div className="map-road map-road-b" />
            <div className="map-road map-road-c" />

            {campusLocations.map(
              (location, index) => (
                <div
                  className={`map-location ${
                    location.name === to
                      ? "destination"
                      : ""
                  }`}
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                  }}
                  key={location.id}
                >
                  <span>
                    <MapPin size={16} />
                  </span>
                  <label>{location.name}</label>
                </div>
              )
            )}

            <svg
              className="route-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 35 36 C 40 45, 48 42, 55 52 S 58 60, 63 31"
                fill="none"
                stroke="#42d392"
                strokeWidth="0.65"
                strokeDasharray="2 1"
              />
            </svg>

            <MapControls />
          </div>
        </section>
      </div>

      <div className="search-location-panel">
        <Search size={17} />

        <input
          placeholder="Search classrooms, labs, departments, library, auditorium, canteen or parking..."
        />

        <button className="secondary-button">
          Search
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}