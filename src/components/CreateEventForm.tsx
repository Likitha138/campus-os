// =========================================================
// CAMPUS OS — CREATE EVENT FORM
// =========================================================

import {
  useState,
  type FormEvent,
} from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Send,
  Users,
} from "lucide-react";

import type {
  CampusEvent,
  EventCategory,
} from "../data/events";

type Props = {
  onCreate?: (
    event: CampusEvent
  ) => void;
};

const departments = [
  "BCA",
  "MCA",
  "BBA",
  "B.Com",
];

const years = [1, 2, 3];

const interests = [
  "Artificial Intelligence",
  "AI",
  "Machine Learning",
  "Web Development",
  "Data Science",
  "Cyber Security",
  "Cloud Computing",
];

export default function CreateEventForm({
  onCreate,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState<EventCategory>(
      "Workshop"
    );

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [venue, setVenue] =
    useState("");

  const [department, setDepartment] =
    useState("BCA");

  const [year, setYear] =
    useState(3);

  const [interest, setInterest] =
    useState("");

  const [created, setCreated] =
    useState(false);

  const handleSubmit = (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !date ||
      !time ||
      !venue
    ) {
      return;
    }

    const newEvent: CampusEvent = {
      id: `EVT-${Date.now()}`,

      title,

      description,

      category,

      date,

      time,

      venue,

      organizer:
        "Campus OS Administration",

      target: {
        departments: [
          department,
        ],

        years: [year],

        interests: interest
          ? [interest]
          : undefined,
      },

      createdAt:
        new Date().toISOString(),

      status: "upcoming",
    };

    onCreate?.(newEvent);

    setCreated(true);

    setTitle("");

    setDescription("");

    setDate("");

    setTime("");

    setVenue("");

    setInterest("");

    setTimeout(
      () => setCreated(false),
      3000
    );
  };

  return (
    <form
      className="create-event-form"
      onSubmit={handleSubmit}
    >
      {/* HEADER */}

      <div className="create-event-header">
        <div>
          <span>
            EVENT MANAGEMENT
          </span>

          <h2>
            Create Campus Event
          </h2>

          <p>
            Create an event and Campus OS
            will automatically identify
            eligible students.
          </p>
        </div>

        <div className="create-event-symbol">
          <CalendarDays size={22} />
        </div>
      </div>

      {/* BASIC DETAILS */}

      <div className="event-form-grid">
        <div className="event-form-group full">
          <label>
            Event Name
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Example: AI & Machine Learning Workshop"
          />
        </div>

        <div className="event-form-group full">
          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Describe the event..."
          />
        </div>

        <div className="event-form-group">
          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target
                  .value as EventCategory
              )
            }
          >
            <option>
              Workshop
            </option>

            <option>
              Seminar
            </option>

            <option>
              Competition
            </option>

            <option>
              Hackathon
            </option>

            <option>
              Placement
            </option>

            <option>
              Cultural
            </option>

            <option>
              Sports
            </option>
          </select>
        </div>

        <div className="event-form-group">
          <label>
            Venue
          </label>

          <div className="event-input-icon">
            <MapPin size={14} />

            <input
              value={venue}
              onChange={(e) =>
                setVenue(
                  e.target.value
                )
              }
              placeholder="Seminar Hall"
            />
          </div>
        </div>

        <div className="event-form-group">
          <label>
            Date
          </label>

          <div className="event-input-icon">
            <CalendarDays size={14} />

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="event-form-group">
          <label>
            Time
          </label>

          <div className="event-input-icon">
            <Clock3 size={14} />

            <input
              value={time}
              onChange={(e) =>
                setTime(
                  e.target.value
                )
              }
              placeholder="10:00 AM - 1:00 PM"
            />
          </div>
        </div>
      </div>

      {/* STUDENT TARGETING */}

      <div className="student-targeting">
        <div className="targeting-header">
          <div className="targeting-icon">
            <Users size={16} />
          </div>

          <div>
            <strong>
              Student Identification
            </strong>

            <span>
              Define who should receive
              this event notification.
            </span>
          </div>
        </div>

        <div className="event-form-grid">
          {/* DEPARTMENT */}

          <div className="event-form-group">
            <label>
              Department
            </label>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
            >
              {departments.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* YEAR */}

          <div className="event-form-group">
            <label>
              Year
            </label>

            <select
              value={year}
              onChange={(e) =>
                setYear(
                  Number(
                    e.target.value
                  )
                )
              }
            >
              {years.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                    {item === 1
                      ? "st"
                      : item === 2
                      ? "nd"
                      : "rd"}{" "}
                    Year
                  </option>
                )
              )}
            </select>
          </div>

          {/* INTEREST */}

          <div className="event-form-group full">
            <label>
              Relevant Interest
            </label>

            <select
              value={interest}
              onChange={(e) =>
                setInterest(
                  e.target.value
                )
              }
            >
              <option value="">
                No specific interest
              </option>

              {interests.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* SUBMIT */}

      <div className="create-event-footer">
        {created && (
          <div className="event-created-message">
            ✓ Event created and
            eligible students
            identified.
          </div>
        )}

        <button
          type="submit"
          className="create-event-button"
        >
          <Send size={14} />

          Create Event
        </button>
      </div>
    </form>
  );
}