import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Send,
  Tag,
  LoaderCircle,
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
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState("2 hours");
  const [category, setCategory] = useState("Campus");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  function resetForm() {
    setTitle("");
    setLocation("");
    setDate("");
    setTime("10:00");
    setDuration("2 hours");
    setCategory("Campus");
    setDescription("");
  }

  function convertDateToISO(value: string): string | null {
    const match = value.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (!match) return null;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const parsed = new Date(year, month - 1, day);

    // Reject impossible dates, such as 31-02-2026.
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null;
    }

    return `${match[3]}-${match[2]}-${match[1]}`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setError("");
    setSuccess("");

    if (!title.trim() || !location.trim() || !date.trim() || !time) {
      setError("Please enter the event name, location, date, and time.");
      return;
    }

    const isoDate = convertDateToISO(date);

    if (!isoDate) {
      setError("Enter a valid date in DD-MM-YYYY format, for example 28-10-2026.");
      return;
    }

    const [year, month, day] = isoDate.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const selectedDate = new Date(year, month - 1, day, hours, minutes);

    if (selectedDate.getTime() <= Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    // The service expects YYYY-MM-DDTHH:mm.
    const apiDate = `${isoDate}T${time}`;

    setSaving(true);

    try {
      await createEvent({
        title: title.trim(),
        location: location.trim(),
        date: apiDate,
        description: description.trim(),
        category,
        duration: duration.trim() || "2 hours",
      });

      resetForm();
      setSuccess("Event created successfully. The event list has been updated.");
      onCreated?.();
    } catch (err) {
      console.error("Failed to create campus event:", err);

      setError(
        err instanceof Error
          ? err.message
          : "The event could not be saved. Please try again."
      );
    } finally {
      setSaving(false);
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
            maxLength={200}
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
              maxLength={200}
              required
            />
          </div>
        </label>

        <label>
          Date (DD-MM-YYYY) *
          <div className="input-icon">
            <CalendarDays size={16} />
            <input
              type="text"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="28-10-2026"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              pattern="(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{4}"
              title="Enter the date as DD-MM-YYYY, for example 28-10-2026"
              required
            />
          </div>
        </label>

        <label>
          Event time *
          <div className="input-icon">
            <Clock size={16} />
            <input
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
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
        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {saving ? "Creating event..." : "Create & Notify Students"}
        </button>

        {onCancel && (
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
            disabled={saving}
          >
            Close
          </button>
        )}
      </div>
    </form>
  );
}