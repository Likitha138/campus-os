import { Bell, CheckCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EventNotificationPanel from "../components/EventNotificationPanel";

type NotificationPreference = {
  name: string;
  enabled: boolean;
};

const notificationPreferences: NotificationPreference[] = [
  {
    name: "Campus events",
    enabled: true,
  },
  {
    name: "Attendance alerts",
    enabled: true,
  },
  {
    name: "Academic updates",
    enabled: true,
  },
  {
    name: "Career opportunities",
    enabled: false,
  },
  {
    name: "Emergency alerts",
    enabled: true,
  },
];

export default function Notifications() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="COMMUNICATION"
        title="Notifications"
        description="Campus announcements, event updates and important messages."
      />

      <div className="notification-page-layout">
        <EventNotificationPanel />

        <div className="data-card">
          <div className="card-heading">
            <div>
              <strong>Notification preferences</strong>
              <small>Control what you receive</small>
            </div>
          </div>

          <div className="notification-preferences">
            {notificationPreferences.map((preference) => (
              <div
                className="preference-row"
                key={`notification-${preference.name}`}
              >
                <div className="preference-label">
                  <Bell size={16} />
                  <span>{preference.name}</span>
                </div>

                <div
                  className={`toggle ${
                    preference.enabled ? "active" : ""
                  }`}
                  role="switch"
                  aria-checked={preference.enabled}
                  aria-label={`Toggle ${preference.name}`}
                >
                  <span />
                </div>
              </div>
            ))}
          </div>

          <button className="secondary-button" type="button">
            <CheckCheck size={15} />
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}