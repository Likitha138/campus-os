// ============================================================
// src/components/StatCard.tsx
// ============================================================

import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
  trend?: string;
  tone?: "blue" | "green" | "orange" | "purple";
};

function StatCard({
  label,
  value,
  detail,
  icon,
  trend,
  tone = "blue",
}: StatCardProps) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-card-top">
        <div className="stat-icon">
          {icon}
        </div>

        {trend && (
          <span className="stat-trend">
            {trend}
          </span>
        )}
      </div>

      <span className="stat-label">{label}</span>

      <strong className="stat-value">{value}</strong>

      <span className="stat-detail">{detail}</span>
    </article>
  );
}

export default StatCard;