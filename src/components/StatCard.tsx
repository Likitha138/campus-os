import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Car,
  Users,
} from "lucide-react";

const icons: Record<string, any> = {
  users: Users,
  buildings: Building2,
  activity: Activity,
  traffic: Car,
  chart: BarChart3,
};

interface Props {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
  suffix?: string;
}

export default function StatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon = "activity",
  suffix,
}: Props) {
  const Icon = icons[icon] || Activity;

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon size={18} />
        </div>

        {change && (
          <span className={`trend ${trend}`}>
            {trend === "up" && <ArrowUpRight size={13} />}
            {trend === "down" && <ArrowDownRight size={13} />}
            {change}
          </span>
        )}
      </div>

      <div className="stat-value">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>

      <div className="stat-label">{label}</div>
    </div>
  );
}