import { CheckCircle2, Clock, FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Assignments() {
  const assignments = [
    ["Database ER Diagram", "Database Management", "22 Oct 2026", "Pending"],
    ["React Mini Project", "Web Technology", "25 Oct 2026", "Submitted"],
    ["Analytics Report", "Data Analytics", "28 Oct 2026", "Pending"],
    ["Network Design", "Computer Networks", "30 Oct 2026", "Pending"],
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="ACADEMIC WORKSPACE"
        title="Assignments"
        description="Track upcoming, submitted and completed assignments."
      />

      <div className="assignment-grid">
        {assignments.map(([title, subject, due, status]) => (
          <div className="assignment-card" key={title}>
            <div className="assignment-icon">
              <FileText size={19} />
            </div>

            <span>{subject}</span>
            <h3>{title}</h3>

            <div className="assignment-due">
              <Clock size={14} />
              Due {due}
            </div>

            <div className={`assignment-status ${status.toLowerCase()}`}>
              {status === "Submitted" ? (
                <CheckCircle2 size={14} />
              ) : (
                <Clock size={14} />
              )}
              {status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}