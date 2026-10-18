// ============================================================
// src/pages/Emergency.tsx
// ============================================================

import {
  AlertOctagon,
  CheckCircle2,
  Radio,
  ShieldAlert,
  Siren,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Emergency() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAMPUS SAFETY"
        title="Emergency Command"
        description="Monitor simulated safety incidents and emergency response readiness."
        icon={<ShieldAlert size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Active Incidents"
          value="01"
          detail="Requires monitoring"
          icon={<AlertOctagon size={18} />}
          tone="orange"
        />

        <StatCard
          label="Response Units"
          value="06"
          detail="Available"
          icon={<Siren size={18} />}
          tone="blue"
        />

        <StatCard
          label="Campus Safety"
          value="96%"
          detail="Readiness score"
          icon={<CheckCircle2 size={18} />}
          tone="green"
        />

        <StatCard
          label="People Protected"
          value="3,248"
          detail="Registered population"
          icon={<Users size={18} />}
          tone="purple"
        />
      </div>

      <section className="emergency-layout">
        <div className="emergency-map">
          <div className="emergency-radar">
            <span />
            <span />
            <span />
          </div>

          <div className="emergency-center">
            <Siren size={28} />
            <strong>INCIDENT</strong>
            <span>ZONE C</span>
          </div>

          <div className="emergency-node node-1">
            <Radio size={14} />
          </div>

          <div className="emergency-node node-2">
            <Radio size={14} />
          </div>

          <div className="emergency-node node-3">
            <Radio size={14} />
          </div>
        </div>

        <div className="content-card emergency-details">
          <span className="danger-label">
            ACTIVE INCIDENT
          </span>

          <h2>Traffic obstruction</h2>

          <p>
            Simulated vehicle density has exceeded
            the emergency threshold in Zone C.
          </p>

          <div className="incident-detail">
            <span>Location</span>
            <strong>Zone C · North Road</strong>
          </div>

          <div className="incident-detail">
            <span>Severity</span>
            <strong className="danger-text">
              High
            </strong>
          </div>

          <div className="incident-detail">
            <span>Response</span>
            <strong>Unit 04 dispatched</strong>
          </div>

          <button
            type="button"
            className="danger-button"
          >
            Acknowledge Incident
          </button>
        </div>
      </section>
    </div>
  );
}

export default Emergency;