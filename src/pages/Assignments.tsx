import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  LoaderCircle,
  RefreshCw,
  Search,
  Send,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { useAuth } from "../auth/AuthContext";
import {
  getAssignments,
  getAssignmentsByUser,
  submitAssignment,
  type Assignment,
} from "../services/assignmentService";

function formatDate(value: string): string {
  if (!value) return "No due date";

  const datePart = value.slice(0, 10);
  const date = new Date(`${datePart}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDisplayStatus(assignment: Assignment) {
  if (assignment.status === "submitted") {
    return "Submitted";
  }

  if (assignment.status === "overdue") {
    return "Overdue";
  }

  const dueDate = new Date(`${assignment.due_date.slice(0, 10)}T23:59:59`);

  if (
    assignment.due_date &&
    !Number.isNaN(dueDate.getTime()) &&
    dueDate.getTime() < Date.now()
  ) {
    return "Overdue";
  }

  return "Pending";
}

export default function Assignments() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAssignments = useCallback(async () => {
    if (!user) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const records = isAdmin
        ? await getAssignments()
        : await getAssignmentsByUser(String(user.id));

      setAssignments(records);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load assignments. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    void loadAssignments();
  }, [loadAssignments]);

  const filteredAssignments = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return assignments;

    return assignments.filter((assignment) =>
      [
        assignment.title,
        assignment.subject,
        assignment.description ?? "",
        assignment.student_name ?? "",
        assignment.student_code ?? "",
        getDisplayStatus(assignment),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [assignments, search]);

  const stats = useMemo(() => {
    const submitted = assignments.filter(
      (item) => item.status === "submitted"
    ).length;

    const overdue = assignments.filter(
      (item) => getDisplayStatus(item) === "Overdue"
    ).length;

    const pending = assignments.filter(
      (item) => getDisplayStatus(item) === "Pending"
    ).length;

    return {
      total: assignments.length,
      submitted,
      overdue,
      pending,
    };
  }, [assignments]);

  async function handleSubmit(assignment: Assignment) {
    if (isAdmin) return;

    const confirmed = window.confirm(
      `Mark "${assignment.title}" as submitted?`
    );

    if (!confirmed) return;

    setSubmittingId(assignment.id);
    setError("");
    setNotice("");

    try {
      await submitAssignment(assignment.id);
      setNotice(`"${assignment.title}" was submitted successfully.`);
      await loadAssignments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit this assignment."
      );
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <div className="page">
      <PageHeader
        eyebrow="ACADEMIC WORKSPACE"
        title="Assignments"
        description="Track upcoming, submitted and completed assignments."
      />

      <div className="stats-grid">
        <div className="data-card">
          <div className="card-heading">
            <div>
              <small>Total assignments</small>
              <h2>{stats.total}</h2>
            </div>
            <FileText size={22} />
          </div>
        </div>

        <div className="data-card">
          <div className="card-heading">
            <div>
              <small>Pending</small>
              <h2>{stats.pending}</h2>
            </div>
            <Clock size={22} />
          </div>
        </div>

        <div className="data-card">
          <div className="card-heading">
            <div>
              <small>Submitted</small>
              <h2>{stats.submitted}</h2>
            </div>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="data-card">
          <div className="card-heading">
            <div>
              <small>Overdue</small>
              <h2>{stats.overdue}</h2>
            </div>
            <AlertCircle size={22} />
          </div>
        </div>
      </div>

      <div
        className="events-toolbar"
        style={{ marginBottom: 20, marginTop: 24 }}
      >
        <div>
          <h3>{isAdmin ? "All assignments" : "My assignments"}</h3>
          <p>
            {filteredAssignments.length} assignment
            {filteredAssignments.length === 1 ? "" : "s"} found
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => void loadAssignments()}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div style={{ marginBottom: 20, position: "relative" }}>
        <Search
          size={17}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.6,
          }}
        />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search assignments, subjects or status..."
          aria-label="Search assignments"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px 12px 42px",
            borderRadius: 12,
            border: "1px solid var(--border, rgba(148,163,184,0.25))",
            background: "var(--card, rgba(15,23,42,0.55))",
            color: "inherit",
            outlineOffset: 2,
          }}
        />
      </div>

      {notice && (
        <div
          role="status"
          style={{
            padding: 14,
            marginBottom: 18,
            borderRadius: 10,
            background: "rgba(34,197,94,0.12)",
          }}
        >
          <CheckCircle2 size={17} style={{ verticalAlign: "middle" }} />{" "}
          {notice}
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            padding: 14,
            marginBottom: 18,
            borderRadius: 10,
            background: "rgba(239,68,68,0.12)",
          }}
        >
          <p style={{ marginTop: 0 }}>{error}</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => void loadAssignments()}
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="empty-state" role="status">
          <LoaderCircle size={30} />
          <h3>Loading assignments...</h3>
          <p>Fetching the latest assignment records.</p>
        </div>
      ) : filteredAssignments.length > 0 ? (
        <div className="assignment-grid">
          {filteredAssignments.map((assignment) => {
            const displayStatus = getDisplayStatus(assignment);
            const isSubmitted = assignment.status === "submitted";
            const isOverdue = displayStatus === "Overdue";

            return (
              <article className="assignment-card" key={assignment.id}>
                <div className="assignment-icon">
                  <FileText size={19} />
                </div>

                <span>{assignment.subject}</span>

                <h3>{assignment.title}</h3>

                {isAdmin && (
                  <p style={{ opacity: 0.75, fontSize: 13 }}>
                    Student: {assignment.student_name || "Unassigned"}
                    {assignment.student_code
                      ? ` · ${assignment.student_code}`
                      : ""}
                  </p>
                )}

                {assignment.description && (
                  <p style={{ lineHeight: 1.6, opacity: 0.8 }}>
                    {assignment.description}
                  </p>
                )}

                <div className="assignment-due">
                  <Clock size={14} />
                  Due {formatDate(assignment.due_date)}
                </div>

                <div
                  className={`assignment-status ${
                    isSubmitted
                      ? "submitted"
                      : isOverdue
                        ? "overdue"
                        : "pending"
                  }`}
                >
                  {isSubmitted ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Clock size={14} />
                  )}

                  {displayStatus}
                </div>

                {assignment.submitted_at && (
                  <p style={{ fontSize: 12, opacity: 0.7 }}>
                    Submitted: {formatDate(assignment.submitted_at)}
                  </p>
                )}

                {!isAdmin && !isSubmitted && (
                  <button
                    type="button"
                    className="primary-button"
                    disabled={submittingId === assignment.id}
                    onClick={() => void handleSubmit(assignment)}
                    style={{ marginTop: 14, width: "100%" }}
                  >
                    {submittingId === assignment.id ? (
                      <LoaderCircle size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    {submittingId === assignment.id
                      ? "Submitting..."
                      : "Mark as submitted"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <FileText size={32} />
          <h3>
            {search
              ? "No matching assignments"
              : "No assignments available"}
          </h3>
          <p>
            {search
              ? "Try another search term."
              : "Assignments will appear here when they are available."}
          </p>
        </div>
      )}
    </div>
  );
}