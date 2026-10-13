
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
      message = errorData.message || message;
    } catch {
      // Keep the default error message if the response isn't JSON.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
