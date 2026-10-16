import { useState } from "react";
import {
  Navigation as NavigationIcon,
  Search,
  MapPin,
  Route,
  CheckCircle,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const locations = [
  "Main Block",
  "Library",
  "Auditorium",
  "Block A",
  "Block B",
  "Block C",
  "Parking Area",
  "Cafeteria",
];

function NavigationPage() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [route, setRoute] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  const calculateRoute = () => {

    if (!selected) {
      setRoute("Please select a destination first.");
      return;
    }

    setRoute(
      `Route calculated to ${selected}. Estimated walking time: 6 minutes.`
    );
  };

  return (
    <div className="page-container">

      <PageHeader
        title="Campus Navigation"
        subtitle="Find locations and calculate routes across campus"
      />

      <div className="page-grid">

        {/* SEARCH */}
        <div className="feature-card">

          <Search size={28} />

          <h2>Search Location</h2>

          <p>
            Search for a building or campus facility.
          </p>

          <input
            className="feature-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search location..."
          />

          {search && (
            <div style={{ marginTop: 12 }}>

              {filteredLocations.map((location) => (

                <button
                  key={location}
                  onClick={() => {
                    setSelected(location);
                    setSearch(location);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px",
                    marginBottom: "5px",
                    border: "none",
                    borderRadius: "8px",
                    background:
                      selected === location
                        ? "rgba(22,140,255,0.2)"
                        : "rgba(255,255,255,0.04)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {location}
                </button>

              ))}

            </div>
          )}

        </div>


        {/* SELECTED */}
        <div className="feature-card">

          <MapPin size={28} />

          <h2>Destination</h2>

          <p>
            Selected campus destination.
          </p>

          <strong style={{ fontSize: 22 }}>
            {selected || "No location selected"}
          </strong>

        </div>


        {/* ROUTE */}
        <div className="feature-card">

          <Route size={28} />

          <h2>Route Planner</h2>

          <p>
            Calculate the shortest simulated route.
          </p>

          <button
            className="feature-button"
            onClick={calculateRoute}
          >
            Calculate Route
          </button>

          {route && (
            <div style={{ marginTop: 15 }}>
              <CheckCircle size={18} />
              <p>{route}</p>
            </div>
          )}

        </div>

      </div>


      {/* MAP */}
      <div className="campus-workspace">

        <NavigationIcon size={42} />

        <h2>Campus Navigation Map</h2>

        <p>
          Interactive campus map showing the selected destination.
        </p>

        {selected && (
          <button
            className="feature-button"
            onClick={calculateRoute}
          >
            Navigate to {selected}
          </button>
        )}

      </div>

    </div>
  );
}

export default NavigationPage;