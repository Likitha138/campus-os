import { Navigation2, Search, MapPin, Clock3 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Campus3D from "../components/Campus3D";

export default function Navigation() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS NAVIGATION"
        title="Smart Navigation"
        description="Find buildings, rooms and campus routes."
      />

      <div className="navigation-search-card">
        <Search size={19} />
        <input placeholder="Where do you want to go?" />
        <button className="primary-button">
          <Navigation2 size={16} />
          Find Route
        </button>
      </div>

      <div className="content-grid-2 navigation-grid">
        <Campus3D />

        <div className="data-card">
          <div className="card-heading">
            <div>
              <strong>Popular destinations</strong>
              <small>Frequently accessed locations</small>
            </div>
          </div>

          {[
            ["Central Library", "3 min walk"],
            ["Main Auditorium", "5 min walk"],
            ["Innovation Lab", "7 min walk"],
            ["Administration Block", "4 min walk"],
          ].map(([name, time]) => (
            <div className="destination-row" key={name}>
              <div className="destination-icon">
                <MapPin size={16} />
              </div>

              <div>
                <strong>{name}</strong>
                <small>{time}</small>
              </div>

              <Clock3 size={15} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}