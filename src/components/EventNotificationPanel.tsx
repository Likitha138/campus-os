import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  MapPin,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import {
  getNotifications,
  type CampusNotification,
} from "../services/eventNotificationService";

export default function EventNotificationPanel() {
  const [notifications, setNotifications] = useState<
    CampusNotification[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getNotifications();
      setNotifications(result);
    } catch (err) {
      console.error("Failed to load event notifications:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();

    const handleEventsUpdated = () => {
      void loadNotifications();
    };

    window.addEventListener(
      "campus-os-events-updated",
      handleEventsUpdated
    );

    return () => {
      window.removeEventListener(
        "campus-os-events-updated",
        handleEventsUpdated
      );
    };
  }, [loadNotifications]);

  return (
    <section className="notification-panel">
      <div className="notification-panel-header">
        <div>
          <span className="eyebrow">CAMPUS UPDATES</span>
          <h3>
            <Bell size={18} />
            Event Notifications
          </h3>
          <p>Keep track of upcoming campus events.</p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => void loadNotifications()}
          disabled={loading}
          aria-label="Refresh notifications"
        >
          {loading ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
        </button>
      </div>

      {loading && (
        <div className="notification-empty" role="status">
          <LoaderCircle size={22} className="animate-spin" />
          <p>Loading notifications...</p>
        </div>
      )}

      {!loading && error && (
        <div className="notification-empty" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => void loadNotifications()}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="notification-empty">
          <Bell size={24} />
          <p>No event notifications yet.</p>
        </div>
      )}

      {!loading && !error && notifications.length > 0 && (
        <div className="notification-list">
          {notifications.map((item) => (
            <article className="notification-item" key={item.id}>
              <div className="notification-item-icon">
                <CalendarDays size={18} />
              </div>

              <div className="notification-item-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <div className="notification-item-meta">
                  <span>
                    <MapPin size={13} />
                    {item.location || "Campus"}
                  </span>

                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}