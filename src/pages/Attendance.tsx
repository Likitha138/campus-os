// ============================================================
// src/pages/Attendance.tsx
// ============================================================

import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { attendanceData } from "../services/data";

function Attendance() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="ACADEMIC INTELLIGENCE"
        title="Attendance Intelligence"
        description="Monitor attendance patterns and identify academic risk early."
        icon={<ClipboardCheck size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Overall Attendance"
          value="89%"
          detail="Current semester"
          icon={<CheckCircle2 size={18} />}
          trend="+3.2%"
          tone="green"
        />

        <StatCard
          label="Present Today"
          value="2,914"
          detail="Students"
          icon={<Users size={18} />}
          tone="blue"
        />

        <StatCard
          label="At Risk"
          value="184"
          detail="Below threshold"
          icon={<TrendingUp size={18} />}
          tone="orange"
        />

        <StatCard
          label="Classes Today"
          value="42"
          detail="Scheduled sessions"
          icon={<Clock3 size={18} />}
          tone="purple"
        />
      </div>

      <section className="content-card">
        <div className="card-header">
          <div>
            <span>SUBJECT ANALYSIS</span>
            <h2>Attendance by Subject</h2>
          </div>
        </div>

        <div className="academic-list">
          {attendanceData.map((item) => (
            <div
              className="academic-row"
              key={item.subject}
            >
              <div>
                <strong>{item.subject}</strong>
                <span>
                  Attendance performance
                </span>
              </div>

              <div className="academic-progress">
                <div>
                  <span
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>

                <strong>
                  {item.percentage}%
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Attendance; 