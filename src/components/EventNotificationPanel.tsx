import { Bell, CalendarDays, CheckCircle2, MapPin } from "lucide-react";
import { getNotifications } from "../services/eventNotificationService";

export default function EventNotificationPanel() {
  const notifications = getNotifications();

  return (
    <div className="notification-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">LIVE FEED</span>
          <h3>Campus notifications</h3>
        </div>

        <div className="notification-count">
          <Bell size={15} />
          {notifications.length}
        </div>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="empty-state">No new notifications.</div>
        ) : (
          notifications.map((item: any) => (
            <div className="notification-item" key={item.id}>
              <div className="notification-icon">
                <CalendarDays size={16} />
              </div>

              <div>
                <strong>{item.title}</strong>
                <p>{item.description}</p>

                <div className="notification-meta">
                  <span>
                    <MapPin size={12} />
                    {item.location}
                  </span>
                  <span>
                    <CheckCircle2 size={12} />
                    {item.status || "New"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}