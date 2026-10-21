import { BriefcaseBusiness, Building2, Code2, TrendingUp } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function Career() {
  const recommendations = [
    ["Frontend Developer", "92%", "React · TypeScript · UI"],
    ["Data Analyst", "86%", "Python · SQL · Analytics"],
    ["Software Engineer", "81%", "Java · DSA · Backend"],
    ["Business Analyst", "74%", "SQL · Communication · BI"],
  ];

  return (
    <div className="page">
      <PageHeader
        eyebrow="CAREER INTELLIGENCE"
        title="Career Intelligence"
        description="Explore career paths based on your academic profile and skills."
      />

      <div className="career-highlight">
        <div className="career-highlight-icon">
          <TrendingUp size={27} />
        </div>

        <div>
          <span>CAREER READINESS</span>
          <strong>82 / 100</strong>
          <p>Your profile shows strong potential for technology roles.</p>
        </div>
      </div>

      <div className="career-grid">
        {recommendations.map(([role, score, skills]) => (
          <div className="career-card" key={role}>
            <div className="career-card-top">
              <div className="career-icon">
                <BriefcaseBusiness size={18} />
              </div>
              <strong>{score}</strong>
            </div>

            <h3>{role}</h3>
            <p>{skills}</p>

            <div className="career-match">
              <div style={{ width: score }} />
            </div>

            <button>
              Explore role →
            </button>
          </div>
        ))}
      </div>

      <div className="skill-strip">
        <Code2 size={20} />
        <div>
          <strong>Recommended skill development</strong>
          <span>React, SQL, Python, Git, communication and problem solving.</span>
        </div>
        <Building2 size={20} />
      </div>
    </div>
  );
}