import {
  Bell,
  Database,
  Palette,
  Save,
  Server,
  Shield,
  UserRound,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

export default function Settings() {
  return (
    <div className="page">
      <PageHeader
        title="Settings"
        subtitle="Configure Campus OS behaviour, appearance and system preferences."
      />

      <div className="settings-layout">
        <aside className="settings-nav">
          <button className="active">
            <UserRound size={16} />
            Profile
          </button>

          <button>
            <Bell size={16} />
            Notifications
          </button>

          <button>
            <Palette size={16} />
            Appearance
          </button>

          <button>
            <Server size={16} />
            Backend
          </button>

          <button>
            <Database size={16} />
            Data
          </button>

          <button>
            <Shield size={16} />
            Security
          </button>
        </aside>

        <section className="settings-content">
          <div className="panel settings-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  USER PROFILE
                </span>
                <h3>Administrator Profile</h3>
              </div>
            </div>

            <div className="settings-profile">
              <div className="settings-avatar">
                BM
              </div>

              <div>
                <strong>Bhuvan M</strong>
                <span>
                  Campus OS Administrator
                </span>
              </div>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>Full name</span>
                <input
                  defaultValue="Bhuvan M"
                />
              </label>

              <label className="field">
                <span>Role</span>
                <input
                  defaultValue="Administrator"
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  defaultValue="admin@campus-os.local"
                />
              </label>

              <label className="field">
                <span>Campus</span>
                <input
                  defaultValue="Main Campus"
                />
              </label>
            </div>
          </div>

          <div className="panel settings-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  SYSTEM
                </span>
                <h3>Backend Connection</h3>
              </div>
            </div>

            <div className="settings-connection">
              <div>
                <Server size={18} />
                <div>
                  <strong>
                    Node.js / Express API
                  </strong>
                  <span>
                    http://localhost:5000/api
                  </span>
                </div>
              </div>

              <span className="status-pill success">
                CONFIGURED
              </span>
            </div>
          </div>

          <div className="panel settings-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">
                  PREFERENCES
                </span>
                <h3>Application Preferences</h3>
              </div>
            </div>

            <div className="settings-options">
              <Toggle
                title="Live simulation updates"
                description="Automatically refresh simulation information."
                checked
              />

              <Toggle
                title="AI recommendations"
                description="Show Campus Intelligence recommendations."
                checked
              />

              <Toggle
                title="System notifications"
                description="Receive important system notifications."
                checked
              />

              <Toggle
                title="Compact data tables"
                description="Reduce table spacing on smaller screens."
                checked={false}
              />
            </div>
          </div>

          <button className="primary-button">
            <Save size={15} />
            Save Settings
          </button>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  title,
  description,
  checked,
}: {
  title: string;
  description: string;
  checked: boolean;
}) {
  return (
    <label className="setting-toggle">
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <input
        type="checkbox"
        defaultChecked={checked}
      />

      <i />
    </label>
  );
}