import {
  BellRing,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

export default function EventNotificationPanel() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <span className="panel-kicker">
            EVENT MONITOR
          </span>
          <h3>Upcoming Event Notifications</h3>
        </div>

        <BellRing size={18} />
      </div>

      <div className="notification-list">
        <div className="notification-row">
          <div className="notification-status success">
            <CheckCircle2 size={15} />
          </div>

          <div className="notification-content">
            <strong>Annual Tech Fest</strong>
            <span>
              Venue preparation confirmed.
            </span>
          </div>

          <div className="notification-meta">
            <Clock3 size={12} />
            2 days
          </div>
        </div>

        <div className="notification-row">
          <div className="notification-status warning">
            <Users size={15} />
          </div>

          <div className="notification-content">
            <strong>Placement Drive</strong>
            <span>
              Registration approaching capacity.
            </span>
          </div>

          <div className="notification-meta">
            72%
          </div>
        </div>
      </div>
    </div>
  );
}