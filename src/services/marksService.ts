import { api } from "./api";

export interface MarkRecord {
  id: number;
  user_id: number;
  student_name?: string;
  email?: string;
  student_code?: string;
  subject: string;
  exam_type: string;
  marks_obtained: number;
  total_marks: number;
  grade: string;
  percentage: number;
  created_at?: string;
}

export interface MarksSummary {
  user_id: number;
  total_exams: number;
  total_obtained: number;
  total_possible: number;
  overall_percentage: number;
  grade: string;
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

export interface CreateMarkPayload {
  user_id: number;
  subject: string;
  exam_type: string;
  marks_obtained: number;
  total_marks: number;
}

export interface UpdateMarkPayload {
  subject: string;
  exam_type: string;
  marks_obtained: number;
  total_marks: number;
}

export async function getMarksByUser(
  userId: string
): Promise<MarkRecord[]> {
  const response = await api.get<ApiResponse<MarkRecord[]>>(
    `/marks/user/${encodeURIComponent(userId)}`
  );

  return response.data ?? [];
}

export async function getMarksSummary(
  userId: string
): Promise<MarksSummary> {
  const response = await api.get<ApiResponse<MarksSummary>>(
    `/marks/summary/${encodeURIComponent(userId)}`
  );

  return response.data;
}

export async function getAllMarks(): Promise<MarkRecord[]> {
  const response = await api.get<ApiResponse<MarkRecord[]>>(
    "/marks"
  );

  return response.data ?? [];
}

export async function createMark(
  payload: CreateMarkPayload
): Promise<void> {
  await api.post("/marks", payload);
}

export async function updateMark(
  id: number,
  payload: UpdateMarkPayload
): Promise<void> {
  await api.put(`/marks/${id}`, payload);
}

export async function deleteMark(id: number): Promise<void> {
  await api.delete(`/marks/${id}`);
}