import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Info,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { alerts } from "../services/data";

function Alerts() {
  const getIcon = (type: string) => {
    if (type === "warning") {
      return <AlertTriangle size={19} />;
    }

    if (type === "success") {
      return <CheckCircle2 size={19} />;
    }

    return <Info size={19} />;
  };

  return (
    <div>
      <PageHeader
        title="Smart Alerts"
        description="Important academic notifications and intelligent reminders."
      />

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Total Alerts</div>
          <div className="stat-value">{alerts.length}</div>
          <div className="stat-change">Recent notifications</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Warnings</div>
          <div className="stat-value">
            {alerts.filter((item) => item.type === "warning").length}
          </div>
          <div className="stat-change">Requires attention</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Information</div>
          <div className="stat-value">
            {alerts.filter((item) => item.type === "info").length}
          </div>
          <div className="stat-change">General updates</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Positive Updates</div>
          <div className="stat-value">
            {alerts.filter((item) => item.type === "success").length}
          </div>
          <div className="stat-change">Performance updates</div>
        </div>
      </div>

      <div className="glass-card chart-card">
        <div className="stat-top">
          <div>
            <h2 className="section-title">Recent Alerts</h2>
            <p className="stat-label">
              Smart notifications from Campus OS
            </p>
          </div>

          <Bell size={20} />
        </div>

        <div className="alert-list">
          {alerts.map((alert) => (
            <div className="alert-item" key={alert.title}>
              <div className="alert-icon">
                {getIcon(alert.type)}
              </div>

              <div>
                <h4>{alert.title}</h4>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;