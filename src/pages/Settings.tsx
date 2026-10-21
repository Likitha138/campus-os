import { Bell, Lock, Palette, UserRound } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Settings() {
  const session = JSON.parse(
    localStorage.getItem("campus_os_session") || "null"
  );

  return (
    <div className="page">
      <PageHeader
        eyebrow="SYSTEM SETTINGS"
        title="Settings"
        description="Manage your Campus OS profile and preferences."
      />

      <div className="settings-grid">
        <div className="data-card settings-profile">
          <div className="settings-avatar">
            <UserRound size={28} />
          </div>

          <span className="eyebrow">PROFILE</span>
          <h2>{session?.name || "Guest User"}</h2>
          <p>{session?.email || "Not signed in"}</p>

          <span className="role-badge">
            {session?.role || "Guest"}
          </span>
        </div>

        <div className="data-card settings-options">
          <div className="setting-row">
            <div className="setting-icon">
              <Bell size={17} />
            </div>
            <div>
              <strong>Notifications</strong>
              <span>Receive campus announcements</span>
            </div>
            <div className="toggle active">
              <span />
            </div>
          </div>

          <div className="setting-row">
            <div className="setting-icon">
              <Palette size={17} />
            </div>
            <div>
              <strong>Dark interface</strong>
              <span>Use the Campus OS dark interface</span>
            </div>
            <div className="toggle active">
              <span />
            </div>
          </div>

          <div className="setting-row">
            <div className="setting-icon">
              <Lock size={17} />
            </div>
            <div>
              <strong>Account security</strong>
              <span>Password and authentication controls</span>
            </div>
            <button className="small-button">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
}