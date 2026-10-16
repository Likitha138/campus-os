import { Leaf, Wind, Droplets, Thermometer } from "lucide-react";
import PageHeader from "../components/PageHeader";

function EnvironmentPage() {
  return (
    <div className="page-container">

      <PageHeader
        title="Environment"
        subtitle="Monitor campus environmental conditions"
      />

      <div className="page-grid">

        <div className="feature-card">
          <Wind size={28} />

          <h2>Air Quality</h2>

          <strong className="feature-number">
            AQI 42
          </strong>

          <p>Good air quality.</p>
        </div>

        <div className="feature-card">
          <Thermometer size={28} />

          <h2>Temperature</h2>

          <strong className="feature-number">
            27°C
          </strong>

          <p>Current simulated temperature.</p>
        </div>

        <div className="feature-card">
          <Droplets size={28} />

          <h2>Water Usage</h2>

          <strong className="feature-number">
            54%
          </strong>

          <p>Simulated campus water usage.</p>
        </div>

      </div>

      <div className="campus-workspace">

        <Leaf size={40} />

        <h2>Environmental Analytics</h2>

        <p>
          Environmental metrics and historical trends can be
          displayed using charts.
        </p>

      </div>

    </div>
  );
}

export default EnvironmentPage;