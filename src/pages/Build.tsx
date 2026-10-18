// ============================================================
// src/pages/Build.tsx
// ============================================================

import {
  Building2,
  Layers,
  Map,
  Maximize2,
  Ruler,
  Settings2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Build() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="DIGITAL CAMPUS MODEL"
        title="Campus Build"
        description="Inspect buildings, infrastructure layers and spatial campus assets."
        icon={<Building2 size={22} />}
      />

      <section className="build-layout">
        <div className="build-viewport">
          <div className="build-grid" />

          <div className="build-building building-a">
            <span>BLOCK A</span>
          </div>

          <div className="build-building building-b">
            <span>BLOCK B</span>
          </div>

          <div className="build-building building-c">
            <span>LIBRARY</span>
          </div>

          <div className="build-building building-d">
            <span>AUDITORIUM</span>
          </div>

          <div className="build-road road-a" />
          <div className="build-road road-b" />

          <div className="build-floating-label">
            <span>DIGITAL MODEL</span>
            <strong>24 BUILDINGS</strong>
          </div>
        </div>

        <div className="build-controls">
          <div className="build-control-heading">
            <span>MODEL CONTROLS</span>
            <h2>Infrastructure</h2>
          </div>

          {[
            [<Layers size={17} />, "Building Layers"],
            [<Map size={17} />, "Campus Roads"],
            [<Ruler size={17} />, "Measurements"],
            [<Settings2 size={17} />, "Model Settings"],
          ].map(([icon, label]) => (
            <button
              type="button"
              key={label as string}
            >
              {icon}
              <span>{label}</span>
              <Maximize2 size={13} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Build;