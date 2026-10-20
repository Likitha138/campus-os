import { eventsApi } from "./api";

export type EventNotification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  createdAt: string;
};

export async function getEventNotifications(): Promise<
  EventNotification[]
> {
  try {
    const response: any = await eventsApi.list();

    if (Array.isArray(response)) {
      return response.map((event: any) => ({
        id: String(
          event.id ?? event.event_id ?? crypto.randomUUID()
        ),
        title:
          event.title ??
          event.name ??
          "Campus Event",
        message:
          event.message ??
          `Event scheduled at ${
            event.location ?? "campus"
          }.`,
        type: "info",
        createdAt:
          event.createdAt ??
          event.created_at ??
          new Date().toISOString(),
      }));
    }
  } catch {
    // Demo fallback intentionally used when backend
    // is unavailable during frontend development.
  }

  return [
    {
      id: "notification-1",
      title: "Annual Tech Fest",
      message:
        "Venue preparation is scheduled to begin tomorrow.",
      type: "success",
      createdAt: new Date().toISOString(),
    },
    {
      id: "notification-2",
      title: "Placement Drive",
      message:
        "Registration is approaching venue capacity.",
      type: "warning",
      createdAt: new Date().toISOString(),
    },
  ];
}

export function subscribeToEventNotifications(
  callback: (
    notification: EventNotification
  ) => void
) {
  const timer = window.setInterval(async () => {
    const notifications =
      await getEventNotifications();

    if (notifications.length > 0) {
      callback(notifications[0]);
    }
  }, 30000);

  return () => {
    window.clearInterval(timer);
  };
}