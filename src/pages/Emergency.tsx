import { AlertTriangle, Phone, ShieldAlert, Siren } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Emergency() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="CAMPUS SAFETY"
        title="Emergency Control"
        description="Centralized emergency information and response controls."
      />

      <div className="emergency-banner">
        <div className="emergency-icon">
          <Siren size={28} />
        </div>

        <div>
          <span>EMERGENCY STATUS</span>
          <strong>Campus operating normally</strong>
          <p>No active critical incidents have been reported.</p>
        </div>
      </div>

      <div className="emergency-grid">
        {[
          ["Security Control", "080 0000 1001"],
          ["Medical Centre", "080 0000 1002"],
          ["Campus Administration", "080 0000 1003"],
          ["Emergency Services", "112"],
        ].map(([name, phone]) => (
          <div className="data-card emergency-contact" key={name}>
            <div className="emergency-contact-icon">
              <Phone size={19} />
            </div>

            <span>{name}</span>
            <strong>{phone}</strong>

            <button className="secondary-button">
              Call now
            </button>
          </div>
        ))}
      </div>

      <div className="warning-card">
        <AlertTriangle size={19} />
        <div>
          <strong>Important</strong>
          <p>
            Emergency editing and incident management should be connected to
            the authenticated administrator backend.
          </p>
        </div>
      </div>
    </div>
  );
}