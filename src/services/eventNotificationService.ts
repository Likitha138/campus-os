import { api } from "./api";

// ======================================================
// TYPES
// ======================================================

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  status: string;
  description: string;
  duration: string;
  createdAt?: string;
}

export type EventResponseChoice = "accepted" | "rejected";

export interface StudentEventResponse {
  response: EventResponseChoice;
  respondedAt?: string;
}

export interface EventParticipationSummary {
  eventId: string | number;
  eventTitle: string;
  totalStudents: number;
  accepted: number;
  rejected: number;
  pending: number;
}

export interface CampusNotification {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

interface BackendEvent {
  id: string | number;
  title: string;
  description?: string | null;

  date?: string;
  event_date?: string;

  time?: string;
  startTime?: string;
  start_time?: string;

  endTime?: string;
  end_time?: string;

  location?: string | null;

  category?: string | null;
  eventType?: string | null;
  event_type?: string | null;

  status?: string | null;
  createdAt?: string;
  created_at?: string;
}

interface BackendStudentResponse {
  response: EventResponseChoice;
  respondedAt?: string;
  responded_at?: string;
}

interface BackendParticipationSummary {
  eventId?: string | number;
  eventTitle?: string;
  totalStudents?: number;
  accepted?: number;
  rejected?: number;
  pending?: number;
}

// ======================================================
// RESPONSE HELPER
// ======================================================

function getResponseData<T>(
  response: ApiResponse<T>,
  fallbackMessage: string
): T {
  if (response.success === false) {
    throw new Error(response.message || fallbackMessage);
  }

  if (response.data === undefined) {
    throw new Error(response.message || fallbackMessage);
  }

  return response.data;
}

// ======================================================
// DATE AND TIME HELPERS
// ======================================================

function formatDate(value?: string): string {
  if (!value) return "";

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) return value;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatTime(value?: string): string {
  if (!value) return "";

  const match = value.trim().match(/^(\d{1,2}):(\d{2})/);

  if (!match) return value;

  let hours = Number(match[1]);

  const minutes = match[2];
  const suffix = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${suffix}`;
}

function getRawEventDate(event: BackendEvent): string {
  return event.date || event.event_date || "";
}

function getRawStartTime(event: BackendEvent): string {
  return event.startTime || event.start_time || "";
}

function getRawEndTime(event: BackendEvent): string {
  return event.endTime || event.end_time || "";
}

// ======================================================
// NORMALIZE BACKEND EVENT
// ======================================================

function normalizeEvent(event: BackendEvent): CampusEvent {
  const startTime = formatTime(getRawStartTime(event));
  const endTime = formatTime(getRawEndTime(event));

  let displayTime = "";

  if (event.time) {
    if (event.time.includes("-")) {
      displayTime = event.time
        .split("-")
        .map((part) => formatTime(part.trim()))
        .join(" - ");
    } else {
      displayTime = formatTime(event.time);
    }
  } else if (startTime && endTime) {
    displayTime = `${startTime} - ${endTime}`;
  } else {
    displayTime = startTime || endTime;
  }

  return {
    id: String(event.id),
    title: event.title || "Untitled event",
    date: formatDate(getRawEventDate(event)),
    time: displayTime,
    startTime,
    endTime,
    location: event.location || "Location to be announced",
    category:
      event.category ||
      event.eventType ||
      event.event_type ||
      "Campus",
    status: event.status || "upcoming",
    description: event.description || "",
    duration:
      startTime && endTime
        ? `${startTime} - ${endTime}`
        : "Not specified",
    createdAt: event.createdAt || event.created_at,
  };
}

// ======================================================
// GET ALL EVENTS
// GET /api/events
// ======================================================

export async function getEvents(): Promise<CampusEvent[]> {
  const response = await api.get<ApiResponse<BackendEvent[]>>(
    "/events"
  );

  const events = getResponseData(
    response,
    "Failed to load campus events."
  );

  if (!Array.isArray(events)) {
    throw new Error("The server returned an invalid events list.");
  }

  return events.map(normalizeEvent);
}

// ======================================================
// CREATE EVENT
// POST /api/events
// ADMIN ONLY
// ======================================================

export async function createEvent(input: {
  title: string;
  location: string;
  date: string;
  description: string;
  category: string;
  duration: string;
}): Promise<CampusEvent> {
  const dateValue = input.date.trim();

  const match = dateValue.match(
    /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})$/
  );

  if (!match) {
    throw new Error(
      "Invalid event date. Please select the date and time again."
    );
  }

  const eventDate = match[1];
  const hours = Number(match[2]);
  const minutes = Number(match[3]);

  const durationMatch = input.duration.match(
    /(\d+(?:\.\d+)?)/
  );

  const durationValue = durationMatch
    ? Number(durationMatch[1])
    : 2;

  const durationText = input.duration.toLowerCase();

  const durationMinutes = durationText.includes("min")
    ? durationValue
    : durationValue * 60;

  const startTotalMinutes = hours * 60 + minutes;
  const endTotalMinutes = startTotalMinutes + durationMinutes;

  const endHours = Math.floor(endTotalMinutes / 60) % 24;
  const endMinutes = Math.floor(endTotalMinutes % 60);

  const startTime =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:00`;

  const endTime =
    `${String(endHours).padStart(2, "0")}:` +
    `${String(endMinutes).padStart(2, "0")}:00`;

  const payload = {
    title: input.title.trim(),
    description: input.description.trim(),
    date: eventDate,
    startTime,
    endTime,
    location: input.location.trim(),
    eventType: input.category,
  };

  const response = await api.post<ApiResponse<BackendEvent>>(
    "/events",
    payload
  );

  const createdEvent = getResponseData(
    response,
    "The event could not be saved."
  );

  window.dispatchEvent(
    new Event("campus-os-events-updated")
  );

  return normalizeEvent(createdEvent);
}

// ======================================================
// GET STUDENT RESPONSE
// GET /api/events/:id/my-response
// ======================================================

export async function getMyEventResponse(
  eventId: string
): Promise<StudentEventResponse | null> {
  const response = await api.get<
    ApiResponse<BackendStudentResponse | null>
  >(
    `/events/${encodeURIComponent(eventId)}/my-response`
  );

  const result = getResponseData(
    response,
    "Unable to load your event response."
  );

  if (!result) return null;

  return {
    response: result.response,
    respondedAt: result.respondedAt || result.responded_at,
  };
}

// ======================================================
// STUDENT ACCEPT / REJECT
// POST /api/events/:id/respond
// ======================================================

export async function respondToEvent(
  eventId: string,
  choice: EventResponseChoice
): Promise<void> {
  const response = await api.post<
    ApiResponse<{
      eventId: string | number;
      response: EventResponseChoice;
    }>
  >(
    `/events/${encodeURIComponent(eventId)}/respond`,
    {
      response: choice,
    }
  );

  getResponseData(
    response,
    "Unable to save your participation response."
  );

  window.dispatchEvent(
    new Event("campus-os-events-updated")
  );
}

// ======================================================
// ADMIN PARTICIPATION SUMMARY
// GET /api/events/:id/summary
// ======================================================

export async function getEventParticipationSummary(
  eventId: string
): Promise<EventParticipationSummary> {
  const response = await api.get<
    ApiResponse<BackendParticipationSummary>
  >(
    `/events/${encodeURIComponent(eventId)}/summary`
  );

  const result = getResponseData(
    response,
    "Unable to load event participation."
  );

  return {
    eventId: result.eventId ?? eventId,
    eventTitle: result.eventTitle || "",
    totalStudents: Number(result.totalStudents ?? 0),
    accepted: Number(result.accepted ?? 0),
    rejected: Number(result.rejected ?? 0),
    pending: Number(result.pending ?? 0),
  };
}

// ======================================================
// DASHBOARD NOTIFICATIONS
// ======================================================

export async function getNotifications(): Promise<
  CampusNotification[]
> {
  const events = await getEvents();

  return events.map((event) => ({
    id: `event-${event.id}`,
    title: event.title,
    description:
      event.description || "A campus event is scheduled.",
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