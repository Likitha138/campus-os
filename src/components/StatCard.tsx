import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  description?: string;
  icon: LucideIcon;
}

function StatCard({
  label,
  value,
  change,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="stat-card glass-card">
      <div className="stat-top">
        <div>
          <p className="stat-label">{label}</p>

          <h3 className="stat-value">{value}</h3>

          {change && (
            <p className="stat-change">
              {change}
            </p>
          )}

          {description && (
            <p className="stat-label">
              {description}
            </p>
          )}
        </div>

        <div className="stat-icon">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;