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

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  /*
   * =====================================================
   * LOAD EVENTS
   * =====================================================
   */

  const refreshEvents = () => {
    try {
      const events = getEvents();
      setEventList(events);
    } catch (error) {
      console.error("Failed to load events:", error);
      setEventList([]);
    }
  };

  /*
   * =====================================================
   * INITIAL LOAD + EVENT UPDATES
   * =====================================================
   */

  useEffect(() => {
    refreshEvents();

    const handleEventsUpdated = () => {
      refreshEvents();
    };

    const handleStorageChange = (
      event: StorageEvent
    ) => {
      if (
        event.key === "campus_os_events" ||
        event.key === "campus_os_notifications"
      ) {
        refreshEvents();
      }
    };

    window.addEventListener(
      "campus-os-events-updated",
      handleEventsUpdated
    );

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "campus-os-events-updated",
        handleEventsUpdated
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  /*
   * =====================================================
   * CREATE EVENT CALLBACK
   * =====================================================
   */

  const handleEventCreated = () => {
    refreshEvents();
    setShowCreateForm(false);
  };

  /*
   * =====================================================
   * CLOSE EVENT DETAILS
   * =====================================================
   */

  const closeDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <PageHeader
        eyebrow="CAMPUS EVENTS"
        title="Events & Activities"
        description="Discover upcoming campus activities and announcements."
      />

      {/* =================================================
          EVENTS TOOLBAR
      ================================================= */}

      <div className="events-toolbar">

        <div>
          <h3>Campus calendar</h3>

          <p>
            {eventList.length} event
            {eventList.length === 1 ? "" : "s"} available
          </p>
        </div>

        {/* =================================================
            ADMIN ONLY
        ================================================= */}

        {isAdmin && (
          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setShowCreateForm(
                (visible) => !visible
              )
            }
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

      {/* =================================================
          CREATE EVENT FORM
      ================================================= */}

      {isAdmin && showCreateForm && (
        <div className="admin-section">

          <CreateEventForm
            onCreated={handleEventCreated}
            onCancel={() =>
              setShowCreateForm(false)
            }
          />

        </div>
      )}

      {/* =================================================
          EVENT LIST
      ================================================= */}

      {eventList.length > 0 ? (

        <div className="event-grid">

          {eventList.map((event) => (

            <article
              className="event-card"
              key={event.id}
            >

              {/* EVENT TOP */}

              <div className="event-card-top">

                <span className="event-category">
                  {event.category}
                </span>

                <span className="status-pill low">
                  {event.status}
                </span>

              </div>

              {/* TITLE */}

              <h3>
                {event.title}
              </h3>

              {/* DATE */}

              <div className="event-detail">

                <CalendarDays size={15} />

                <span>
                  {event.date}
                  {" · "}
                  {event.time}
                </span>

              </div>

              {/* LOCATION */}

              <div className="event-detail">

                <MapPin size={15} />

                <span>
                  {event.location}
                </span>

              </div>

              {/* FOOTER */}

              <div className="event-footer">

                <span>
                  <Users size={14} />
                  Campus event
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                  aria-label={`View details for ${event.title}`}
                >
                  View
                  <Eye size={14} />
                </button>

              </div>

            </article>

          ))}

        </div>

      ) : (

        /* =================================================
           EMPTY STATE
        ================================================= */

        <div className="empty-state">

          <CalendarDays size={32} />

          <h3>
            No events available
          </h3>

          <p>
            New campus events will appear here
            when they are created.
          </p>

        </div>

      )}

      {/* =================================================
          EVENT DETAILS MODAL
      ================================================= */}

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
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

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
                onClick={closeDetails}
                aria-label="Close event details"
              >
                <X size={20} />
              </button>

            </div>

            {/* DESCRIPTION */}

            <p className="event-modal-description">
              {selectedEvent.description ||
                "No description provided."}
            </p>

            {/* EVENT INFORMATION */}

            <div className="event-modal-details">

              <div className="event-detail">

                <CalendarDays size={17} />

                <span>
                  {selectedEvent.date}
                  {" · "}
                  {selectedEvent.time}
                </span>

              </div>

              <div className="event-detail">

                <MapPin size={17} />

                <span>
                  {selectedEvent.location}
                </span>

              </div>

              <div className="event-detail">

                <Clock size={17} />

                <span>
                  {selectedEvent.duration ||
                    "Duration not specified"}
                </span>

              </div>

            </div>

            {/* CLOSE BUTTON */}

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