import {
  BrainCircuit,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

export default function AIPerformance() {
  return (
    <div className="page">
      <PageHeader
        title="AI Performance Intelligence"
        subtitle="AI-assisted academic performance and student risk analysis."
      />

      <div className="ai-performance-hero">
        <div className="ai-performance-icon">
          <BrainCircuit size={30} />
        </div>

        <div>
          <span className="panel-kicker">
            AI PERFORMANCE ENGINE
          </span>

          <h2>
            Academic performance prediction is
            currently stable.
          </h2>

          <p>
            The simulation combines attendance,
            marks, assignment completion and activity
            patterns to identify students requiring
            attention.
          </p>
        </div>

        <div className="ai-confidence">
          <span>MODEL CONFIDENCE</span>
          <strong>91%</strong>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <TrendingUp size={19} />
            </div>
          </div>

          <div className="stat-value">
            2,486
          </div>

          <div className="stat-label">
            Low-risk students
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <ShieldAlert size={19} />
            </div>
          </div>

          <div className="stat-value">
            624
          </div>

          <div className="stat-label">
            Medium-risk students
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <TrendingDown size={19} />
            </div>
          </div>

          <div className="stat-value">
            138
          </div>

          <div className="stat-label">
            High-risk students
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon">
              <Sparkles size={19} />
            </div>
          </div>

          <div className="stat-value">
            86%
          </div>

          <div className="stat-label">
            Predicted improvement
          </div>
        </div>
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                RISK FACTORS
              </span>
              <h3>AI Signals</h3>
            </div>
          </div>

          <div className="risk-factor-list">
            <RiskFactor
              label="Attendance"
              value="High impact"
              width={82}
            />

            <RiskFactor
              label="Internal marks"
              value="Medium impact"
              width={67}
            />

            <RiskFactor
              label="Assignments"
              value="Medium impact"
              width={54}
            />

            <RiskFactor
              label="Academic activity"
              value="Low impact"
              width={31}
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                RECOMMENDATIONS
              </span>
              <h3>AI Actions</h3>
            </div>
          </div>

          <div className="recommendation-list">
            <div>
              <CheckCircle2 size={16} />
              Contact high-risk students early.
            </div>

            <div>
              <CheckCircle2 size={16} />
              Prioritise attendance intervention.
            </div>

            <div>
              <CheckCircle2 size={16} />
              Recommend subject-specific revision.
            </div>

            <div>
              <CheckCircle2 size={16} />
              Monitor assignment completion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskFactor({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: number;
}) {
  return (
    <div className="risk-factor">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress-bar">
        <span style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}