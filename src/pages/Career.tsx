// ============================================================
// src/pages/Career.tsx
// ============================================================

import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Rocket,
  Target,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

function Career() {
  const roles = [
    ["Data Analyst", "94%", "Python · SQL · Analytics"],
    ["Frontend Engineer", "91%", "React · TypeScript"],
    ["AI Engineer", "84%", "ML · Python · AI"],
    ["Business Analyst", "79%", "SQL · Communication"],
  ];

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="CAREER INTELLIGENCE"
        title="Career Intelligence"
        description="Explore AI-assisted career paths based on academic and technical signals."
        icon={<GraduationCap size={22} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Career Readiness"
          value="87%"
          detail="Overall score"
          icon={<Rocket size={18} />}
          trend="+7%"
          tone="green"
        />

        <StatCard
          label="Skills Matched"
          value="14"
          detail="Verified skills"
          icon={<Code2 size={18} />}
          tone="blue"
        />

        <StatCard
          label="Top Match"
          value="94%"
          detail="Data Analyst"
          icon={<Target size={18} />}
          tone="purple"
        />

        <StatCard
          label="Opportunities"
          value="28"
          detail="Recommended roles"
          icon={<BriefcaseBusiness size={18} />}
          tone="orange"
        />
      </div>

      <section className="content-grid two-column">
        <div className="content-card">
          <div className="card-header">
            <div>
              <span>AI ROLE MATCHING</span>
              <h2>Recommended Careers</h2>
            </div>
          </div>

          <div className="career-list">
            {roles.map(([role, match, skills]) => (
              <div className="career-row" key={role}>
                <div className="career-icon">
                  <BriefcaseBusiness size={17} />
                </div>

                <div className="career-main">
                  <strong>{role}</strong>
                  <span>{skills}</span>
                </div>

                <div className="career-match">
                  <strong>{match}</strong>
                  <span>match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <span>SKILL INTELLIGENCE</span>
              <h2>Strength Profile</h2>
            </div>

            <TrendingUp size={18} />
          </div>

          {[
            ["Problem Solving", 91],
            ["Technical Skills", 88],
            ["Communication", 82],
            ["Leadership", 79],
            ["Analytics", 94],
          ].map(([name, value]) => (
            <div className="skill-row" key={name}>
              <div>
                <span>{name}</span>
                <strong>{value}%</strong>
              </div>

              <div className="skill-track">
                <span
                  style={{
                    width: `${value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Career;