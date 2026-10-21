import { CalendarDays, MapPin, Plus, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import CreateEventForm from "../components/CreateEventForm";
import { events } from "../data/events";

export default function Events() {
  const session = JSON.parse(
    localStorage.getItem("campus_os_session") || "null"
  );

  const isAdmin = session?.role === "admin";

  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS EVENTS"
        title="Events & Activities"
        description="Discover upcoming campus activities and announcements."
      />

      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-card-top">
              <span className="event-category">{event.category}</span>
              <span className="status-pill low">{event.status}</span>
            </div>

            <h3>{event.title}</h3>

            <div className="event-detail">
              <CalendarDays size={15} />
              {event.date} · {event.time}
            </div>

            <div className="event-detail">
              <MapPin size={15} />
              {event.location}
            </div>

            <div className="event-footer">
              <span>
                <Users size={14} />
                Students notified
              </span>

              <button>
                View <Plus size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="admin-section">
          <CreateEventForm />
        </div>
      )}
    </div>
  );
}