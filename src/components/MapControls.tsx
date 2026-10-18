// ============================================================
// src/components/MapControls.tsx
// ============================================================

import {
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

type MapControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  search: () => void;
};

function MapControls({
  zoomIn,
  zoomOut,
  reset,
  search,
}: MapControlsProps) {
  return (
    <div className="advanced-map-controls">
      <button
        type="button"
        onClick={zoomIn}
        aria-label="Zoom in"
      >
        <Plus size={17} />
      </button>

      <button
        type="button"
        onClick={zoomOut}
        aria-label="Zoom out"
      >
        <Minus size={17} />
      </button>

      <button
        type="button"
        onClick={reset}
        aria-label="Reset map"
      >
        <RotateCcw size={16} />
      </button>

      <button
        type="button"
        onClick={search}
        aria-label="Search map"
      >
        <Search size={16} />
      </button>

      <button
        type="button"
        aria-label="Map layers"
      >
        <Layers size={16} />
      </button>
    </div>
  );
}

export default MapControls;