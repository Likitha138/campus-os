import { BrainCircuit, Target, TrendingUp } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function AIPerformance() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="AI ACADEMIC ANALYTICS"
        title="AI Performance"
        description="Understand performance patterns and receive intelligent recommendations."
      />

      <div className="stats-grid">
        <StatCard label="Performance Score" value="86" suffix="/100" change="+5.8%" trend="up" icon="chart" />
        <StatCard label="Risk Level" value="Low" icon="activity" />
        <StatCard label="Predicted CGPA" value="8.7" change="+0.3" trend="up" icon="chart" />
        <StatCard label="Learning Consistency" value="91%" icon="activity" />
      </div>

      <div className="ai-performance-grid">
        <div className="data-card performance-score-card">
          <div className="ai-performance-circle">
            <span>86</span>
            <small>/ 100</small>
          </div>

          <span className="eyebrow">AI SCORE</span>
          <h3>Strong academic trajectory</h3>
          <p>
            Your attendance, marks and assignment completion indicate a
            positive performance trend.
          </p>
        </div>

        <div className="data-card">
          <div className="card-heading">
            <div>
              <strong>AI recommendations</strong>
              <small>Personalized next actions</small>
            </div>
            <BrainCircuit size={20} />
          </div>

          {[
            ["Increase Database practice", "High impact"],
            ["Maintain attendance above 85%", "Medium impact"],
            ["Complete assignments earlier", "Medium impact"],
            ["Strengthen DSA fundamentals", "High impact"],
          ].map(([title, impact]) => (
            <div className="recommendation-row" key={title}>
              <Target size={17} />
              <div>
                <strong>{title}</strong>
                <span>{impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}