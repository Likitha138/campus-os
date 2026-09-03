import {
  Search,
  Bell,
  ChevronDown,
  Command,
} from "lucide-react";

import { student } from "../services/data";

function Topbar() {
  return (
    <header className="topbar">

      {/* Search */}
      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search Campus OS..."
        />

        <div className="search-shortcut">
          <Command size={11} />
          <span>K</span>
        </div>
      </div>

      {/* Right side */}
      <div className="topbar-right">

        {/* Notification */}
        <button
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="notification-dot"></span>
        </button>

        {/* Profile */}
        <div className="profile">

          <img
            src="/src/assets/avatar.svg"
            alt="Student avatar"
            className="profile-image"
          />

          <div>
            <strong>{student.name}</strong>
            <small>{student.course}</small>
          </div>

          <ChevronDown
            size={15}
            className="profile-arrow"
          />

        </div>

      </div>
    </header>
  );
}

export default Topbar;