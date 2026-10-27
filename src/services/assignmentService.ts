import { api } from "./api";

export type AssignmentStatus = "pending" | "submitted" | "overdue";

export interface Assignment {
  id: number;
  user_id: number;
  student_name?: string;
  email?: string;
  student_code?: string;
  subject: string;
  title: string;
  description?: string | null;
  due_date: string;
  status: AssignmentStatus;
  submitted_at?: string | null;
  created_at?: string;
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

export interface CreateAssignmentPayload {
  user_id: number;
  subject: string;
  title: string;
  description?: string;
  due_date: string;
  status?: AssignmentStatus;
}

export interface UpdateAssignmentPayload {
  subject: string;
  title: string;
  description?: string;
  due_date: string;
  status: AssignmentStatus;
}

// Get all assignments (admin)
export async function getAssignments(): Promise<Assignment[]> {
  const response = await api.get<ApiResponse<Assignment[]>>("/assignments");
  return response.data ?? [];
}

// Get assignments belonging to a specific student
export async function getAssignmentsByUser(
  userId: string
): Promise<Assignment[]> {
  const response = await api.get<ApiResponse<Assignment[]>>(
    `/assignments/user/${encodeURIComponent(userId)}`
  );

  return response.data ?? [];
}

// Create an assignment
export async function createAssignment(
  payload: CreateAssignmentPayload
): Promise<void> {
  await api.post("/assignments", payload);
}

// Update an assignment
export async function updateAssignment(
  id: number,
  payload: UpdateAssignmentPayload
): Promise<void> {
  await api.put(`/assignments/${id}`, payload);
}

// Submit an assignment
export async function submitAssignment(id: number): Promise<void> {
  await api.patch(`/assignments/${id}/submit`, {});
}

// Delete an assignment
export async function deleteAssignment(id: number): Promise<void> {
  await api.delete(`/assignments/${id}`);
}