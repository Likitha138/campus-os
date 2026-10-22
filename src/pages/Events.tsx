import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  Plus,
  Users,
  X,
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
  const isAdmin = user?.role === "admin";

  const [eventList, setEventList] = useState<CampusEvent[]>([]);
  const [selectedEvent, setSelectedEvent] =
    useState<CampusEvent | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  function refreshEvents() {
    setEventList(getEvents());
  }

  useEffect(() => {
    refreshEvents();

    const handleUpdate = () => refreshEvents();

    window.addEventListener("campus-os-events-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(
        "campus-os-events-updated",
        handleUpdate
      );
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

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

        {isAdmin && (
          <button
            className="primary-button"
            type="button"
            onClick={() =>
              setShowCreateForm((visible) => !visible)
            }
          >
            {showCreateForm ? <X size={16} /> : <Plus size={16} />}
            {showCreateForm ? "Close form" : "Create Event"}
          </button>
        )}
      </div>

      {isAdmin && showCreateForm && (
        <div className="admin-section">
          <CreateEventForm
            onCreated={refreshEvents}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {eventList.length > 0 ? (
        <div className="event-grid">
          {eventList.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="event-card-top">
                <span className="event-category">
                  {event.category}
                </span>

                <span className="status-pill low">
                  {event.status}
                </span>
              </div>

              <h3>{event.title}</h3>

              <div className="event-detail">
                <CalendarDays size={15} />
                <span>
                  {event.date} · {event.time}
                </span>
              </div>

              <div className="event-detail">
                <MapPin size={15} />
                <span>{event.location}</span>
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
                  View <Eye size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays size={32} />
          <h3>No events available</h3>
          <p>
            New campus events will appear here when they are created.
          </p>
        </div>
      )}

      {selectedEvent && (
        <div
          className="event-modal-backdrop"
          onClick={() => setSelectedEvent(null)}
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
                  {selectedEvent.category}
                </span>

                <h2 id="event-dialog-title">
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                type="button"
                className="event-modal-close"
                onClick={() => setSelectedEvent(null)}
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
                  {selectedEvent.date} · {selectedEvent.time}
                </span>
              </div>

              <div className="event-detail">
                <MapPin size={17} />
                <span>{selectedEvent.location}</span>
              </div>

              <div className="event-detail">
                <Clock size={17} />
                <span>
                  {selectedEvent.duration ||
                    "Duration not specified"}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => setSelectedEvent(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </div>
  );
}