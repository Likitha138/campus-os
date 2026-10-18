// ============================================================
// src/pages/Settings.tsx
// ============================================================

import {
  Bell,
  Database,
  MonitorCog,
  Palette,
  Save,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

function Settings() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="SYSTEM CONFIGURATION"
        title="Settings"
        description="Configure your Campus OS experience and simulation preferences."
        icon={<MonitorCog size={22} />}
        action={
          <button type="button" className="primary-button">
            <Save size={16} />
            Save Changes
          </button>
        }
      />

      <section className="settings-grid">
        <div className="settings-card">
          <div className="settings-title">
            <Palette size={18} />
            <div>
              <strong>Appearance</strong>
              <span>Interface preferences</span>
            </div>
          </div>

          <label className="settings-toggle">
            <span>
              Dark digital-twin theme
            </span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="settings-toggle">
            <span>Animated interface</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <Bell size={18} />
            <div>
              <strong>Notifications</strong>
              <span>System alerts</span>
            </div>
          </div>

          <label className="settings-toggle">
            <span>Traffic alerts</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="settings-toggle">
            <span>Campus events</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <Database size={18} />
            <div>
              <strong>Data Engine</strong>
              <span>Simulation preferences</span>
            </div>
          </div>

          <label className="settings-toggle">
            <span>Real-time simulation</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="settings-toggle">
            <span>Auto-refresh data</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-title">
            <Shield size={18} />
            <div>
              <strong>Security</strong>
              <span>Campus access controls</span>
            </div>
          </div>

          <label className="settings-toggle">
            <span>Secure session</span>
            <input type="checkbox" defaultChecked />
          </label>

          <label className="settings-toggle">
            <span>Activity logging</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </section>

      <section className="settings-advanced">
        <div>
          <SlidersHorizontal size={19} />
          <div>
            <strong>Advanced Simulation Configuration</strong>
            <span>
              Configure digital twin refresh rate,
              vehicle density and campus activity
              sensitivity.
            </span>
          </div>
        </div>

        <button type="button">
          Configure
        </button>
      </section>
    </div>
  );
}

export default Settings;