const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

type RequestOptions = RequestInit & {
  body?: any;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body:
      options.body !== undefined &&
      typeof options.body !== "string"
        ? JSON.stringify(options.body)
        : options.body,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return (await response.text()) as T;
}

export const api = {
  get: <T = any>(endpoint: string) =>
    request<T>(endpoint),

  post: <T = any>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: "POST",
      body,
    }),

  put: <T = any>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: "PUT",
      body,
    }),

  delete: <T = any>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};

export const healthApi = () =>
  api.get("/health");

export const dashboardApi = () =>
  api.get("/dashboard");

export const usersApi = {
  list: () => api.get("/users"),
  get: (id: string | number) => api.get(`/users/${id}`),
  create: (data: any) => api.post("/users", data),
  update: (id: string | number, data: any) =>
    api.put(`/users/${id}`, data),
  remove: (id: string | number) =>
    api.delete(`/users/${id}`),
};

export const attendanceApi = {
  list: () => api.get("/attendance"),
  create: (data: any) => api.post("/attendance", data),
  update: (id: string | number, data: any) =>
    api.put(`/attendance/${id}`, data),
};

export const marksApi = {
  list: () => api.get("/marks"),
  create: (data: any) => api.post("/marks", data),
  update: (id: string | number, data: any) =>
    api.put(`/marks/${id}`, data),
};

export const assignmentsApi = {
  list: () => api.get("/assignments"),
  create: (data: any) => api.post("/assignments", data),
  update: (id: string | number, data: any) =>
    api.put(`/assignments/${id}`, data),
  remove: (id: string | number) =>
    api.delete(`/assignments/${id}`),
};

export const eventsApi = {
  list: () => api.get("/events"),
  create: (data: any) => api.post("/events", data),
  update: (id: string | number, data: any) =>
    api.put(`/events/${id}`, data),
  remove: (id: string | number) =>
    api.delete(`/events/${id}`),
};

export const buildingsApi = {
  list: () => api.get("/buildings"),
  get: (id: string | number) =>
    api.get(`/buildings/${id}`),
};

export const roomsApi = {
  list: () => api.get("/rooms"),
  get: (id: string | number) =>
    api.get(`/rooms/${id}`),
};

export const trafficApi = {
  list: () => api.get("/traffic"),
  create: (data: any) => api.post("/traffic", data),
};

export const activitiesApi = {
  list: () => api.get("/activities"),
};

export const alertsApi = {
  list: () => api.get("/alerts"),
  create: (data: any) => api.post("/alerts", data),
  update: (id: string | number, data: any) =>
    api.put(`/alerts/${id}`, data),
};

export const bookingsApi = {
  list: () => api.get("/bookings"),
  create: (data: any) => api.post("/bookings", data),
  remove: (id: string | number) =>
    api.delete(`/bookings/${id}`),
};

export default api;