import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Send,
  Tag,
} from "lucide-react";
import { createEvent } from "../services/eventNotificationService";

interface CreateEventFormProps {
  onCreated?: () => void;
  onCancel?: () => void;
}

export default function CreateEventForm({
  onCreated,
  onCancel,
}: CreateEventFormProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("2 hours");
  const [category, setCategory] = useState("Campus");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim() || !location.trim() || !date) {
      setError("Please enter the event name, location, and date.");
      return;
    }

    const selectedDate = new Date(date);

    if (Number.isNaN(selectedDate.getTime())) {
      setError("Please enter a valid date and time.");
      return;
    }

    if (selectedDate.getTime() < Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    try {
      createEvent({
        title: title.trim(),
        location: location.trim(),
        date,
        description: description.trim(),
        category,
        duration: duration.trim() || "Not specified",
      });

      setTitle("");
      setLocation("");
      setDate("");
      setDuration("2 hours");
      setCategory("Campus");
      setDescription("");

      setSuccess(
        "Event created successfully and notification generated."
      );

      onCreated?.();
    } catch {
      setError("The event could not be saved. Please try again.");
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-card-heading">
        <div>
          <span className="eyebrow">ADMIN CONTROL</span>
          <h3>Create campus event</h3>
          <p>
            Add an event to the campus calendar and generate a notification.
          </p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Event name *
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Orientation Programme"
            maxLength={120}
            required
          />
        </label>

        <label>
          Location *
          <div className="input-icon">
            <MapPin size={16} />
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Main Auditorium"
              maxLength={120}
              required
            />
          </div>
        </label>

        <label>
          Date & time *
          <div className="input-icon">
            <CalendarDays size={16} />
            <input
              type="datetime-local"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>
        </label>

        <label>
          Duration
          <div className="input-icon">
            <Clock size={16} />
            <input
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="2 hours"
              maxLength={50}
            />
          </div>
        </label>

        <label>
          Category
          <div className="input-icon">
            <Tag size={16} />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Campus">Campus</option>
              <option value="Career">Career</option>
              <option value="Competition">Competition</option>
              <option value="Academic">Academic</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Safety">Safety</option>
            </select>
          </div>
        </label>
      </div>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter event details..."
          rows={4}
          maxLength={1000}
        />
      </label>

      {error && (
        <p className="form-feedback error" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="form-feedback success" role="status">
          {success}
        </p>
      )}

      <div className="form-actions">
        <button className="primary-button" type="submit">
          <Send size={16} />
          Create & Notify Students
        </button>

        {onCancel && (
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
          >
            Close
          </button>
        )}
      </div>
    </form>
  );
}