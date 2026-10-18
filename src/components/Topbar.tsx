// ============================================================
// src/components/Topbar.tsx
// ============================================================

import {
  Bell,
  Menu,
  Search,
  Sun,
  UserRound,
} from "lucide-react";

type TopbarProps = {
  onMenuClick?: () => void;
};

function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="topbar-search">
        <Search size={17} />

        <input
          placeholder="Search campus, rooms, vehicles..."
          aria-label="Search campus"
        />

        <kbd>⌘ K</kbd>
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-weather">
        <Sun size={17} />
        <div>
          <strong>28°C</strong>
          <span>Bengaluru</span>
        </div>
      </div>

      <div className="topbar-time">
        <strong>
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>
        <span>LIVE</span>
      </div>

      <button
        type="button"
        className="topbar-icon-button notification-button"
        aria-label="Notifications"
      >
        <Bell size={18} />
        <span />
      </button>

      <div className="topbar-user">
        <div className="topbar-user-avatar">
          L
        </div>

        <div>
          <strong>Likitha</strong>
          <span>Student</span>
        </div>

        <UserRound size={15} />
      </div>
    </header>
  );
}

export default Topbar;