// ============================================================
// src/pages/AIPerformance.tsx
// ============================================================

import {
  BrainCircuit,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function AIPerformance() {
  return (
    <div className="page-container">
      <PageHeader
        eyebrow="ARTIFICIAL INTELLIGENCE"
        title="AI Performance"
        description="Predict academic trends and identify areas requiring attention."
        icon={<BrainCircuit size={22} />}
      />

      <div className="ai-performance-hero">
        <div className="ai-score-orb">
          <div>
            <strong>88</strong>
            <span>/100</span>
          </div>
        </div>

        <div>
          <span>AI PERFORMANCE SCORE</span>

          <h2>
            Excellent academic trajectory
          </h2>

          <p>
            Current performance indicates a
            strong probability of maintaining
            above-average results.
          </p>

          <div className="ai-confidence">
            <span>Prediction confidence</span>
            <strong>91%</strong>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Predicted Grade"
          value="A+"
          detail="End-semester estimate"
          icon={<TrendingUp size={18} />}
          tone="green"
        />

        <StatCard
          label="Risk Level"
          value="Low"
          detail="Academic risk"
          icon={<CheckCircle2 size={18} />}
          tone="blue"
        />

        <StatCard
          label="Strong Areas"
          value="04"
          detail="Subjects"
          icon={<Target size={18} />}
          tone="purple"
        />

        <StatCard
          label="AI Recommendations"
          value="06"
          detail="Personalized actions"
          icon={<Lightbulb size={18} />}
          tone="orange"
        />
      </div>

      <section className="content-grid two-column">
        <div className="content-card">
          <div className="card-header">
            <div>
              <span>MODEL ANALYSIS</span>
              <h2>Performance Signals</h2>
            </div>
          </div>

          <div className="signal-list">
            {[
              ["Attendance consistency", 94],
              ["Assessment performance", 88],
              ["Assignment completion", 91],
              ["Learning activity", 84],
            ].map(([label, value]) => (
              <div className="signal-row" key={label}>
                <div>
                  <strong>{label}</strong>
                  <span>{value}% confidence</span>
                </div>

                <div className="signal-bar">
                  <span
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card ai-recommendation-card">
          <div className="card-header">
            <div>
              <span>AI RECOMMENDATION</span>
              <h2>Next Best Actions</h2>
            </div>
          </div>

          {[
            "Maintain attendance above 90%.",
            "Revise Machine Learning concepts.",
            "Complete pending assignment early.",
            "Increase project documentation quality.",
          ].map((item) => (
            <div className="recommendation-row" key={item}>
              <CheckCircle2 size={17} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AIPerformance;