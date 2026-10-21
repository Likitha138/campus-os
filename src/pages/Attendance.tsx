import { CalendarCheck, CheckCircle2, Clock3 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function Attendance() {
  const subjects = [
    ["Web Technology", 92],
    ["Database Management", 88],
    ["Data Analytics", 81],
    ["Software Engineering", 76],
    ["Computer Networks", 94],
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="STUDENT SERVICES"
        title="Attendance"
        description="View your academic attendance and subject-wise presence."
      />

      <div className="stats-grid">
        <StatCard label="Overall Attendance" value="86" suffix="%" change="+2.4%" trend="up" icon="activity" />
        <StatCard label="Classes Attended" value="128" icon="chart" />
        <StatCard label="Classes Missed" value="21" icon="activity" />
        <StatCard label="Attendance Status" value="Good" icon="users" />
      </div>

      <div className="data-card large">
        <div className="card-heading">
          <div>
            <strong>Subject attendance</strong>
            <small>Current semester</small>
          </div>
        </div>

        {subjects.map(([subject, percentage]) => (
          <div className="progress-row" key={subject}>
            <div>
              <span>{subject}</span>
              <strong>{percentage}%</strong>
            </div>

            <div className="progress-track">
              <div style={{ width: `${percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="attendance-events">
        <div className="data-card">
          <CheckCircle2 size={20} />
          <strong>Today</strong>
          <span>5 classes completed</span>
        </div>

        <div className="data-card">
          <CalendarCheck size={20} />
          <strong>This month</strong>
          <span>92% attendance</span>
        </div>

        <div className="data-card">
          <Clock3 size={20} />
          <strong>Last updated</strong>
          <span>Today, 4:32 PM</span>
        </div>
      </div>
    </div>
  );
}