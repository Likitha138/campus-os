import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { alertsData } from "../data/campus";

export default function Alerts() {
  return (
    <div className="page">
      <PageHeader
        title="Alerts"
        subtitle="Monitor important campus warnings and AI-generated signals."
      />

      <div className="alert-summary-grid">
        <div>
          <AlertTriangle size={18} />
          <span>All alerts</span>
          <strong>04</strong>
        </div>

        <div>
          <ShieldAlert size={18} />
          <span>High priority</span>
          <strong>01</strong>
        </div>

        <div>
          <Clock size={18} />
          <span>Active</span>
          <strong>03</strong>
        </div>

        <div>
          <CheckCircle2 size={18} />
          <span>Resolved today</span>
          <strong>18</strong>
        </div>
      </div>

      <div className="alerts-list">
        {alertsData.map((alert) => (
          <article
            className={`alert-card ${alert.severity.toLowerCase()}`}
            key={alert.id}
          >
            <div className="alert-icon">
              <AlertTriangle size={19} />
            </div>

            <div className="alert-content">
              <div className="alert-title">
                <strong>{alert.title}</strong>

                <span
                  className={`status-pill ${
                    alert.severity === "High"
                      ? "danger"
                      : alert.severity ===
                        "Medium"
                      ? "warning"
                      : "success"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              <p>{alert.description}</p>

              <small>
                {alert.id} · {alert.time}
              </small>
            </div>

            <button className="secondary-button compact">
              Review
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}