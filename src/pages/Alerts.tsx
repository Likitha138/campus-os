import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Alerts() {
  const alerts = [
    {
      title: "Attendance below threshold",
      text: "Computer Networks attendance has reached 74%.",
      type: "warning",
    },
    {
      title: "Assignment deadline approaching",
      text: "Database ER Diagram is due tomorrow.",
      type: "info",
    },
    {
      title: "Performance improving",
      text: "Your recent assessment score increased by 8%.",
      type: "success",
    },
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="SMART ALERTS"
        title="Alerts"
        description="Important academic and campus alerts in one place."
      />

      <div className="alert-list">
        {alerts.map((alert) => (
          <div className={`alert-card ${alert.type}`} key={alert.title}>
            <div className="alert-icon">
              {alert.type === "warning" && <AlertTriangle size={19} />}
              {alert.type === "info" && <Info size={19} />}
              {alert.type === "success" && <CheckCircle2 size={19} />}
            </div>

            <div>
              <strong>{alert.title}</strong>
              <p>{alert.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}