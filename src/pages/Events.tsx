// ============================================================
// src/pages/Events.tsx
// ============================================================

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { events } from "../services/data";

function Events() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS OPERATIONS"
        title="Events & Activities"
        description="Manage today's simulated campus events and activity zones."
        icon={<CalendarDays size={22} />}
        action={
          <button type="button" className="primary-button">
            <CalendarDays size={16} />
            Create Event
          </button>
        }
      />

      <section className="event-feature">
        <div>
          <span>TODAY'S CAMPUS PULSE</span>
          <h2>2 major events are active today.</h2>
          <p>
            The digital twin is tracking attendance,
            locations and estimated movement around
            event zones.
          </p>
        </div>

        <div className="event-pulse-ring">
          <Users size={28} />
          <strong>600+</strong>
          <span>expected</span>
        </div>
      </section>

      <section className="event-grid">
        {events.map((event) => (
          <article
            className="event-card"
            key={event.id}
          >
            <div className="event-card-top">
              <span className="event-id">
                {event.id}
              </span>

              <span className="event-live">
                LIVE
              </span>
            </div>

            <h2>{event.title}</h2>

            <div className="event-meta">
              <span>
                <Clock3 size={15} />
                {event.time}
              </span>

              <span>
                <MapPin size={15} />
                {event.location}
              </span>

              <span>
                <Users size={15} />
                {event.attendees} attendees
              </span>
            </div>

            <button type="button">
              View event
              <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Events;