import { CheckCircle2, Clock3, FileText } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { assignments } from "../services/data";

function Assignments() {
  const submitted = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  const pending = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div>
      <PageHeader
        title="Assignments"
        description="Manage your assignments and submission deadlines."
      />

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Total Assignments</div>
          <div className="stat-value">{assignments.length}</div>
          <div className="stat-change">This semester</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Submitted</div>
          <div className="stat-value">{submitted}</div>
          <div className="stat-change">Completed</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pending}</div>
          <div className="stat-change">Needs attention</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Completion Rate</div>
          <div className="stat-value">
            {Math.round((submitted / assignments.length) * 100)}%
          </div>
          <div className="stat-change">Overall</div>
        </div>
      </div>

      <div className="glass-card table-card">
        <h2 className="section-title">Assignment List</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.title}>
                <td>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <FileText size={17} />
                    {assignment.title}
                  </div>
                </td>

                <td>{assignment.subject}</td>

                <td>{assignment.deadline}</td>

                <td>
                  {assignment.status === "Submitted" ? (
                    <span className="badge badge-success">
                      <CheckCircle2 size={13} style={{ marginRight: 5 }} />
                      Submitted
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      <Clock3 size={13} style={{ marginRight: 5 }} />
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignments;