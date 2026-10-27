import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  GraduationCap,
  LoaderCircle,
  RefreshCw,
  Search,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../auth/AuthContext";
import {
  getAllMarks,
  getMarksByUser,
  getMarksSummary,
  type MarkRecord,
  type MarksSummary,
} from "../services/marksService";

const formatNumber = (value: number | string | null | undefined) =>
  Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

const getPercentage = (mark: MarkRecord) => {
  const total = Number(mark.total_marks);
  return total > 0
    ? (Number(mark.marks_obtained) / total) * 100
    : 0;
};

const getGradeClass = (grade: string) => {
  if (grade === "A+" || grade === "A") return "marks-grade-good";
  if (grade === "B" || grade === "B+") return "marks-grade-average";
  return "marks-grade-low";
};

export default function Marks() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.role === "admin";

  const [marks, setMarks] = useState<MarkRecord[]>([]);
  const [summary, setSummary] = useState<MarksSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadMarks = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setMarks([]);
      setSummary(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isAdmin) {
        const records = await getAllMarks();
        setMarks(records);
        setSummary(null);
      } else {
        const [records, summaryData] = await Promise.all([
          getMarksByUser(String(user.id)),
          getMarksSummary(String(user.id)),
        ]);

        setMarks(records);
        setSummary(summaryData);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load marks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, isAdmin]);

  useEffect(() => {
    void loadMarks();
  }, [loadMarks]);

  const filteredMarks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return marks;

    return marks.filter((mark) =>
      [
        mark.subject,
        mark.exam_type,
        mark.grade,
        mark.student_name,
        mark.student_code,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  }, [marks, searchTerm]);

  const stats = useMemo(() => {
    const obtained = marks.reduce(
      (sum, mark) => sum + Number(mark.marks_obtained || 0),
      0
    );

    const possible = marks.reduce(
      (sum, mark) => sum + Number(mark.total_marks || 0),
      0
    );

    return {
      count: marks.length,
      obtained,
      possible,
      percentage: possible > 0 ? (obtained / possible) * 100 : 0,
      highest: marks.length
        ? Math.max(...marks.map((mark) => getPercentage(mark)))
        : 0,
    };
  }, [marks]);

  if (!isAuthenticated || !user) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="ACADEMIC PERFORMANCE"
          title="Marks & Grades"
          description="Track your academic performance across subjects."
        />

        <div className="data-card large">
          <p>Please log in to view your examination results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page marks-page">
      <PageHeader
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks & Grades"
        description={
          isAdmin
            ? "Review examination results across students."
            : "Track your academic performance across subjects."
        }
      />

      <style>{`
        .marks-page .marks-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 22px 0;
        }

        .marks-page .marks-toolbar p {
          margin: 5px 0 0;
          color: var(--text-secondary, #94a3b8);
          font-size: 13px;
        }

        .marks-page .marks-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid var(--border-color, rgba(148,163,184,.25));
          border-radius: 10px;
          background: var(--card-bg, rgba(15,23,42,.65));
          color: inherit;
          cursor: pointer;
          font: inherit;
          font-size: 13px;
        }

        .marks-page .marks-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .marks-page .marks-search {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 300px;
          width: 100%;
          padding: 9px 12px;
          border: 1px solid var(--border-color, rgba(148,163,184,.25));
          border-radius: 10px;
          color: var(--text-secondary, #94a3b8);
        }

        .marks-page .marks-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 13px;
        }

        .marks-page .marks-grade-good {
          color: #4ade80;
          background: rgba(34,197,94,.12);
        }

        .marks-page .marks-grade-average {
          color: #fbbf24;
          background: rgba(245,158,11,.12);
        }

        .marks-page .marks-grade-low {
          color: #f87171;
          background: rgba(239,68,68,.12);
        }

        .marks-page .grade-pill {
          display: inline-flex;
          justify-content: center;
          min-width: 36px;
          padding: 5px 8px;
          border-radius: 7px;
          font-weight: 700;
        }

        .marks-page .table-progress {
          width: 100%;
          min-width: 80px;
          max-width: 140px;
          height: 6px;
          overflow: hidden;
          border-radius: 20px;
          background: rgba(148,163,184,.17);
        }

        .marks-page .table-progress > div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
        }

        .marks-page .marks-message {
          padding: 13px 15px;
          margin: 16px 0;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .marks-page .marks-error {
          color: #fca5a5;
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.25);
        }

        .marks-page .marks-loading,
        .marks-page .marks-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 180px;
          padding: 25px;
          text-align: center;
          color: var(--text-secondary, #94a3b8);
        }

        .marks-page .marks-empty h3 {
          margin: 0;
          color: var(--text-primary, #e5edf8);
        }

        .marks-page .marks-empty p {
          margin: 0;
          font-size: 13px;
        }

        .marks-page .marks-panel-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .marks-page .marks-student-name {
          display: block;
          font-weight: 600;
        }

        .marks-page .marks-muted {
          display: block;
          margin-top: 4px;
          color: var(--text-secondary, #94a3b8);
          font-size: 11px;
        }

        @media (max-width: 650px) {
          .marks-page .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="marks-toolbar">
        <div>
          <strong>{isAdmin ? "Student results" : "Your results"}</strong>
          <p>
            {marks.length} examination record{marks.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          className="marks-button"
          onClick={() => void loadMarks()}
          disabled={loading}
        >
          <RefreshCw size={15} />
          Refresh results
        </button>
      </div>

      {error && (
        <div className="marks-message marks-error" role="alert">
          {error}
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              className="marks-button"
              onClick={() => void loadMarks()}
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <StatCard
          label={isAdmin ? "Total Records" : "Total Exams"}
          value={loading ? "—" : String(summary?.total_exams ?? stats.count)}
          icon="activity"
        />

        <StatCard
          label="Average Score"
          value={
            loading
              ? "—"
              : formatNumber(
                  isAdmin
                    ? stats.percentage
                    : summary?.overall_percentage ?? 0
                )
          }
          suffix="%"
          icon="chart"
        />

        <StatCard
          label="Highest Score"
          value={loading ? "—" : formatNumber(stats.highest)}
          suffix="%"
          icon="chart"
        />

        <StatCard
          label={isAdmin ? "Students / Records" : "Overall Grade"}
          value={
            loading
              ? "—"
              : isAdmin
                ? String(stats.count)
                : summary?.grade ?? "—"
          }
          icon="users"
        />
      </div>

      <div className="data-card large">
        <div className="card-heading marks-panel-heading">
          <div>
            <strong>{isAdmin ? "Student performance" : "Subject performance"}</strong>
            <small>
              {isAdmin ? "All recorded examination results" : "Your recorded examination results"}
            </small>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TrendingUp size={20} />
            <label className="marks-search">
              <Search size={15} />
              <input
                type="search"
                placeholder="Search results..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search marks"
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="marks-loading">
            <LoaderCircle size={22} />
            Loading examination results...
          </div>
        ) : filteredMarks.length === 0 ? (
          <div className="marks-empty">
            <BookOpen size={30} />
            <h3>{searchTerm ? "No matching results" : "No marks available yet"}</h3>
            <p>
              {searchTerm
                ? "Try a different subject, exam type or student name."
                : "Results will appear here once marks have been added to the system."}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {isAdmin && <th>Student</th>}
                  <th>Subject</th>
                  <th>Exam Type</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Performance</th>
                </tr>
              </thead>

              <tbody>
                {filteredMarks.map((mark) => {
                  const percentage = getPercentage(mark);

                  return (
                    <tr key={mark.id}>
                      {isAdmin && (
                        <td>
                          <span className="marks-student-name">
                            {mark.student_name || "Unknown student"}
                          </span>
                          <span className="marks-muted">
                            {mark.student_code
                              ? `Student ID: ${mark.student_code}`
                              : `User ID: ${mark.user_id}`}
                          </span>
                        </td>
                      )}

                      <td>
                        <strong>{mark.subject}</strong>
                      </td>

                      <td>{mark.exam_type}</td>

                      <td>
                        {formatNumber(mark.marks_obtained)} /{" "}
                        {formatNumber(mark.total_marks)}
                        <span className="marks-muted">
                          {formatNumber(percentage)}%
                        </span>
                      </td>

                      <td>
                        <span className={`grade-pill ${getGradeClass(mark.grade)}`}>
                          {mark.grade || "—"}
                        </span>
                      </td>

                      <td>
                        <div className="table-progress">
                          <div
                            style={{
                              width: `${Math.min(100, Math.max(0, percentage))}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}