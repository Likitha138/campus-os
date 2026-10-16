import { FormEvent, useState } from "react";
import {
  CalendarDays,
  Plus,
  Trash2,
  MapPin,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

interface CampusEvent {
  id: number;
  name: string;
  date: string;
  location: string;
  participants: number;
}

function Events() {
  const [events, setEvents] = useState<CampusEvent[]>([
    {
      id: 1,
      name: "Tech Fest",
      date: "2026-10-20",
      location: "Auditorium",
      participants: 500,
    },
    {
      id: 2,
      name: "Sports Meet",
      date: "2026-10-24",
      location: "Sports Ground",
      participants: 300,
    },
  ]);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");

  const addEvent = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !date || !location) {
      alert("Please fill all event details.");
      return;
    }

    const newEvent: CampusEvent = {
      id: Date.now(),
      name,
      date,
      location,
      participants: Number(participants) || 0,
    };

    setEvents((previous) => [
      ...previous,
      newEvent,
    ]);

    setName("");
    setDate("");
    setLocation("");
    setParticipants("");
  };

  const deleteEvent = (id: number) => {
    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Campus Events"
        subtitle="Create and manage campus events"
      />

      <div className="page-grid">
        <div className="feature-card">
          <CalendarDays size={30} />

          <h2>Create Event</h2>

          <form
            onSubmit={addEvent}
            style={{
              display: "grid",
              gap: 12,
              marginTop: 20,
            }}
          >
            <input
              className="feature-input"
              placeholder="Event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="feature-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              className="feature-input"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

            <input
              className="feature-input"
              type="number"
              placeholder="Expected participants"
              value={participants}
              onChange={(e) =>
                setParticipants(e.target.value)
              }
            />

            <button
              className="feature-button"
              type="submit"
            >
              <Plus size={17} />
              Create Event
            </button>
          </form>
        </div>

        <div className="feature-card">
          <CalendarDays size={30} />

          <h2>Total Events</h2>

          <strong
            style={{
              fontSize: 40,
              display: "block",
              marginTop: 15,
            }}
          >
            {events.length}
          </strong>

          <p>
            Events currently registered in the
            simulated campus system.
          </p>
        </div>

        <div className="feature-card">
          <Users size={30} />

          <h2>Total Participants</h2>

          <strong
            style={{
              fontSize: 40,
              display: "block",
              marginTop: 15,
            }}
          >
            {events
              .reduce(
                (total, event) =>
                  total + event.participants,
                0
              )
              .toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="campus-workspace">
        <h2>Upcoming Events</h2>

        <div
          style={{
            width: "100%",
            maxWidth: 900,
            marginTop: 25,
            display: "grid",
            gap: 12,
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 15,
                padding: 18,
                borderRadius: 14,
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                textAlign: "left",
              }}
            >
              <div>
                <strong
                  style={{
                    fontSize: 18,
                  }}
                >
                  {event.name}
                </strong>

                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    flexWrap: "wrap",
                    marginTop: 8,
                    color:
                      "rgba(255,255,255,0.6)",
                    fontSize: 13,
                  }}
                >
                  <span>
                    📅 {event.date}
                  </span>

                  <span>
                    <MapPin
                      size={14}
                      style={{
                        display: "inline",
                      }}
                    />{" "}
                    {event.location}
                  </span>

                  <span>
                    <Users
                      size={14}
                      style={{
                        display: "inline",
                      }}
                    />{" "}
                    {event.participants}
                  </span>
                </div>
              </div>

              <button
                className="feature-button"
                onClick={() =>
                  deleteEvent(event.id)
                }
                style={{
                  background:
                    "rgba(255,70,70,0.15)",
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {events.length === 0 && (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;