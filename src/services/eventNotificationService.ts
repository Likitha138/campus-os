const STORAGE_KEY = "campus_os_notifications";
const EVENTS_STORAGE_KEY = "campus_os_events";

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

const initialEvents: CampusEvent[] = [
  {
    id: "EVT-001",
    title: "Placement Orientation",
    date: "21 Oct 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    category: "Career",
    status: "Upcoming",
    description: "Placement orientation has been scheduled for students.",
    duration: "2 hours",
  },
  {
    id: "EVT-002",
    title: "Inter College Hackathon",
    date: "24 Oct 2026",
    time: "09:00 AM",
    location: "Innovation Lab",
    category: "Competition",
    status: "Upcoming",
    description:
      "Participate in the inter-college hackathon and showcase your technical skills.",
    duration: "Full day",
  },
  {
    id: "EVT-003",
    title: "Campus Safety Drill",
    date: "27 Oct 2026",
    time: "02:00 PM",
    location: "Central Ground",
    category: "Safety",
    status: "Scheduled",
    description:
      "A campus safety drill will be conducted for students and staff.",
    duration: "1 hour",
  },
];

const initialNotifications: CampusNotification[] = [
  {
    id: "N-001",
    title: "Placement Orientation",
    description: "Placement orientation has been scheduled for students.",
    location: "Main Auditorium",
    date: "21 Oct 2026",
    status: "New",
  },
  {
    id: "N-002",
    title: "Campus Safety Drill",
    description: "A campus safety drill will be conducted this week.",
    location: "Central Ground",
    date: "27 Oct 2026",
    status: "New",
  },
];

function emitUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("campus-os-events-updated"));
  }
}

function formatEventDate(value: string): { date: string; time: string } {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return {
      date: value,
      time: "Time to be announced",
    };
  }

  return {
    date: parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: parsed.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

export function getEvents(): CampusEvent[] {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      EVENTS_STORAGE_KEY,
      JSON.stringify(initialEvents)
    );

    return [...initialEvents];
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as CampusEvent[])
      : [...initialEvents];
  } catch {
    return [...initialEvents];
  }
}

export function createEvent(event: {
  title: string;
  location: string;
  date: string;
  description: string;
  category?: string;
  duration?: string;
}): CampusEvent {
  const formatted = formatEventDate(event.date);

  const newEvent: CampusEvent = {
    id: `EVT-${Date.now()}`,
    title: event.title.trim(),
    date: formatted.date,
    time: formatted.time,
    location: event.location.trim(),
    category: event.category || "Campus",
    status: "Upcoming",
    description:
      event.description.trim() ||
      `New campus event: ${event.title.trim()}`,
    duration: event.duration || "Not specified",
    createdAt: new Date().toISOString(),
  };

  const currentEvents = getEvents();

  localStorage.setItem(
    EVENTS_STORAGE_KEY,
    JSON.stringify([newEvent, ...currentEvents])
  );

  const notification: CampusNotification = {
    id: `N-${Date.now()}`,
    title: newEvent.title,
    description: newEvent.description,
    location: newEvent.location,
    date: newEvent.date,
    status: "New",
  };

  const currentNotifications = getNotifications();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([notification, ...currentNotifications])
  );

  emitUpdate();

  return newEvent;
}

export function getNotifications(): CampusNotification[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialNotifications)
    );

    return [...initialNotifications];
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as CampusNotification[])
      : [...initialNotifications];
  } catch {
    return [...initialNotifications];
  }
}

export function clearNotifications(): void {
  localStorage.removeItem(STORAGE_KEY);
  emitUpdate();
}