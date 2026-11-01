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
  CheckCircle2,
  XCircle,
  Hourglass,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import CreateEventForm from "../components/CreateEventForm";

import {
  getEvents,
  getMyEventResponse,
  respondToEvent,
  getEventParticipationSummary,
  type CampusEvent,
  type EventResponseChoice,
  type EventParticipationSummary,
  type StudentEventResponse,
} from "../services/eventNotificationService";

import { useAuth } from "../auth/AuthContext";

export default function Events() {
  const { user } = useAuth();

  const role = user?.role?.toLowerCase();

  const isAdmin = role === "admin";
  const isStudent = role === "student";

  const [eventList, setEventList] = useState<CampusEvent[]>([]);
  const [selectedEvent, setSelectedEvent] =
    useState<CampusEvent | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [studentResponses, setStudentResponses] = useState<
    Record<string, StudentEventResponse | null>
  >({});

  const [participation, setParticipation] = useState<
    Record<string, EventParticipationSummary>
  >({});

  const [submittingEvent, setSubmittingEvent] = useState<
    string | null
  >(null);

  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState("");

  // ======================================================
  // LOAD EVENTS
  // ======================================================

  const refreshEvents = useCallback(
    async (manual = false) => {
      if (manual) {
        setRefreshing(true);
      }

      try {
        setError("");

        const events = await getEvents();

        setEventList(events);

        setSelectedEvent((current) => {
          if (!current) return null;

          return (
            events.find((event) => event.id === current.id) ?? null
          );
        });

        // Load each student's response.
        if (isStudent) {
          const responseResults = await Promise.all(
            events.map(async (event) => {
              try {
                const result = await getMyEventResponse(event.id);

                return {
                  eventId: event.id,
                  response: result,
                };
              } catch (err) {
                console.error(
                  `Could not load response for event ${event.id}:`,
                  err
                );

                return {
                  eventId: event.id,
                  response: null,
                };
              }
            })
          );

          const responseMap: Record<
            string,
            StudentEventResponse | null
          > = {};

          responseResults.forEach((item) => {
            responseMap[item.eventId] = item.response;
          });

          setStudentResponses(responseMap);
        }

        // Load participation counts for admin.
        if (isAdmin) {
          const summaryResults = await Promise.all(
            events.map(async (event) => {
              try {
                const summary =
                  await getEventParticipationSummary(event.id);

                return {
                  eventId: event.id,
                  summary,
                };
              } catch (err) {
                console.error(
                  `Could not load summary for event ${event.id}:`,
                  err
                );

                return {
                  eventId: event.id,
                  summary: null,
                };
              }
            })
          );

          const summaryMap: Record<
            string,
            EventParticipationSummary
          > = {};

          summaryResults.forEach((item) => {
            if (item.summary) {
              summaryMap[item.eventId] = item.summary;
            }
          });

          setParticipation(summaryMap);
        }
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
    },
    [isAdmin, isStudent]
  );

  useEffect(() => {
    void refreshEvents();

    const handleEventsUpdated = () => {
      void refreshEvents();
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
  }, [refreshEvents]);

  // ======================================================
  // EVENT CREATED
  // ======================================================

  const handleEventCreated = () => {
    setShowCreateForm(false);
    void refreshEvents(true);
  };

  // ======================================================
  // STUDENT ACCEPT / REJECT
  // ======================================================

  const handleStudentResponse = async (
    eventId: string,
    choice: EventResponseChoice
  ) => {
    try {
      setSubmittingEvent(eventId);
      setResponseMessage("");
      setResponseError("");

      await respondToEvent(eventId, choice);

      const updatedResponse: StudentEventResponse = {
        response: choice,
      };

      setStudentResponses((current) => ({
        ...current,
        [eventId]: updatedResponse,
      }));

      setResponseMessage(
        choice === "accepted"
          ? "You have accepted this event."
          : "You have rejected this event."
      );
    } catch (err) {
      console.error("Unable to save event response:", err);

      setResponseError(
        err instanceof Error
          ? err.message
          : "Unable to save your response."
      );
    } finally {
      setSubmittingEvent(null);
    }
  };

  // ======================================================
  // CLOSE EVENT DETAILS
  // ======================================================

  const closeDetails = () => {
    setSelectedEvent(null);
    setResponseMessage("");
    setResponseError("");
  };

  // ======================================================
  // STUDENT RESPONSE UI
  // ======================================================

  const renderStudentResponse = (event: CampusEvent) => {
    const currentResponse =
      studentResponses[event.id]?.response;

    const isSubmitting = submittingEvent === event.id;

    const isCompleted =
      event.status?.toLowerCase() === "completed";

    return (
      <div className="event-response-section">
        <p className="event-response-heading">
          Your participation
        </p>

        {currentResponse && (
          <div
            className={`event-response-status ${currentResponse}`}
          >
            {currentResponse === "accepted" ? (
              <CheckCircle2 size={16} />
            ) : (
              <XCircle size={16} />
            )}

            {currentResponse === "accepted"
              ? "You accepted this event"
              : "You rejected this event"}
          </div>
        )}

        {isCompleted ? (
          <p className="event-response-note">
            Responses are closed for this completed event.
          </p>
        ) : (
          <div className="event-response-actions">
            <button
              type="button"
              className="event-accept-button"
              disabled={isSubmitting}
              onClick={() =>
                void handleStudentResponse(event.id, "accepted")
              }
            >
              {isSubmitting ? (
                <LoaderCircle
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <CheckCircle2 size={15} />
              )}

              Accept
            </button>

            <button
              type="button"
              className="event-reject-button"
              disabled={isSubmitting}
              onClick={() =>
                void handleStudentResponse(event.id, "rejected")
              }
            >
              {isSubmitting ? (
                <LoaderCircle
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <XCircle size={15} />
              )}

              Reject
            </button>
          </div>
        )}

        {currentResponse && !isCompleted && (
          <p className="event-response-note">
            You can change your response before the event is completed.
          </p>
        )}
      </div>
    );
  };

  // ======================================================
  // ADMIN PARTICIPATION SUMMARY
  // ======================================================

  const renderAdminSummary = (eventId: string) => {
    const summary = participation[eventId];

    if (!summary) {
      return (
        <div className="event-participation-loading">
          <LoaderCircle
            size={15}
            className="animate-spin"
          />

          Loading participation...
        </div>
      );
    }

    return (
      <div className="event-participation">
        <p className="event-response-heading">
          Student participation
        </p>

        <div className="event-participation-grid">
          <div className="participation-stat accepted">
            <CheckCircle2 size={17} />
            <strong>{summary.accepted}</strong>
            <span>Accepted</span>
          </div>

          <div className="participation-stat rejected">
            <XCircle size={17} />
            <strong>{summary.rejected}</strong>
            <span>Rejected</span>
          </div>

          <div className="participation-stat pending">
            <Hourglass size={17} />
            <strong>{summary.pending}</strong>
            <span>Pending</span>
          </div>
        </div>

        <p className="event-participation-total">
          Total registered students: {summary.totalStudents}
        </p>
      </div>
    );
  };

  // ======================================================
  // MAIN PAGE
  // ======================================================

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
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={16} />
            )}

            Refresh
          </button>

          {isAdmin && (
            <button
              type="button"
              className="primary-button"
              onClick={() =>
                setShowCreateForm((current) => !current)
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
      </div>

      {/* CREATE EVENT FORM */}

      {isAdmin && showCreateForm && (
        <div className="admin-section">
          <CreateEventForm
            onCreated={handleEventCreated}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="empty-state" role="status">
          <LoaderCircle
            size={32}
            className="animate-spin"
          />

          <h3>Loading campus events</h3>

          <p>Connecting to the campus event calendar...</p>
        </div>
      )}

      {/* ERROR */}

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

      {/* EVENT LIST */}

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
                  onClick={() => {
                    setSelectedEvent(event);
                    setResponseMessage("");
                    setResponseError("");
                  }}
                  aria-label={`View details for ${event.title}`}
                >
                  View
                  <Eye size={14} />
                </button>
              </div>

              {isStudent && renderStudentResponse(event)}

              {isAdmin && renderAdminSummary(event.id)}
            </article>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}

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

      {/* EVENT DETAILS MODAL */}

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
              {selectedEvent.description ||
                "No description provided."}
            </p>

            <div className="event-modal-details">
              <div className="event-detail">
                <CalendarDays size={17} />

                <span>
                  {selectedEvent.date}
                  {selectedEvent.time
                    ? ` · ${selectedEvent.time}`
                    : ""}
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
                  {selectedEvent.duration}
                </span>
              </div>
            </div>

            {isStudent &&
              renderStudentResponse(selectedEvent)}

            {isAdmin &&
              renderAdminSummary(selectedEvent.id)}

            {responseMessage && (
              <p
                className="event-response-success"
                role="status"
              >
                {responseMessage}
              </p>
            )}

            {responseError && (
              <p
                className="event-response-error"
                role="alert"
              >
                {responseError}
              </p>
            )}

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