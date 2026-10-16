import { FormEvent, useState } from "react";
import {
  Boxes,
  Plus,
  Trash2,
  Building2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

interface Building {
  id: number;
  name: string;
  rooms: number;
  capacity: number;
}

function Build() {
  const [buildings, setBuildings] =
    useState<Building[]>([
      {
        id: 1,
        name: "Block A",
        rooms: 40,
        capacity: 600,
      },
      {
        id: 2,
        name: "Block B",
        rooms: 35,
        capacity: 500,
      },
      {
        id: 3,
        name: "Library",
        rooms: 15,
        capacity: 250,
      },
    ]);

  const [name, setName] = useState("");
  const [rooms, setRooms] = useState("");
  const [capacity, setCapacity] =
    useState("");

  const addBuilding = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Enter a building name.");
      return;
    }

    const building: Building = {
      id: Date.now(),
      name,
      rooms: Number(rooms) || 0,
      capacity: Number(capacity) || 0,
    };

    setBuildings((previous) => [
      ...previous,
      building,
    ]);

    setName("");
    setRooms("");
    setCapacity("");
  };

  const removeBuilding = (id: number) => {
    setBuildings((previous) =>
      previous.filter(
        (building) => building.id !== id
      )
    );
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Campus Builder"
        subtitle="Create and manage simulated campus infrastructure"
      />

      <div className="page-grid">
        <div className="feature-card">
          <Boxes size={30} />

          <h2>Add Building</h2>

          <form
            onSubmit={addBuilding}
            style={{
              display: "grid",
              gap: 12,
              marginTop: 20,
            }}
          >
            <input
              className="feature-input"
              placeholder="Building name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              className="feature-input"
              type="number"
              placeholder="Number of rooms"
              value={rooms}
              onChange={(e) =>
                setRooms(e.target.value)
              }
            />

            <input
              className="feature-input"
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) =>
                setCapacity(e.target.value)
              }
            />

            <button
              className="feature-button"
              type="submit"
            >
              <Plus size={17} />
              Add Building
            </button>
          </form>
        </div>

        <div className="feature-card">
          <Building2 size={30} />

          <h2>Total Buildings</h2>

          <strong
            style={{
              display: "block",
              fontSize: 40,
              marginTop: 15,
            }}
          >
            {buildings.length}
          </strong>

          <p>
            Simulated campus buildings.
          </p>
        </div>

        <div className="feature-card">
          <Boxes size={30} />

          <h2>Total Rooms</h2>

          <strong
            style={{
              display: "block",
              fontSize: 40,
              marginTop: 15,
            }}
          >
            {buildings.reduce(
              (total, building) =>
                total + building.rooms,
              0
            )}
          </strong>
        </div>
      </div>

      <div className="campus-workspace">
        <h2>Campus Infrastructure</h2>

        <div
          style={{
            width: "100%",
            maxWidth: 900,
            marginTop: 25,
            display: "grid",
            gap: 12,
          }}
        >
          {buildings.map((building) => (
            <div
              key={building.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 15,
                padding: 18,
                borderRadius: 14,
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                textAlign: "left",
              }}
            >
              <div>
                <strong>
                  {building.name}
                </strong>

                <p
                  style={{
                    margin: "7px 0 0",
                    color:
                      "rgba(255,255,255,0.55)",
                  }}
                >
                  {building.rooms} rooms ·{" "}
                  {building.capacity} capacity
                </p>
              </div>

              <button
                className="feature-button"
                onClick={() =>
                  removeBuilding(building.id)
                }
                style={{
                  background:
                    "rgba(255,70,70,0.15)",
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Build;