import { api } from "./api";

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  description: string;
  duration: string;
  createdAt?: string;
}

export interface CampusNotification {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

interface BackendEvent {
  id: number | string;
  title: string;
  description?: string | null;
  event_date: string;
  start_time?: string | null;
  end_time?: string | null;
  location?: string | null;
  event_type?: string | null;
  status?: string | null;
  created_at?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

function formatDate(value: string): string {
  if (!value) return "";

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    const [, year, month, day] = match;
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value?: string | null): string {
  if (!value) return "";

  const match = value.match(/^(\d{1,2}):(\d{2})/);

  if (!match) return value;

  let hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${suffix}`;
}

function normalizeEvent(event: BackendEvent): CampusEvent {
  const startTime = formatTime(event.start_time);
  const endTime = formatTime(event.end_time);

  return {
    id: String(event.id),
    title: event.title,
    date: formatDate(event.event_date),
    time: startTime,
    location: event.location || "Location to be announced",
    category: event.event_type || "Campus",
    status: event.status || "upcoming",
    description: event.description || "",
    duration:
      startTime && endTime
        ? `${startTime} - ${endTime}`
        : "Not specified",
    createdAt: event.created_at,
  };
}

/**
 * Load events from the backend.
 * GET /api/events
 */
export async function getEvents(): Promise<CampusEvent[]> {
  const response = await api.get<ApiResponse<BackendEvent[]>>("/events");

  if (response.success === false) {
    throw new Error(response.message || "Failed to load events.");
  }

  return (response.data || []).map(normalizeEvent);
}

/**
 * Create an event in MySQL through the backend.
 * POST /api/events
 */
export async function createEvent(input: {
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  duration: string;
}): Promise<CampusEvent> {
  const rawDate = input.date?.trim();

  if (!rawDate) {
    throw new Error(
      "Date is empty. Please select the event date and time again."
    );
  }

  // datetime-local format: YYYY-MM-DDTHH:mm
  const match = rawDate.match(
    /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/
  );

  if (!match) {
    throw new Error(
      "Invalid date format. Please select the date using the calendar field."
    );
  }

  const eventDate = match[1];
  const hours = Number(match[2]);
  const minutes = Number(match[3]);

  const startMinutes = hours * 60 + minutes;

  const durationMatch = (input.duration || "").match(
    /(\d+(?:\.\d+)?)/
  );

  const durationValue = durationMatch
    ? Number(durationMatch[1])
    : 2;

  const durationMinutes = (input.duration || "")
    .toLowerCase()
    .includes("min")
    ? durationValue
    : durationValue * 60;

  const endMinutes = startMinutes + durationMinutes;
  const endHours = Math.floor(endMinutes / 60) % 24;
  const endMins = Math.floor(endMinutes % 60);

  const startTime =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

  const endTime =
    `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}:00`;

 const payload = {
  title: input.title.trim(),
  description: input.description.trim(),
  date: eventDate,
  startTime,
  endTime,
  location: input.location.trim(),
  eventType: input.category,
};

  // Diagnostic: verify the exact payload sent to the backend.
  console.log("Creating campus event payload:", payload);

  const response = await api.post<
    ApiResponse<BackendEvent> & { event?: BackendEvent }
  >("/events", payload);

  const created = response.data || response.event;

  if (!response.success || !created) {
    throw new Error(
      response.message || "The event could not be saved."
    );
  }

  window.dispatchEvent(new Event("campus-os-events-updated"));

  return normalizeEvent(created);
}

/**
 * Generate notification entries from events.
 */
export async function getNotifications(): Promise<CampusNotification[]> {
  const events = await getEvents();

  return events.map((event) => ({
    id: `event-${event.id}`,
    title: event.title,
    description: event.description || "A campus event is scheduled.",
    location: event.location,
    date: event.date,
    status: event.status,
  }));
}

export async function clearNotifications(): Promise<void> {
  localStorage.setItem(
    "campus_os_notifications_dismissed",
    JSON.stringify([])
  );
}