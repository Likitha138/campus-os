import {
  LocateFixed,
  Maximize,
  Minus,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

export default function MapControls() {
  return (
    <div className="map-controls">
      <button title="Search">
        <Search size={16} />
      </button>

      <button title="Zoom in">
        <Plus size={16} />
      </button>

      <button title="Zoom out">
        <Minus size={16} />
      </button>

      <button title="Reset">
        <RotateCcw size={16} />
      </button>

      <button title="Locate">
        <LocateFixed size={16} />
      </button>

      <button title="Fullscreen">
        <Maximize size={16} />
      </button>
    </div>
  );
}