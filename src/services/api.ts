// =========================================================
// CAMPUS OS - API SERVICE
// Express + MySQL backend
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------

export interface ApiError {
  message: string;
  status?: number;
}

export interface Building {
  id?: number | string;
  name: string;
  type?: string;
  location?: string;
  occupancy?: number;
  status?: string;
}

export interface TrafficRecord {
  id?: number | string;
  zone?: string;
  road?: string;
  level?: string;
  density?: number;
  vehicles?: number;
  speed?: number;
  status?: string;
}

export interface CampusEvent {
  id?: number | string;
  title?: string;
  name?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  status?: string;
}

export interface ActivityRecord {
  id?: number | string;
  label?: string;
  time?: string;
  value?: number;
  activity?: number;
  occupancy?: number;
}

export interface AlertRecord {
  id?: number | string;
  title?: string;
  message?: string;
  description?: string;
  severity?: string;
  status?: string;
  createdAt?: string;
}

export interface DashboardData {
  buildings?: Building[];
  traffic?: TrafficRecord[];
  events?: CampusEvent[];
  activities?: ActivityRecord[];
  alerts?: AlertRecord[];

  students?: number;
  occupancy?: number;
  vehicles?: number;
  energy?: number;
  aqi?: number;
}

// ---------------------------------------------------------
// Generic request helper
// ---------------------------------------------------------

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";

  let data: unknown;

  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    if (typeof data === "object" && data !== null) {
      const errorData = data as {
        message?: string;
        error?: string;
      };

      message =
        errorData.message ||
        errorData.error ||
        message;
    }

    throw new Error(message);
  }

  return data as T;
}

// ---------------------------------------------------------
// Health
// ---------------------------------------------------------

export async function getHealth() {
  return apiRequest<unknown>("/health");
}

// ---------------------------------------------------------
// Dashboard
// ---------------------------------------------------------

export async function getDashboard() {
  return apiRequest<unknown>("/dashboard");
}

// ---------------------------------------------------------
// Users
// ---------------------------------------------------------

export async function getUsers() {
  return apiRequest<unknown>("/users");
}

// ---------------------------------------------------------
// Attendance
// ---------------------------------------------------------

export async function getAttendance() {
  return apiRequest<unknown>("/attendance");
}

// ---------------------------------------------------------
// Marks
// ---------------------------------------------------------

export async function getMarks() {
  return apiRequest<unknown>("/marks");
}

// ---------------------------------------------------------
// Assignments
// ---------------------------------------------------------

export async function getAssignments() {
  return apiRequest<unknown>("/assignments");
}

// ---------------------------------------------------------
// Buildings
// ---------------------------------------------------------

export async function getBuildings(): Promise<unknown> {
  return apiRequest<unknown>("/buildings");
}

// ---------------------------------------------------------
// Rooms
// ---------------------------------------------------------

export async function getRooms() {
  return apiRequest<unknown>("/rooms");
}

// ---------------------------------------------------------
// Traffic
// ---------------------------------------------------------

export async function getTraffic(): Promise<unknown> {
  return apiRequest<unknown>("/traffic");
}

// ---------------------------------------------------------
// Activities
// ---------------------------------------------------------

export async function getActivities(): Promise<unknown> {
  return apiRequest<unknown>("/activities");
}

// ---------------------------------------------------------
// Events
// ---------------------------------------------------------

export async function getEvents(): Promise<unknown> {
  return apiRequest<unknown>("/events");
}

// ---------------------------------------------------------
// Alerts
// ---------------------------------------------------------

export async function getAlerts(): Promise<unknown> {
  return apiRequest<unknown>("/alerts");
}

// ---------------------------------------------------------
// Bookings
// ---------------------------------------------------------

export async function getBookings() {
  return apiRequest<unknown>("/bookings");
}

// ---------------------------------------------------------
// Authentication
// ---------------------------------------------------------

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  return apiRequest<unknown>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------
// POST helper
// ---------------------------------------------------------

export async function postData<T>(
  endpoint: string,
  payload: unknown,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------
// PUT helper
// ---------------------------------------------------------

export async function putData<T>(
  endpoint: string,
  payload: unknown,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------
// DELETE helper
// ---------------------------------------------------------

export async function deleteData<T>(
  endpoint: string,
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
  });
}

// ---------------------------------------------------------
// Export base URL
// ---------------------------------------------------------

export { API_BASE_URL };