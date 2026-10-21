import { Award, TrendingUp } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function Marks() {
  const marks = [
    ["Web Technology", 87, "A"],
    ["Database Management", 91, "A+"],
    ["Data Analytics", 84, "A"],
    ["Software Engineering", 79, "B+"],
    ["Computer Networks", 89, "A"],
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="ACADEMIC PERFORMANCE"
        title="Marks & Grades"
        description="Track your academic performance across subjects."
      />

      <div className="stats-grid">
        <StatCard label="Current CGPA" value="8.46" change="+0.21" trend="up" icon="chart" />
        <StatCard label="Average Score" value="86.0" suffix="%" icon="activity" />
        <StatCard label="Highest Score" value="91" suffix="%" icon="chart" />
        <StatCard label="Academic Rank" value="#12" icon="users" />
      </div>

      <div className="data-card large">
        <div className="card-heading">
          <div>
            <strong>Subject performance</strong>
            <small>Current semester</small>
          </div>

          <TrendingUp size={20} />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Performance</th>
              </tr>
            </thead>

            <tbody>
              {marks.map(([subject, score, grade]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{score}%</td>
                  <td>
                    <span className="grade-pill">{grade}</span>
                  </td>
                  <td>
                    <div className="table-progress">
                      <div style={{ width: `${score}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}