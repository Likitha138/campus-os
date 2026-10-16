import { useState } from "react";
import {
  TriangleAlert,
  Flame,
  HeartPulse,
  ShieldAlert,
  CheckCircle,
  Radio,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Emergency() {
  const [type, setType] = useState("Fire");
  const [location, setLocation] =
    useState("Block A");
  const [active, setActive] = useState(false);

  const activateEmergency = () => {
    setActive(true);
  };

  const resolveEmergency = () => {
    setActive(false);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Emergency Management"
        subtitle="Simulate and manage campus emergency situations"
      />

      <div className="page-grid">
        <div className="feature-card">
          <TriangleAlert size={30} />

          <h2>Emergency Type</h2>

          <select
            className="feature-input"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            style={{
              marginTop: 18,
            }}
          >
            <option>Fire</option>
            <option>Medical Emergency</option>
            <option>Security Threat</option>
            <option>Natural Disaster</option>
          </select>
        </div>

        <div className="feature-card">
          <Radio size={30} />

          <h2>Affected Location</h2>

          <select
            className="feature-input"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            style={{
              marginTop: 18,
            }}
          >
            <option>Block A</option>
            <option>Block B</option>
            <option>Block C</option>
            <option>Library</option>
            <option>Auditorium</option>
            <option>Parking Area</option>
          </select>
        </div>

        <div className="feature-card">
          <ShieldAlert size={30} />

          <h2>Emergency Status</h2>

          <strong
            style={{
              display: "block",
              marginTop: 15,
              fontSize: 28,
            }}
          >
            {active
              ? "ACTIVE"
              : "SAFE"}
          </strong>

          <p>
            {active
              ? `${type} reported at ${location}.`
              : "No active emergency."}
          </p>
        </div>
      </div>

      <div className="campus-workspace">
        {active ? (
          <>
            <TriangleAlert
              size={55}
              style={{
                color: "#ff5757",
              }}
            />

            <h2
              style={{
                color: "#ff5757",
              }}
            >
              EMERGENCY ACTIVE
            </h2>

            <p>
              {type} detected at{" "}
              <strong>{location}</strong>.
            </p>

            <p>
              Emergency response teams have been
              notified in the simulation.
            </p>

            <button
              className="feature-button"
              onClick={resolveEmergency}
            >
              <CheckCircle size={17} />
              Resolve Emergency
            </button>
          </>
        ) : (
          <>
            <ShieldAlert size={50} />

            <h2>
              Emergency Simulation
            </h2>

            <p>
              Select an emergency type and location
              to simulate an incident.
            </p>

            <button
              className="feature-button"
              onClick={activateEmergency}
            >
              <TriangleAlert size={17} />
              Activate Emergency
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Emergency;