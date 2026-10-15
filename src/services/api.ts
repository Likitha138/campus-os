const API_BASE_URL = "http://localhost:5000/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  return response.json();
}

export const getDashboard = () =>
  apiRequest("/dashboard");

export const getEvents = () =>
  apiRequest("/events");

export const getBuildings = () =>
  apiRequest("/buildings");

export const getRooms = () =>
  apiRequest("/rooms");

export const getTraffic = () =>
  apiRequest("/traffic");

export const getActivities = () =>
  apiRequest("/activities");

export const getAlerts = () =>
  apiRequest("/alerts");

export const getBookings = () =>
  apiRequest("/bookings");