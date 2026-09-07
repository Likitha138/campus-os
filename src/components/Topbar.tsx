import {
  Search,
  Bell,
  ChevronDown,
  Sun,
} from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      {/* Search */}
      <div className="top-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search for buildings, rooms, labs..."
        />

        <span className="search-key">⌘ K</span>
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <div className="weather-mini">
          <Sun size={21} />
          <span>28°C</span>
        </div>

        <div className="top-time">
          12:45 PM
        </div>

        <div className="top-divider"></div>

        <button className="notification-button">
          <Bell size={20} />

          <span className="notification-count">
            3
          </span>
        </button>

        <div className="profile-box">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Likitha"
            className="profile-avatar"
          />

          <div className="profile-info">
            <strong>Likitha</strong>
            <span>Admin</span>
          </div>

          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;