import {
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Plus,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const assignments = [
  {
    title: "Data Analytics Dashboard",
    subject: "Data Analytics",
    due: "22 Oct 2026",
    progress: 82,
    status: "In Progress",
  },
  {
    title: "React Campus Module",
    subject: "Web Technology",
    due: "24 Oct 2026",
    progress: 64,
    status: "In Progress",
  },
  {
    title: "Cloud Architecture Report",
    subject: "Cloud Computing",
    due: "18 Oct 2026",
    progress: 100,
    status: "Submitted",
  },
  {
    title: "Software Design Document",
    subject: "Software Engineering",
    due: "28 Oct 2026",
    progress: 42,
    status: "Pending",
  },
];

export default function Assignments() {
  return (
    <div className="page">
      <PageHeader
        title="Assignments"
        subtitle="Track academic submissions, deadlines and progress."
        actions={
          <button className="primary-button">
            <Plus size={15} />
            New Assignment
          </button>
        }
      />

      <div className="assignment-summary">
        <div>
          <ClipboardList size={18} />
          <span>Total assignments</span>
          <strong>24</strong>
        </div>

        <div>
          <Clock3 size={18} />
          <span>Pending</span>
          <strong>07</strong>
        </div>

        <div>
          <CalendarClock size={18} />
          <span>Due this week</span>
          <strong>05</strong>
        </div>

        <div>
          <CheckCircle2 size={18} />
          <span>Completed</span>
          <strong>17</strong>
        </div>
      </div>

      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <article
            className="assignment-card"
            key={assignment.title}
          >
            <div className="assignment-card-top">
              <div className="assignment-icon">
                <ClipboardList size={18} />
              </div>

              <span
                className={`status-pill ${
                  assignment.status ===
                  "Submitted"
                    ? "success"
                    : assignment.progress < 50
                    ? "warning"
                    : "info"
                }`}
              >
                {assignment.status}
              </span>
            </div>

            <span className="assignment-subject">
              {assignment.subject}
            </span>

            <h3>{assignment.title}</h3>

            <div className="assignment-progress">
              <div>
                <span>Progress</span>
                <strong>
                  {assignment.progress}%
                </strong>
              </div>

              <div className="progress-bar">
                <span
                  style={{
                    width: `${assignment.progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="assignment-footer">
              <span>
                <CalendarClock size={13} />
                Due {assignment.due}
              </span>

              <button>
                View
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}