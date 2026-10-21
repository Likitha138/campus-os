import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { activityData } from "../data/campus";

export default function Activity() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        title="Activity Monitor"
        description="Monitor student movement and campus utilization in real time."
      />

      <div className="stats-grid">
        <StatCard label="People on Campus" value="2,046" change="+8.2%" trend="up" icon="users" />
        <StatCard label="Peak Occupancy" value="78%" change="+4.1%" trend="up" icon="activity" />
        <StatCard label="Active Zones" value="18" icon="buildings" />
        <StatCard label="Movement Index" value="82" change="+6.7%" trend="up" icon="chart" />
      </div>

      <div className="content-grid-2">
        <div className="data-card large">
          <div className="card-heading">
            <div>
              <strong>Campus activity timeline</strong>
              <small>Student presence throughout the day</small>
            </div>
          </div>

          <div className="large-chart">
            {activityData.map((item) => (
              <div className="chart-column" key={item.time}>
                <div
                  className="chart-bar"
                  style={{ height: `${item.students / 7}px` }}
                >
                  <span>{item.students}</span>
                </div>
                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="data-card large">
          <div className="card-heading">
            <div>
              <strong>Zone utilization</strong>
              <small>Current distribution</small>
            </div>
          </div>

          {[
            ["Academic Block", 82],
            ["Library", 71],
            ["Innovation Lab", 64],
            ["Sports Zone", 49],
            ["Administration", 38],
          ].map(([name, value]) => (
            <div className="progress-row" key={name}>
              <div>
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>
              <div className="progress-track">
                <div style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}