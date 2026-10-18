// ============================================================
// src/pages/Navigation.tsx
// ============================================================

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Compass,
  MapPin,
  Navigation as NavigationIcon,
  Search,
  Sparkles,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function NavigationPage() {
  const [from, setFrom] = useState("Main Gate");
  const [to, setTo] = useState("Library");

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS NAVIGATION"
        title="Smart Navigation"
        description="Find intelligent routes across the simulated campus twin."
        icon={<Compass size={22} />}
      />

      <section className="navigation-layout">
        <div className="navigation-map-card">
          <div className="navigation-map-grid" />

          <div className="route-line route-line-one" />
          <div className="route-line route-line-two" />

          <div className="nav-map-point point-start">
            <span />
            <small>START</small>
          </div>

          <div className="nav-map-point point-end">
            <span />
            <small>DESTINATION</small>
          </div>

          <div className="navigation-floating-card">
            <span>RECOMMENDED ROUTE</span>
            <strong>North Corridor</strong>
            <small>Fastest simulated path</small>
          </div>

          <div className="navigation-distance">
            <strong>420 m</strong>
            <span>4 min walk</span>
          </div>
        </div>

        <div className="navigation-panel">
          <div className="navigation-panel-title">
            <span>ROUTE PLANNER</span>
            <h2>Where do you want to go?</h2>
          </div>

          <label>
            <span>Starting point</span>

            <div className="input-shell">
              <MapPin size={16} />
              <input
                value={from}
                onChange={(event) =>
                  setFrom(event.target.value)
                }
              />
            </div>
          </label>

          <label>
            <span>Destination</span>

            <div className="input-shell">
              <NavigationIcon size={16} />
              <input
                value={to}
                onChange={(event) =>
                  setTo(event.target.value)
                }
              />
            </div>
          </label>

          <button type="button" className="primary-button full">
            <Search size={16} />
            Calculate Route
          </button>

          <div className="route-result">
            <div className="route-result-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <span>AI RECOMMENDATION</span>
              <strong>
                {from} → {to}
              </strong>
              <small>
                Lowest congestion route · 4 min
              </small>
            </div>

            <ArrowRight size={16} />
          </div>

          <div className="navigation-destinations">
            {[
              "Library",
              "Main Auditorium",
              "Block A",
              "Admin Block",
              "Parking Zone",
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setTo(item)}
              >
                <Building2 size={14} />
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NavigationPage;