import { useState } from "react";
import { CalendarDays, Clock, MapPin, Send } from "lucide-react";
import { createEvent } from "../services/eventNotificationService";

export default function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !date) return;

    createEvent({
      title,
      location,
      date,
      description: message,
    });

    setTitle("");
    setLocation("");
    setDate("");
    setMessage("");

    alert("Event created and student notification generated.");
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-card-heading">
        <div>
          <span className="eyebrow">ADMIN CONTROL</span>
          <h3>Create campus event</h3>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Event name
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Orientation Programme"
          />
        </label>

        <label>
          Location
          <div className="input-icon">
            <MapPin size={16} />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Main Auditorium"
            />
          </div>
        </label>

        <label>
          Date & time
          <div className="input-icon">
            <CalendarDays size={16} />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </label>

        <label>
          Duration
          <div className="input-icon">
            <Clock size={16} />
            <input placeholder="2 hours" />
          </div>
        </label>
      </div>

      <label>
        Description
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter event details..."
          rows={4}
        />
      </label>

      <button className="primary-button" type="submit">
        <Send size={16} />
        Create & Notify Students
      </button>
    </form>
  );
}