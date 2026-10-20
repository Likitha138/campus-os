import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Search,
  Users,
} from "lucide-react";

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
import StatCard from "../components/StatCard";
import {
  attendanceData,
  students,
} from "../data/campus";

export default function Attendance() {
  return (
    <div className="page">
      <PageHeader
        title="Attendance"
        subtitle="Monitor attendance records, shortages and academic participation."
        actions={
          <button className="secondary-button">
            <Download size={15} />
            Export
          </button>
        }
      />

      <div className="stats-grid">
        <StatCard
          label="Average Attendance"
          value="82.4%"
          change="+2.8%"
          trend="up"
          icon="chart"
        />

        <StatCard
          label="Students Monitored"
          value="3,248"
          change="Live"
          trend="neutral"
          icon="users"
        />

        <StatCard
          label="Attendance Shortage"
          value="184"
          change="-12"
          trend="up"
          icon="activity"
        />

        <StatCard
          label="Critical Cases"
          value="38"
          change="Review"
          trend="down"
          icon="activity"
        />
      </div>

      <div className="two-column-grid">
        <div className="panel large-chart-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SUBJECT ANALYSIS
              </span>
              <h3>Attendance by Subject</h3>
            </div>
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={attendanceData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,.05)"
                  vertical={false}
                />

                <XAxis
                  dataKey="subject"
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#667085"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111721",
                    border:
                      "1px solid rgba(255,255,255,.1)",
                    borderRadius: 12,
                  }}
                />

                <Bar
                  dataKey="attended"
                  fill="#4f8cff"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ATTENDANCE STATUS
              </span>
              <h3>Student Overview</h3>
            </div>

            <Users size={18} />
          </div>

          <div className="student-list">
            {students.map((student) => (
              <div
                className="student-row"
                key={student.id}
              >
                <div className="student-avatar">
                  {student.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="student-info">
                  <strong>{student.name}</strong>
                  <span>{student.department}</span>
                </div>

                <strong
                  className={
                    student.attendance < 65
                      ? "danger-text"
                      : student.attendance < 75
                      ? "warning-text"
                      : "success-text"
                  }
                >
                  {student.attendance}%
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel data-table-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              ATTENDANCE REGISTER
            </span>
            <h3>Detailed Records</h3>
          </div>

          <div className="table-tools">
            <div className="table-search">
              <Search size={14} />
              <input placeholder="Search student..." />
            </div>

            <button className="secondary-button compact">
              Filter
            </button>
          </div>
        </div>

        <div className="data-table">
          <div className="data-table-head">
            <span>Student</span>
            <span>Department</span>
            <span>Year</span>
            <span>Attendance</span>
            <span>Risk</span>
            <span>Status</span>
          </div>

          {students.map((student) => (
            <div
              className="data-table-row"
              key={student.id}
            >
              <div className="table-student">
                <div className="student-avatar small">
                  {student.name[0]}
                </div>
                <div>
                  <strong>{student.name}</strong>
                  <span>{student.id}</span>
                </div>
              </div>

              <span>{student.department}</span>
              <span>{student.year}</span>

              <strong>{student.attendance}%</strong>

              <span
                className={`status-pill ${
                  student.risk === "High"
                    ? "danger"
                    : student.risk ===
                      "Medium"
                    ? "warning"
                    : "success"
                }`}
              >
                {student.risk}
              </span>

              <span className="table-status">
                {student.attendance >= 75 ? (
                  <>
                    <CheckCircle2 size={14} />
                    Good
                  </>
                ) : (
                  <>
                    <AlertTriangle size={14} />
                    Review
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}