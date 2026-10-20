import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Users,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import CreateEventForm from "../components/CreateEventForm";
import EventNotificationPanel from "../components/EventNotificationPanel";
import { eventsData } from "../data/campus";

export default function Events() {
  return (
    <div className="page">
      <PageHeader
        title="Event Planner"
        subtitle="Plan, simulate and monitor campus events."
        actions={
          <button className="primary-button">
            <Plus size={16} />
            New Event
          </button>
        }
      />

      <div className="event-layout">
        <div>
          <CreateEventForm />

          <div className="panel event-table-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  EVENT SCHEDULE
                </span>
                <h3>Campus Events</h3>
              </div>
            </div>

            <div className="event-table">
              {eventsData.map((event) => (
                <div
                  className="event-table-row"
                  key={event.id}
                >
                  <div className="event-symbol">
                    <CalendarDays size={18} />
                  </div>

                  <div className="event-info">
                    <strong>{event.title}</strong>
                    <span>{event.id}</span>
                  </div>

                  <div className="event-cell">
                    <MapPin size={13} />
                    {event.location}
                  </div>

                  <div className="event-cell">
                    <Clock size={13} />
                    {event.date}
                  </div>

                  <div className="event-cell">
                    <Users size={13} />
                    {event.attendees}
                  </div>

                  <span className="status-pill success">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <EventNotificationPanel />
      </div>

      <div className="panel event-builder">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              3D EVENT LAYOUT
            </span>
            <h3>Event Arrangement Workspace</h3>
          </div>

          <span className="status-pill info">
            SIMULATION
          </span>
        </div>

        <div className="event-builder-workspace">
          <div className="event-stage">
            <div className="stage-object">
              STAGE
            </div>

            <div className="chair-row">
              {Array.from({ length: 24 }).map(
                (_, index) => (
                  <span key={index} />
                )
              )}
            </div>

            <div className="registration-object">
              REGISTRATION
            </div>

            <div className="entry-object">
              ENTRY
            </div>

            <div className="exit-object">
              EXIT
            </div>
          </div>

          <div className="event-tools">
            <span className="panel-kicker">
              OBJECTS
            </span>

            {[
              "Stage",
              "Chair Group",
              "Speakers",
              "Registration",
              "Entry Gate",
              "Exit Gate",
            ].map((tool) => (
              <button key={tool}>
                <Plus size={14} />
                {tool}
              </button>
            ))}

            <div className="event-capacity">
              <span>Estimated Capacity</span>
              <strong>850 / 1000</strong>

              <div className="progress-bar">
                <span style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}