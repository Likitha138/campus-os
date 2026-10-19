// =========================================================
// CAMPUS OS — EVENT NOTIFICATION PANEL
// =========================================================

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";

import type { StudentNotification } from "../services/eventNotificationService";

type Props = {
  notifications: StudentNotification[];

  onOpenEvent?: (
    eventId: string
  ) => void;

  onMarkRead?: (
    notificationId: string
  ) => void;
};

export default function EventNotificationPanel({
  notifications,
  onOpenEvent,
  onMarkRead,
}: Props) {
  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  return (
    <section className="event-notification-panel">
      {/* HEADER */}

      <div className="event-notification-header">
        <div className="event-notification-title">
          <div className="event-notification-icon">
            <Bell size={17} />
          </div>

          <div>
            <span>
              CAMPUS NOTIFICATIONS
            </span>

            <h3>
              Event Alerts
            </h3>
          </div>
        </div>

        {unreadCount > 0 && (
          <div className="event-notification-count">
            {unreadCount} NEW
          </div>
        )}
      </div>

      {/* CONTENT */}

      {notifications.length === 0 ? (
        <div className="event-notification-empty">
          <CheckCircle2 size={30} />

          <strong>
            No event notifications
          </strong>

          <p>
            You are currently up to date.
          </p>
        </div>
      ) : (
        <div className="event-notification-list">
          {notifications.map(
            (notification) => (
              <article
                key={notification.id}
                className={`event-notification ${
                  notification.read
                    ? "read"
                    : "unread"
                }`}
              >
                <div className="notification-status">
                  <Bell size={15} />
                </div>

                <div className="notification-main">
                  <div className="notification-top">
                    <strong>
                      {notification.title}
                    </strong>

                    {!notification.read && (
                      <span className="notification-new">
                        NEW
                      </span>
                    )}
                  </div>

                  <p>
                    {notification.message}
                  </p>

                  <div className="notification-meta">
                    <span>
                      <CalendarDays
                        size={11}
                      />

                      Event alert
                    </span>

                    <span>
                      <Users size={11} />

                      You are eligible
                    </span>
                  </div>

                  <div className="notification-actions">
                    <button
                      type="button"
                      onClick={() => {
                        onMarkRead?.(
                          notification.id
                        );

                        onOpenEvent?.(
                          notification.eventId
                        );
                      }}
                    >
                      View Event

                      <ChevronRight
                        size={13}
                      />
                    </button>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}