import {
  Bell,
  CheckCheck,
  Clock3,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { notifications } from "../data/campus";

export default function Notifications() {
  return (
    <div className="page">
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with campus activities and system messages."
        actions={
          <button className="secondary-button">
            <CheckCheck size={15} />
            Mark all read
          </button>
        }
      />

      <div className="notification-page-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                INBOX
              </span>
              <h3>Recent Notifications</h3>
            </div>

            <Bell size={18} />
          </div>

          <div className="notification-page-list">
            {notifications.map(
              (notification, index) => (
                <div
                  className={`notification-page-row ${
                    notification.unread
                      ? "unread"
                      : ""
                  }`}
                  key={index}
                >
                  <div className="notification-page-icon">
                    <Bell size={16} />
                  </div>

                  <div>
                    <strong>
                      {notification.title}
                    </strong>

                    <p>{notification.text}</p>

                    <span>
                      <Clock3 size={12} />
                      {notification.time}
                    </span>
                  </div>

                  {notification.unread && (
                    <i className="unread-dot" />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="panel notification-preferences">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                PREFERENCES
              </span>
              <h3>Notification Channels</h3>
            </div>
          </div>

          {[
            "Event updates",
            "Attendance alerts",
            "Traffic warnings",
            "Emergency alerts",
            "AI recommendations",
          ].map((item) => (
            <label
              className="toggle-row"
              key={item}
            >
              <span>{item}</span>
              <input
                type="checkbox"
                defaultChecked
              />
              <i />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}