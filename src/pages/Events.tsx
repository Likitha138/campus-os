// =========================================================
// CAMPUS OS — EVENTS PAGE
// =========================================================

import {
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";

import CreateEventForm from "../components/CreateEventForm";

import {
  campusEvents,
  type CampusEvent,
} from "../data/events";

import { students } from "../data/students";

import {
  identifyEligibleStudents,
} from "../services/eventNotificationService";

export default function Events() {
  const [
    events,
    setEvents,
  ] = useState<CampusEvent[]>(
    campusEvents
  );

  const [selectedEvent, setSelectedEvent] =
    useState<CampusEvent | null>(
      null
    );

  const handleCreateEvent = (
    newEvent: CampusEvent
  ) => {
    setEvents((current) => [
      newEvent,
      ...current,
    ]);
  };

  const eligibleStudents =
    useMemo(() => {
      if (!selectedEvent) {
        return [];
      }

      return identifyEligibleStudents(
        students,
        selectedEvent
      );
    }, [selectedEvent]);

  return (
    <div className="events-page">
      {/* PAGE HEADER */}

      <div className="events-page-header">
        <div>
          <span>
            CAMPUS OS / EVENT CONTROL
          </span>

          <h1>
            Campus Events
          </h1>

          <p>
            Create, manage and intelligently
            target events to eligible students.
          </p>
        </div>

        <div className="event-header-stat">
          <strong>
            {events.length}
          </strong>

          <span>
            ACTIVE EVENTS
          </span>
        </div>
      </div>

      {/* CREATE EVENT */}

      <CreateEventForm
        onCreate={
          handleCreateEvent
        }
      />

      {/* EVENT LIST */}

      <section className="events-section">
        <div className="events-section-header">
          <div>
            <span>
              EVENT REGISTRY
            </span>

            <h2>
              Upcoming Events
            </h2>
          </div>
        </div>

        <div className="events-list">
          {events.map(
            (event) => {
              const matches =
                identifyEligibleStudents(
                  students,
                  event
                );

              return (
                <article
                  className="event-card"
                  key={event.id}
                >
                  <div className="event-card-icon">
                    <CalendarDays
                      size={20}
                    />
                  </div>

                  <div className="event-card-main">
                    <div className="event-card-category">
                      {event.category}
                    </div>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {event.description}
                    </p>

                    <div className="event-card-meta">
                      <span>
                        <CalendarDays
                          size={12}
                        />

                        {event.date}
                      </span>

                      <span>
                        <Clock3
                          size={12}
                        />

                        {event.time}
                      </span>

                      <span>
                        <MapPin
                          size={12}
                        />

                        {event.venue}
                      </span>
                    </div>
                  </div>

                  <div className="event-card-target">
                    <div>
                      <Users size={13} />

                      <strong>
                        {matches.length}
                      </strong>
                    </div>

                    <span>
                      students identified
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedEvent(
                          event
                        )
                      }
                    >
                      View targeting

                      <ChevronRight
                        size={13}
                      />
                    </button>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </section>

      {/* STUDENT IDENTIFICATION */}

      {selectedEvent && (
        <section className="event-identification-panel">
          <div className="identification-header">
            <div>
              <span>
                TARGETING ENGINE
              </span>

              <h2>
                Students Identified
              </h2>

              <p>
                {selectedEvent.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedEvent(null)
              }
            >
              Close
            </button>
          </div>

          <div className="identified-students">
            {eligibleStudents.map(
              (match) => (
                <div
                  className="identified-student"
                  key={
                    match.student.id
                  }
                >
                  <div className="student-avatar">
                    {match.student.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="student-identification-info">
                    <strong>
                      {
                        match.student
                          .name
                      }
                    </strong>

                    <span>
                      {
                        match.student
                          .id
                      }{" "}
                      •{" "}
                      {
                        match.student
                          .department
                      }{" "}
                      • Year{" "}
                      {
                        match.student
                          .year
                      }
                    </span>
                  </div>

                  <div className="match-score">
                    <strong>
                      {match.score}%
                    </strong>

                    <span>
                      MATCH
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}