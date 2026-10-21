import { useState } from "react";
import { Car, MapPin, Maximize2, Minus, Plus } from "lucide-react";

const vehicles = [
  { id: "VH-001", x: 27, y: 34, type: "Car" },
  { id: "VH-002", x: 55, y: 27, type: "Bus" },
  { id: "VH-003", x: 70, y: 62, type: "Bike" },
  { id: "VH-004", x: 43, y: 73, type: "Car" },
  { id: "VH-005", x: 80, y: 39, type: "Car" },
];

export default function Campus3D() {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState("VH-001");

  return (
    <div className="campus-map">
      <div className="map-toolbar">
        <div className="map-title">
          <span className="live-dot" />
          <div>
            <strong>LIVE CAMPUS TWIN</strong>
            <small>Digital environment • Updated now</small>
          </div>
        </div>

        <div className="map-controls">
          <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}>
            <Plus size={16} />
          </button>
          <button onClick={() => setZoom((z) => Math.max(0.8, z - 0.1))}>
            <Minus size={16} />
          </button>
          <button>
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <div className="map-content">
        <div
          className="campus-map-inner"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="road road-1" />
          <div className="road road-2" />
          <div className="road road-3" />
          <div className="road road-4" />

          <div className="campus-building building-a">
            <span>MAIN BLOCK</span>
            <small>Academic</small>
          </div>

          <div className="campus-building building-b">
            <span>LIBRARY</span>
            <small>Knowledge Hub</small>
          </div>

          <div className="campus-building building-c">
            <span>ADMIN</span>
            <small>Management</small>
          </div>

          <div className="campus-building building-d">
            <span>SCIENCE</span>
            <small>Labs</small>
          </div>

          <div className="green-zone zone-a">
            <span>ZONE A</span>
          </div>

          <div className="green-zone zone-b">
            <span>ZONE B</span>
          </div>

          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              className={`map-vehicle ${
                selected === vehicle.id ? "selected" : ""
              }`}
              style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%` }}
              onClick={() => setSelected(vehicle.id)}
              title={vehicle.id}
            >
              <Car size={14} />
            </button>
          ))}

          <div className="map-location campus-pin">
            <MapPin size={15} />
          </div>
        </div>

        <div className="map-legend">
          <div>
            <span className="legend-dot moving" />
            Moving
          </div>
          <div>
            <span className="legend-dot stopped" />
            Stopped
          </div>
          <div>
            <span className="legend-dot building" />
            Building
          </div>
        </div>

        <div className="map-selected">
          <span>SELECTED VEHICLE</span>
          <strong>{selected}</strong>
          <small>Real-time simulation</small>
        </div>
      </div>
    </div>
  );
}