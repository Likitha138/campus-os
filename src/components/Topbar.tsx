import {
  Bell,
  Menu,
  Search,
  UserRound,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onMenu?: () => void;
  session?: any;
}

export default function Topbar({ onMenu, session }: Props) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={onMenu}>
          <Menu size={21} />
        </button>

        <div className="topbar-search">
          <Search size={17} />
          <input placeholder="Search campus, students, rooms..." />
          <kbd>⌘ K</kbd>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="system-live">
          <Wifi size={15} />
          <span>LIVE</span>
        </div>

        <button
          className="icon-button"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={18} />
          <i />
        </button>

        <button
          className="top-user"
          onClick={() => navigate(session ? "/settings" : "/register")}
        >
          <div className="top-user-avatar">
            <UserRound size={16} />
          </div>
          <div className="top-user-text">
            <strong>{session?.name || "Guest User"}</strong>
            <span>{session?.role || "Guest"}</span>
          </div>
        </button>
      </div>
    </header>
  );
}