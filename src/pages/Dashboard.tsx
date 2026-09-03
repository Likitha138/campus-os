import {
  Activity,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { student, attendanceData, assignments, marksData } from "../services/data";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Dashboard() {
  const averageMarks = Math.round(
    marksData.reduce((total, item) => total + item.marks, 0) / marksData.length
  );

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${student.name}`}
        description="Here's your academic overview for this semester."
      />

      <div className="stats-grid">
        <StatCard
          title="Attendance"
          value="92%"
          change="+3.5% this month"
          icon={<CheckCircle2 size={21} />}
        />

        <StatCard
          title="Overall GPA"
          value="8.7"
          change="+0.4 improvement"
          icon={<GraduationCap size={21} />}
        />

        <StatCard
          title="Academic Score"
          value={`${averageMarks}%`}
          change="+5.2% this semester"
          icon={<TrendingUp size={21} />}
        />

        <StatCard
          title="Pending Tasks"
          value={String(pendingAssignments)}
          change="2 assignments pending"
          icon={<Clock3 size={21} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="glass-card chart-card">
          <div className="stat-top">
            <div>
              <h2 className="section-title">Attendance Overview</h2>
              <p className="stat-label">
                Monthly attendance performance
              </p>
            </div>

            <Activity size={20} />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient
                    id="attendanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.08)"
                />

                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={12}
                />

                <YAxis
                  domain={[70, 100]}
                  stroke="#64748b"
                  fontSize={12}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0f1b2d",
                    border: "1px solid rgba(148,163,184,0.15)",
                    borderRadius: "10px",
                    color: "#e5e7eb",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#attendanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-card">
          <h2 className="section-title">Upcoming Assignments</h2>

          <div className="alert-list">
            {assignments.slice(0, 4).map((assignment) => (
              <div className="alert-item" key={assignment.title}>
                <div className="alert-icon">
                  <BookOpen size={18} />
                </div>

                <div>
                  <h4>{assignment.title}</h4>

                  <p>{assignment.subject}</p>

                  <p>
                    Deadline: {assignment.deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card table-card">
        <h2 className="section-title">Academic Snapshot</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
              <th>Performance</th>
            </tr>
          </thead>

          <tbody>
            {marksData.map((subject) => (
              <tr key={subject.subject}>
                <td>{subject.subject}</td>

                <td>
                  <strong>{subject.marks}%</strong>
                </td>

                <td>
                  <div style={{ maxWidth: "220px" }}>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${subject.marks}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;