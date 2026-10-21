const STORAGE_KEY = "campus_os_notifications";

export interface CampusNotification {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

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

export function getNotifications(): CampusNotification[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialNotifications)
    );

    return initialNotifications;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return initialNotifications;
  }
}

export function createEvent(event: {
  title: string;
  location: string;
  date: string;
  description: string;
}) {
  const notification: CampusNotification = {
    id: `N-${Date.now()}`,
    title: event.title,
    description:
      event.description || `New campus event: ${event.title}`,
    location: event.location,
    date: event.date,
    status: "New",
  };

  const current = getNotifications();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([notification, ...current])
  );

  return notification;
}

export function clearNotifications() {
  localStorage.removeItem(STORAGE_KEY);
}