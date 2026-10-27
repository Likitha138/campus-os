import { api } from "./api";

export interface AttendanceRecord {
  id: number;
  user_id: number;
  student_name?: string;
  email?: string;
  student_code?: string;
  subject: string;
  attendance_date: string;
  status: "present" | "absent" | "late";
  created_at?: string;
}

export interface AttendanceSummary {
  user_id: number;
  total_classes: number;
  present_classes: number;
  absent_classes: number;
  late_classes: number;
  attendance_percentage: number;
  status: "Good" | "Warning" | "Critical";
}

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}

export async function getAttendanceByUser(
  userId: string
): Promise<AttendanceRecord[]> {
  const response = await api.get<ApiResponse<AttendanceRecord[]>>(
    `/attendance/user/${encodeURIComponent(userId)}`
  );

  return response.data ?? [];
}

export async function getAttendanceSummary(
  userId: string
): Promise<AttendanceSummary> {
  const response = await api.get<ApiResponse<AttendanceSummary>>(
    `/attendance/summary/${encodeURIComponent(userId)}`
  );

  return response.data;
}

export async function getAllAttendance(): Promise<AttendanceRecord[]> {
  const response = await api.get<ApiResponse<AttendanceRecord[]>>(
    "/attendance"
  );

  return response.data ?? [];
}