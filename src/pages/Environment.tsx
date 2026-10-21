import { CloudRain, Droplets, Sun, Thermometer, Wind } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function Environment() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="ENVIRONMENTAL INTELLIGENCE"
        title="Campus Environment"
        description="Monitor simulated environmental conditions across campus."
      />

      <div className="stats-grid">
        <StatCard label="Air Quality Index" value="42" change="Good" trend="up" icon="activity" />
        <StatCard label="Temperature" value="26" suffix="°C" icon="activity" />
        <StatCard label="Humidity" value="61" suffix="%" icon="chart" />
        <StatCard label="Wind Speed" value="12" suffix=" km/h" icon="activity" />
      </div>

      <div className="environment-grid">
        <div className="environment-main">
          <div className="environment-icon">
            <Sun size={45} />
          </div>
          <span>Current conditions</span>
          <strong>Partly cloudy</strong>
          <p>Comfortable conditions across the campus.</p>
        </div>

        {[
          [Wind, "Wind", "12 km/h", "North East"],
          [Droplets, "Humidity", "61%", "Normal"],
          [CloudRain, "Rain probability", "18%", "Low"],
          [Thermometer, "Temperature", "26°C", "Comfortable"],
        ].map(([Icon, label, value, detail]: any) => (
          <div className="data-card environment-stat" key={label}>
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}