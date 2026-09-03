import {
  Brain,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { skills } from "../services/data";

function AIPerformance() {
  return (
    <div>
      <PageHeader
        title="AI Performance Intelligence"
        description="AI-powered analysis of your academic performance."
      />

      <div className="dashboard-grid">
        <div className="glass-card ai-card">
          <div className="stat-icon">
            <Brain size={23} />
          </div>

          <div className="stat-label" style={{ marginTop: 18 }}>
            AI Academic Score
          </div>

          <div className="ai-score">87</div>

          <div className="ai-description">
            Your current academic performance is strong. Your
            attendance, marks and assignment completion indicate
            a positive learning trend.
          </div>
        </div>

        <div className="glass-card chart-card">
          <div className="stat-icon">
            <ShieldCheck size={22} />
          </div>

          <h2 className="section-title" style={{ marginTop: 16 }}>
            Risk Assessment
          </h2>

          <div className="ai-score" style={{ fontSize: 38 }}>
            Low
          </div>

          <p className="ai-description">
            Current academic risk is low based on the available
            performance indicators.
          </p>
        </div>
      </div>

      <div className="glass-card chart-card">
        <div className="stat-top">
          <div>
            <h2 className="section-title">Skill Intelligence</h2>
            <p className="stat-label">
              Estimated proficiency based on academic activity
            </p>
          </div>

          <Target size={20} />
        </div>

        <div className="skill-list">
          {skills.map((skill) => (
            <div className="skill-row" key={skill.name}>
              <span>{skill.name}</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.value}%` }}
                />
              </div>

              <strong>{skill.value}%</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="career-grid" style={{ marginTop: 24 }}>
        <div className="glass-card career-card">
          <TrendingUp size={23} />

          <h3>Performance Trend</h3>

          <p>
            Your academic performance shows a positive upward
            trend over recent months.
          </p>
        </div>

        <div className="glass-card career-card">
          <Lightbulb size={23} />

          <h3>AI Recommendation</h3>

          <p>
            Focus more on DBMS and Cloud Computing to improve
            your overall academic score.
          </p>
        </div>

        <div className="glass-card career-card">
          <Brain size={23} />

          <h3>Learning Pattern</h3>

          <p>
            Your strongest performance is currently observed in
            programming and web technologies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIPerformance;