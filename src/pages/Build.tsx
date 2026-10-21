import { Building2, Edit3, Plus, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { buildings } from "../data/campus";

export default function Build() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Campus Management"
        description="Manage buildings, rooms, capacity and campus infrastructure."
      />

      <div className="admin-toolbar">
        <div>
          <strong>Infrastructure registry</strong>
          <span>{buildings.length} monitored buildings</span>
        </div>

        <button className="primary-button">
          <Plus size={16} />
          Add Building
        </button>
      </div>

      <div className="building-grid">
        {buildings.map((building) => (
          <div className="building-card" key={building.id}>
            <div className="building-card-icon">
              <Building2 size={22} />
            </div>

            <div className="building-id">{building.id}</div>
            <h3>{building.name}</h3>
            <span>{building.type}</span>

            <div className="building-metrics">
              <div>
                <strong>{building.rooms}</strong>
                <small>Rooms</small>
              </div>

              <div>
                <strong>{building.floors}</strong>
                <small>Floors</small>
              </div>

              <div>
                <strong>{building.occupancy}%</strong>
                <small>Occupancy</small>
              </div>
            </div>

            <button className="building-edit">
              <Edit3 size={14} />
              Edit building
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}