import {
  Search,
  Sun,
  Bell,
  ChevronDown,
} from "lucide-react";

function Topbar() {
  return (
    <header className="campus-topbar">

      {/* Search */}
      <div className="top-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search for buildings, rooms, labs..."
        />

        <span className="search-key">
          ⌘ K
        </span>
      </div>

      {/* Right side */}
      <div className="topbar-right">

        {/* Weather */}
        <div className="top-weather">
          <Sun size={22} />
          <strong>28°C</strong>
        </div>

        {/* Time */}
        <div className="top-time">
          12:45 PM
        </div>

        <div className="top-divider"></div>

        {/* Notifications */}
        <button className="notification-btn">
          <Bell size={21} />

          <span className="notification-count">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="top-profile">

          <div className="profile-avatar">
            L
          </div>

          <div className="profile-info">
            <strong>Likitha</strong>
            <span>Student</span>
          </div>

          <ChevronDown size={17} />

        </div>

      </div>

    </header>
  );
}

export default Topbar;