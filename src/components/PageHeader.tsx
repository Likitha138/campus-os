import {
  Bell,
  ChevronRight,
  Command,
  Search,
} from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  eyebrow = "CAMPUS OS",
  actions,
}: Props) {
  return (
    <header className="page-header">
      <div className="page-header-copy">
        <div className="page-eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </div>

        <div className="breadcrumb">
          <span>Campus OS</span>
          <ChevronRight size={13} />
          <strong>{title}</strong>
        </div>

        <h1>{title}</h1>

        {subtitle && (
          <p className="page-subtitle">{subtitle}</p>
        )}
      </div>

      <div className="page-header-actions">
        <div className="header-search">
          <Search size={16} />
          <input placeholder="Search campus..." />
          <span className="shortcut">
            <Command size={11} /> K
          </span>
        </div>

        <button className="icon-button">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        {actions}
      </div>
    </header>
  );
}