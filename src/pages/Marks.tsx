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
import { marksData } from "../services/data";

function Marks() {
  const average = Math.round(
    marksData.reduce((sum, item) => sum + item.marks, 0) /
      marksData.length
  );

  return (
    <div>
      <PageHeader
        title="Marks & Performance"
        description="View your subject-wise academic performance."
      />

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Average Marks</div>
          <div className="stat-value">{average}%</div>
          <div className="stat-change">Above class average</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Highest Score</div>
          <div className="stat-value">91%</div>
          <div className="stat-change">Web Technology</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Subjects</div>
          <div className="stat-value">{marksData.length}</div>
          <div className="stat-change">Current semester</div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-label">Overall GPA</div>
          <div className="stat-value">8.7</div>
          <div className="stat-change">Good performance</div>
        </div>
      </div>

      <div className="glass-card chart-card">
        <h2 className="section-title">Subject Performance</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marksData}>
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
                dataKey="marks"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card table-card">
        <h2 className="section-title">Marks Details</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>
            {marksData.map((item) => {
              const grade =
                item.marks >= 90
                  ? "A+"
                  : item.marks >= 80
                  ? "A"
                  : item.marks >= 70
                  ? "B+"
                  : "B";

              return (
                <tr key={item.subject}>
                  <td>{item.subject}</td>
                  <td>{item.marks}%</td>
                  <td>
                    <span className="badge badge-success">
                      {grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Marks;