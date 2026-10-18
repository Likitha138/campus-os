// ============================================================
// src/pages/Activity.tsx
// ============================================================

import {
  Activity as ActivityIcon,
  ArrowUpRight,
  Clock3,
  Users,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { activityData } from "../services/data";

function Activity() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        title="Activity Monitoring"
        description="Observe simulated campus movement, occupancy and activity patterns."
        icon={<ActivityIcon size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Current Activity"
          value="69%"
          detail="Campus utilization"
          icon={<ActivityIcon size={18} />}
          trend="+8.4%"
          tone="blue"
        />

        <StatCard
          label="Peak Activity"
          value="78%"
          detail="Highest today"
          icon={<ArrowUpRight size={18} />}
          tone="orange"
        />

        <StatCard
          label="People Flow"
          value="2,184"
          detail="Estimated movement"
          icon={<Users size={18} />}
          trend="+12%"
          tone="purple"
        />

        <StatCard
          label="Energy Load"
          value="64%"
          detail="Current utilization"
          icon={<Zap size={18} />}
          tone="green"
        />
      </div>

      <section className="content-grid two-column">
        <div className="content-card">
          <div className="card-header">
            <div>
              <span>ACTIVITY FLOW</span>
              <h2>Hourly Campus Activity</h2>
            </div>

            <Clock3 size={18} />
          </div>

          <div className="large-activity-chart">
            {activityData.map((item) => (
              <div
                className="large-activity-column"
                key={item.time}
              >
                <strong>{item.value}%</strong>

                <div className="large-bar-track">
                  <div
                    className="large-bar"
                    style={{
                      height: `${item.value}%`,
                    }}
                  />
                </div>

                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <span>ACTIVITY ZONES</span>
              <h2>Live Distribution</h2>
            </div>
          </div>

          <div className="zone-list">
            {[
              ["Library", 82],
              ["Block A", 68],
              ["Auditorium", 64],
              ["Admin", 59],
              ["Block B", 51],
              ["Block C", 37],
            ].map(([name, value]) => (
              <div className="zone-row" key={name}>
                <div>
                  <strong>{name}</strong>
                  <span>{value}% occupied</span>
                </div>

                <div className="zone-progress">
                  <span
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Activity;