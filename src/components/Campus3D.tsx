import {
  Building2,
  Car,
  Maximize2,
  Minus,
  Plus,
  Rotate3D,
  Users,
} from "lucide-react";

import { useState } from "react";
import { campusLocations } from "../data/campus";

export default function Campus3D() {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(
    campusLocations[0]
  );

  return (
    <div className="campus-3d">
      <div className="campus-toolbar">
        <div className="campus-toolbar-title">
          <Rotate3D size={16} />
          <span>INTERACTIVE CAMPUS VIEW</span>
        </div>

        <div className="campus-toolbar-actions">
          <button
            onClick={() =>
              setZoom((value) =>
                Math.min(value + 0.15, 1.6)
              )
            }
          >
            <Plus size={15} />
          </button>

          <button
            onClick={() =>
              setZoom((value) =>
                Math.max(value - 0.15, 0.7)
              )
            }
          >
            <Minus size={15} />
          </button>

          <button>
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      <div
        className="campus-scene"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <div className="scene-grid" />

        <div className="scene-road road-one" />
        <div className="scene-road road-two" />
        <div className="scene-road road-three" />

        <div className="scene-zone zone-a">
          ZONE A
        </div>

        <div className="scene-zone zone-b">
          ZONE B
        </div>

        {campusLocations.map((location) => (
          <button
            key={location.id}
            className={`scene-building ${
              selected.id === location.id
                ? "selected"
                : ""
            }`}
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
            }}
            onClick={() => setSelected(location)}
          >
            <span className="building-shadow" />

            <span className="building-body">
              <Building2 size={18} />
            </span>

            <span className="building-label">
              {location.name}
            </span>

            <span
              className={`occupancy-dot occupancy-${location.status.toLowerCase()}`}
            />
          </button>
        ))}

        <div className="scene-vehicle vehicle-one">
          <Car size={16} />
        </div>

        <div className="scene-vehicle vehicle-two">
          <Car size={16} />
        </div>

        <div className="scene-crowd">
          <Users size={15} />
        </div>
      </div>

      <div className="campus-info-panel">
        <div className="campus-info-header">
          <div>
            <span className="panel-kicker">
              SELECTED LOCATION
            </span>

            <h3>{selected.name}</h3>
          </div>

          <span className="status-pill success">
            {selected.status}
          </span>
        </div>

        <div className="campus-info-grid">
          <div>
            <span>TYPE</span>
            <strong>{selected.type}</strong>
          </div>

          <div>
            <span>ZONE</span>
            <strong>{selected.zone}</strong>
          </div>

          <div>
            <span>OCCUPANCY</span>
            <strong>{selected.occupancy}%</strong>
          </div>

          <div>
            <span>CAPACITY</span>
            <strong>
              {selected.capacity.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>

      <div className="campus-legend">
        <span>
          <i className="legend-green" /> Open
        </span>
        <span>
          <i className="legend-orange" /> Busy
        </span>
        <span>
          <i className="legend-red" /> Restricted
        </span>
      </div>
    </div>
  );
}