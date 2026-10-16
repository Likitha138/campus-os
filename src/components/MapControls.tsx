import {
  Search,
  Route,
  Ruler,
  Layers,
  Info,
  RotateCcw,
  Plus,
  Minus,
  Rotate3D,
  Layers3,
} from "lucide-react";
import { useState } from "react";

interface MapControlsProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
}

export default function MapControls({ mapRef }: MapControlsProps) {
  const [mode, setMode] = useState<"2D" | "3D">("3D");
  const [zoom, setZoom] = useState(1);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showLayers, setShowLayers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const updateMap = (newZoom: number, newMode = mode) => {
    setZoom(newZoom);

    if (!mapRef.current) return;

    const map = mapRef.current;

    map.style.transform = `scale(${newZoom})`;

    if (newMode === "3D") {
      map.style.transform += " perspective(900px) rotateX(3deg)";
    }
  };

  const handle2D = () => {
    setMode("2D");

    if (mapRef.current) {
      mapRef.current.style.transform = `scale(${zoom})`;
      mapRef.current.style.transformOrigin = "center center";
    }
  };

  const handle3D = () => {
    setMode("3D");

    if (mapRef.current) {
      mapRef.current.style.transform =
        `scale(${zoom}) perspective(900px) rotateX(3deg)`;
      mapRef.current.style.transformOrigin = "center center";
    }
  };

  const zoomIn = () => {
    const newZoom = Math.min(zoom + 0.15, 2.5);
    updateMap(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoom - 0.15, 0.6);
    updateMap(newZoom);
  };

  const resetView = () => {
    setZoom(1);
    setMode("3D");
    setActiveTool(null);
    setShowLayers(false);
    setShowInfo(false);

    if (mapRef.current) {
      mapRef.current.style.transform =
        "scale(1) perspective(900px) rotateX(3deg)";
      mapRef.current.style.transformOrigin = "center center";
      mapRef.current.style.transition = "transform 0.3s ease";
    }
  };

  const handleTool = (tool: string) => {
    setActiveTool((current) =>
      current === tool ? null : tool
    );

    setShowLayers(false);
    setShowInfo(false);
  };

  return (
    <>
      {/* LEFT MAP CONTROLS */}

      <div className="map-left-controls">

        <button
          type="button"
          className={mode === "2D" ? "map-control active" : "map-control"}
          onClick={handle2D}
          title="2D View"
        >
          <span>2D</span>
        </button>

        <button
          type="button"
          className={mode === "3D" ? "map-control active" : "map-control"}
          onClick={handle3D}
          title="3D View"
        >
          <span>3D</span>
        </button>

        <button
          type="button"
          className="map-control"
          onClick={() => setShowLayers((value) => !value)}
          title="Layers"
        >
          <Layers3 size={21} />
        </button>

        <button
          type="button"
          className="map-control"
          onClick={zoomIn}
          title="Zoom In"
        >
          <Plus size={21} />
        </button>

        <button
          type="button"
          className="map-control"
          onClick={zoomOut}
          title="Zoom Out"
        >
          <Minus size={21} />
        </button>

        <button
          type="button"
          className="map-control"
          onClick={resetView}
          title="Reset View"
        >
          <RotateCcw size={21} />
        </button>

      </div>


      {/* BOTTOM MAP CONTROLS */}

      <div className="map-bottom-controls">

        <button
          type="button"
          className={activeTool === "search"
            ? "map-bottom-button active"
            : "map-bottom-button"}
          onClick={() => handleTool("search")}
        >
          <Search size={23} />
          <span>Search</span>
        </button>


        <button
          type="button"
          className={activeTool === "route"
            ? "map-bottom-button active"
            : "map-bottom-button"}
          onClick={() => handleTool("route")}
        >
          <Route size={23} />
          <span>Route</span>
        </button>


        <button
          type="button"
          className={activeTool === "measure"
            ? "map-bottom-button active"
            : "map-bottom-button"}
          onClick={() => handleTool("measure")}
        >
          <Ruler size={23} />
          <span>Measure</span>
        </button>


        <button
          type="button"
          className={showLayers
            ? "map-bottom-button active"
            : "map-bottom-button"}
          onClick={() => {
            setShowLayers((value) => !value);
            setActiveTool(null);
          }}
        >
          <Layers size={23} />
          <span>Layers</span>
        </button>


        <button
          type="button"
          className={showInfo
            ? "map-bottom-button active"
            : "map-bottom-button"}
          onClick={() => {
            setShowInfo((value) => !value);
            setActiveTool(null);
          }}
        >
          <Info size={23} />
          <span>Info</span>
        </button>


        <button
          type="button"
          className="map-bottom-button"
          onClick={resetView}
        >
          <RotateCcw size={23} />
          <span>Reset View</span>
        </button>

      </div>


      {/* TOOL MESSAGE */}

      {activeTool && (
        <div className="map-tool-message">

          {activeTool === "search" && (
            <>
              <Search size={18} />
              <span>
                Search mode activated. Search campus buildings,
                rooms or locations.
              </span>
            </>
          )}

          {activeTool === "route" && (
            <>
              <Route size={18} />
              <span>
                Route mode activated. Select a starting point
                and destination.
              </span>
            </>
          )}

          {activeTool === "measure" && (
            <>
              <Ruler size={18} />
              <span>
                Measure mode activated. Select points on the
                campus map.
              </span>
            </>
          )}

        </div>
      )}


      {/* LAYERS PANEL */}

      {showLayers && (
        <div className="map-popup-panel">

          <div className="map-popup-header">
            <Layers size={18} />
            <strong>Map Layers</strong>
          </div>

          <label>
            <input type="checkbox" defaultChecked />
            Buildings
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Roads
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Campus Paths
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Vehicles
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Navigation
          </label>

        </div>
      )}


      {/* INFORMATION PANEL */}

      {showInfo && (
        <div className="map-popup-panel">

          <div className="map-popup-header">
            <Info size={18} />
            <strong>Campus Information</strong>
          </div>

          <p>
            <strong>Campus OS</strong>
          </p>

          <p>
            Interactive digital campus twin.
          </p>

          <p>
            Buildings: 24
          </p>

          <p>
            Rooms: 215
          </p>

          <p>
            Students: 3,248
          </p>

        </div>
      )}

    </>
  );
}