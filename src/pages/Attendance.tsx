import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  RefreshCw,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../auth/AuthContext";
import {
  getAttendanceByUser,
  getAttendanceSummary,
  type AttendanceRecord,
  type AttendanceSummary,
} from "../services/attendanceService";

function formatDate(value: string) {
  if (!value) return "—";

  const dateOnly = value.match(/^\d{4}-\d{2}-\d{2}$/);

  if (dateOnly) {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPercentage(value: number) {
  return `${Number(value || 0).toFixed(1)}%`;
}

function getStatusClass(status: string) {
  return status.toLowerCase();
}

export default function Attendance() {
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAttendance = useCallback(async () => {
    if (!user?.id) {
      setRecords([]);
      setSummary(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [attendanceRecords, attendanceSummary] = await Promise.all([
        getAttendanceByUser(user.id),
        getAttendanceSummary(user.id),
      ]);

      setRecords(attendanceRecords);
      setSummary(attendanceSummary);
    } catch (err) {
      console.error("Failed to load attendance:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load attendance data."
      );
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!authLoading) {
      void loadAttendance();
    }
  }, [authLoading, loadAttendance]);

  const subjectAttendance = useMemo(() => {
    const subjectMap = new Map<
      string,
      {
        total: number;
        present: number;
        absent: number;
        late: number;
      }
    >();

    for (const record of records) {
      const subject = record.subject || "Other";

      const current = subjectMap.get(subject) ?? {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
      };

      current.total += 1;

      if (record.status === "present") current.present += 1;
      if (record.status === "absent") current.absent += 1;
      if (record.status === "late") current.late += 1;

      subjectMap.set(subject, current);
    }

    return Array.from(subjectMap.entries())
      .map(([subject, values]) => ({
        subject,
        ...values,
        percentage:
          values.total > 0
            ? (values.present / values.total) * 100
            : 0,
      }))
      .sort((a, b) => a.subject.localeCompare(b.subject));
  }, [records]);

  if (authLoading || loading) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="STUDENT SERVICES"
          title="Attendance"
          description="View your academic attendance and subject-wise presence."
        />

        <div className="notification-empty" role="status">
          <LoaderCircle size={24} className="animate-spin" />
          <p>Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="STUDENT SERVICES"
          title="Attendance"
          description="Log in to view your attendance records."
        />

        <div className="notification-empty">
          <AlertCircle size={24} />
          <p>Please log in to view attendance data.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="STUDENT SERVICES"
          title="Attendance"
          description="View your academic attendance and subject-wise presence."
        />

        <div className="notification-empty" role="alert">
          <AlertCircle size={24} />
          <p>{error}</p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => void loadAttendance()}
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalClasses = summary?.total_classes ?? records.length;

  const presentClasses =
    summary?.present_classes ??
    records.filter((record) => record.status === "present").length;

  const absentClasses =
    summary?.absent_classes ??
    records.filter((record) => record.status === "absent").length;

  const lateClasses =
    summary?.late_classes ??
    records.filter((record) => record.status === "late").length;

  const percentage = Number(summary?.attendance_percentage ?? 0);

  const attendanceStatus =
    summary?.status ??
    (percentage >= 75
      ? "Good"
      : percentage >= 60
        ? "Warning"
        : "Critical");

  return (
    <div className="page">
      <PageHeader
        eyebrow="STUDENT SERVICES"
        title="Attendance"
        description="View your academic attendance and subject-wise presence."
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 18,
        }}
      >
        <button
          type="button"
          className="secondary-button"
          onClick={() => void loadAttendance()}
          disabled={loading}
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Overall Attendance"
          value={String(Number(percentage.toFixed(1)))}
          suffix="%"
          icon="activity"
        />

        <StatCard
          label="Classes Attended"
          value={String(presentClasses)}
          icon="chart"
        />

        <StatCard
          label="Classes Missed"
          value={String(absentClasses)}
          icon="activity"
        />

        <StatCard
          label="Attendance Status"
          value={attendanceStatus}
          icon="users"
        />
      </div>

      <div className="data-card large">
        <div className="card-heading">
          <div>
            <strong>Subject attendance</strong>
            <small>
              Calculated from your saved attendance records
            </small>
          </div>
        </div>

        {subjectAttendance.length === 0 ? (
          <div className="notification-empty">
            <CalendarCheck size={24} />
            <p>No subject attendance records have been added yet.</p>
          </div>
        ) : (
          subjectAttendance.map((subject) => (
            <div className="progress-row" key={subject.subject}>
              <div>
                <span>{subject.subject}</span>
                <strong>{formatPercentage(subject.percentage)}</strong>
              </div>

              <div className="progress-track">
                <div
                  style={{
                    width: `${Math.min(subject.percentage, 100)}%`,
                  }}
                />
              </div>

              <small>
                {subject.present} present · {subject.absent} absent
                {subject.late > 0 ? ` · ${subject.late} late` : ""}
              </small>
            </div>
          ))
        )}
      </div>

      <div className="attendance-events">
        <div className="data-card">
          <CheckCircle2 size={20} />
          <strong>{totalClasses} recorded classes</strong>
          <span>{presentClasses} marked present</span>
        </div>

        <div className="data-card">
          <CalendarCheck size={20} />
          <strong>{formatPercentage(percentage)}</strong>
          <span>Overall attendance percentage</span>
        </div>

        <div className="data-card">
          <Clock3 size={20} />
          <strong>{lateClasses} late arrivals</strong>
          <span>{records.length} attendance records loaded</span>
        </div>
      </div>

      <div className="data-card large" style={{ marginTop: 24 }}>
        <div className="card-heading">
          <div>
            <strong>Attendance history</strong>
            <small>Most recent records first</small>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="notification-empty">
            <CalendarCheck size={24} />
            <p>
              No attendance records are available for your account yet.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 12 }}>
                    Date
                  </th>
                  <th style={{ textAlign: "left", padding: 12 }}>
                    Subject
                  </th>
                  <th style={{ textAlign: "left", padding: 12 }}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {[...records]
                  .sort(
                    (a, b) =>
                      new Date(b.attendance_date).getTime() -
                      new Date(a.attendance_date).getTime()
                  )
                  .map((record) => (
                    <tr key={record.id}>
                      <td style={{ padding: 12 }}>
                        {formatDate(record.attendance_date)}
                      </td>

                      <td style={{ padding: 12 }}>
                        {record.subject}
                      </td>

                      <td style={{ padding: 12 }}>
                        <span
                          className={`status-pill ${getStatusClass(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}