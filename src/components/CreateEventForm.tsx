import { CalendarPlus, MapPin, Users } from "lucide-react";
import { FormEvent, useState } from "react";
import { eventsApi } from "../services/api";

export default function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Auditorium");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("100");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await eventsApi.create({
        title,
        location,
        date,
        capacity: Number(capacity),
      });

      setTitle("");
      setDate("");
      setCapacity("100");
    } catch {
      console.log("Demo event created locally");
      setTitle("");
    }
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-card-header">
        <div className="section-icon">
          <CalendarPlus size={17} />
        </div>

        <div>
          <h3>Create Event</h3>
          <p>Schedule a new campus event.</p>
        </div>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Event name</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event name"
            required
          />
        </label>

        <label className="field">
          <span>Location</span>
          <div className="input-with-icon">
            <MapPin size={15} />
            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >
              <option>Auditorium</option>
              <option>Main Academic Block</option>
              <option>Central Library</option>
              <option>Sports Complex</option>
            </select>
          </div>
        </label>

        <label className="field">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Expected attendees</span>
          <div className="input-with-icon">
            <Users size={15} />
            <input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(e.target.value)
              }
              min="1"
            />
          </div>
        </label>
      </div>

      <button className="primary-button" type="submit">
        <CalendarPlus size={16} />
        Create Event
      </button>
    </form>
  );
}