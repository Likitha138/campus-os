import { Layers, LocateFixed, Minus, Plus } from "lucide-react";

export default function MapControls() {
  return (
    <div className="floating-map-controls">
      <button title="Locate">
        <LocateFixed size={17} />
      </button>
      <button title="Layers">
        <Layers size={17} />
      </button>
      <button title="Zoom in">
        <Plus size={17} />
      </button>
      <button title="Zoom out">
        <Minus size={17} />
      </button>
    </div>
  );
}