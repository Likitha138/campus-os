import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Users,
} from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: "users" | "building" | "activity" | "chart";
  accent?: string;
};

const icons = {
  users: Users,
  building: Building2,
  activity: Activity,
  chart: BarChart3,
};

export default function StatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon = "activity",
}: Props) {
  const Icon = icons[icon];

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={19} />
        </div>

        <span className={`trend trend-${trend}`}>
          {trend === "up" && <ArrowUpRight size={13} />}
          {trend === "down" && <ArrowDownRight size={13} />}
          {trend === "neutral" && <Activity size={12} />}
          {change}
        </span>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>

      <div className="stat-progress">
        <span />
      </div>
    </article>
  );
}