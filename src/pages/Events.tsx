import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  Plus,
  Users,
  X,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import CreateEventForm from "../components/CreateEventForm";
import {
  getEvents,
  type CampusEvent,
} from "../services/eventNotificationService";
import { useAuth } from "../auth/AuthContext";

export default function Events() {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [eventList, setEventList] = useState<CampusEvent[]>([]);
  const [selectedEvent, setSelectedEvent] =
    useState<CampusEvent | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const refreshEvents = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);

    try {
      setError("");
      const events = await getEvents();
      setEventList(events);

      setSelectedEvent((current) => {
        if (!current) return null;
        return events.find((item) => item.id === current.id) ?? null;
      });
    } catch (err) {
      console.error("Failed to load campus events:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load events. Check your backend connection."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void refreshEvents();

    const handleUpdate = () => {
      void refreshEvents();
    };

    window.addEventListener("campus-os-events-updated", handleUpdate);

    return () => {
      window.removeEventListener(
        "campus-os-events-updated",
        handleUpdate
      );
    };
  }, [refreshEvents]);

  const handleEventCreated = () => {
    setShowCreateForm(false);
    void refreshEvents(true);
  };

  const closeDetails = () => setSelectedEvent(null);

  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS EVENTS"
        title="Events & Activities"
        description="Discover upcoming campus activities and announcements."
      />

      <div className="events-toolbar">
        <div>
          <h3>Campus calendar</h3>
          <p>
            {eventList.length} event
            {eventList.length === 1 ? "" : "s"} available
          </p>
        </div>

        <div className="events-toolbar-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => void refreshEvents(true)}
            disabled={loading || refreshing}
          >
            {refreshing ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}
            Refresh
          </button>

          {isAdmin && (
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowCreateForm((value) => !value)}
            >
              {showCreateForm ? (
                <>
                  <X size={16} />
                  Close form
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Event
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {isAdmin && showCreateForm && (
        <div className="admin-section">
          <CreateEventForm
            onCreated={handleEventCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {loading && (
        <div className="empty-state" role="status">
          <LoaderCircle size={32} className="animate-spin" />
          <h3>Loading campus events</h3>
          <p>Connecting to the campus event calendar...</p>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state" role="alert">
          <CalendarDays size={32} />
          <h3>Could not load events</h3>
          <p>{error}</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => void refreshEvents(true)}
            disabled={refreshing}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && eventList.length > 0 && (
        <div className="event-grid">
          {eventList.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="event-card-top">
                <span className="event-category">
                  {event.category || "Campus"}
                </span>
                <span className="status-pill low">
                  {event.status || "Upcoming"}
                </span>
              </div>

              <h3>{event.title}</h3>

              <div className="event-detail">
                <CalendarDays size={15} />
                <span>
                  {event.date}
                  {event.time ? ` · ${event.time}` : ""}
                </span>
              </div>

              <div className="event-detail">
                <MapPin size={15} />
                <span>
                  {event.location || "Location to be announced"}
                </span>
              </div>

              <div className="event-footer">
                <span>
                  <Users size={14} />
                  Campus event
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  aria-label={`View details for ${event.title}`}
                >
                  View
                  <Eye size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && eventList.length === 0 && (
        <div className="empty-state">
          <CalendarDays size={32} />
          <h3>No events available</h3>
          <p>
            New campus events will appear here when they are created.
          </p>

          {isAdmin && (
            <button
              type="button"
              className="primary-button"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus size={16} />
              Create your first event
            </button>
          )}
        </div>
      )}

      {selectedEvent && (
        <div
          className="event-modal-backdrop"
          onClick={closeDetails}
          role="presentation"
        >
          <section
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="event-modal-header">
              <div>
                <span className="event-category">
                  {selectedEvent.category || "Campus"}
                </span>
                <h2 id="event-dialog-title">
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                type="button"
                className="event-modal-close"
                onClick={closeDetails}
                aria-label="Close event details"
              >
                <X size={20} />
              </button>
            </div>

            <p className="event-modal-description">
              {selectedEvent.description || "No description provided."}
            </p>

            <div className="event-modal-details">
              <div className="event-detail">
                <CalendarDays size={17} />
                <span>
                  {selectedEvent.date}
                  {selectedEvent.time ? ` · ${selectedEvent.time}` : ""}
                </span>
              </div>

              <div className="event-detail">
                <MapPin size={17} />
                <span>
                  {selectedEvent.location || "Location to be announced"}
                </span>
              </div>

              <div className="event-detail">
                <Clock size={17} />
                <span>
                  {selectedEvent.duration || "Duration not specified"}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={closeDetails}
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </div>
  );
}