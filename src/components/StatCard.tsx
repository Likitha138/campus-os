import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  positive?: boolean;
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: StatCardProps) {
  return (
    <div className="glass-card stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <span className="stat-label">
          {title}
        </span>

      </div>

      <div className="stat-value">
        {value}
      </div>

      {change && (
        <div
          className="stat-change"
          style={{
            color: positive ? "#4ade80" : "#f87171",
          }}
        >
          {positive ? "↑" : "↓"} {change}
        </div>
      )}

    </div>
  );
}

export default StatCard;