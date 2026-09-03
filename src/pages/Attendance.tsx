import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/PageHeader";

const attendance = [
  { subject: "Python", percentage: 94 },
  { subject: "Web Tech", percentage: 91 },
  { subject: "DBMS", percentage: 78 },
  { subject: "AI", percentage: 96 },
  { subject: "Cloud", percentage: 89 },
];

function Attendance() {
  return (
    <div>
      <PageHeader
        title="Attendance"
        description="Track your attendance across all subjects."
      />

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Overall Attendance</div>
          <div className="stat-value">92%</div>
          <div className="stat-change">Good standing</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Best Attendance</div>
          <div className="stat-value">96%</div>
          <div className="stat-change">Artificial Intelligence</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Lowest Attendance</div>
          <div className="stat-value">78%</div>
          <div className="stat-change">Database Management</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Classes Attended</div>
          <div className="stat-value">138</div>
          <div className="stat-change">Out of 150 classes</div>
        </div>
      </div>

      <div className="glass-card chart-card">
        <h2 className="section-title">Subject-wise Attendance</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendance}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.08)"
              />

              <XAxis
                dataKey="subject"
                stroke="#64748b"
                fontSize={12}
              />

              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                fontSize={12}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f1b2d",
                  border: "1px solid rgba(148,163,184,0.15)",
                  borderRadius: "10px",
                }}
              />

              <Bar
                dataKey="percentage"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card table-card">
        <h2 className="section-title">Attendance Details</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Attendance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr key={item.subject}>
                <td>{item.subject}</td>

                <td>
                  <strong>{item.percentage}%</strong>
                </td>

                <td>
                  <span
                    className={`badge ${
                      item.percentage >= 85
                        ? "badge-success"
                        : item.percentage >= 75
                        ? "badge-warning"
                        : "badge-danger"
                    }`}
                  >
                    {item.percentage >= 85
                      ? "Excellent"
                      : item.percentage >= 75
                      ? "Warning"
                      : "Critical"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;