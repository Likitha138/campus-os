import {
  Activity,
  CalendarDays,
  CloudSun,
  Menu,
  Wifi,
} from "lucide-react";

type Props = {
  onMenu?: () => void;
};

export default function Topbar({ onMenu }: Props) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-button" onClick={onMenu}>
          <Menu size={19} />
        </button>

        <div className="system-status">
          <span className="live-indicator" />
          <span>SIMULATION ONLINE</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className="topbar-metric">
          <Activity size={15} />
          <span>System Load</span>
          <strong>42%</strong>
        </div>

        <div className="topbar-metric">
          <Wifi size={15} />
          <span>Network</span>
          <strong className="success-text">Stable</strong>
        </div>

        <div className="topbar-metric">
          <CloudSun size={15} />
          <span>AQI</span>
          <strong>42</strong>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-date">
          <CalendarDays size={15} />
          <span>20 Oct 2026</span>
        </div>

        <div className="user-chip">
          <div className="avatar">BM</div>
          <div>
            <strong>Bhuvan M</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
}