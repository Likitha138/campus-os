import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const careerSkills = [
  {
    name: "Frontend Development",
    score: 88,
  },
  {
    name: "Data Analytics",
    score: 82,
  },
  {
    name: "Database Management",
    score: 76,
  },
  {
    name: "Cloud Computing",
    score: 68,
  },
  {
    name: "AI & Machine Learning",
    score: 71,
  },
];

export default function Career() {
  return (
    <div className="page">
      <PageHeader
        title="Career Intelligence"
        subtitle="Analyse skills, career readiness and placement opportunities."
      />

      <div className="career-hero">
        <div>
          <span className="panel-kicker">
            CAREER READINESS
          </span>

          <h2>
            Your current readiness score is
            <strong> 84%</strong>.
          </h2>

          <p>
            Strong technical fundamentals with
            opportunities to improve cloud, AI and
            interview readiness.
          </p>
        </div>

        <div className="career-score">
          <strong>84</strong>
          <span>/100</span>
        </div>
      </div>

      <div className="career-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SKILL PROFILE
              </span>
              <h3>Technical Skills</h3>
            </div>

            <Target size={18} />
          </div>

          <div className="career-skills">
            {careerSkills.map((skill) => (
              <div
                className="career-skill"
                key={skill.name}
              >
                <div>
                  <span>{skill.name}</span>
                  <strong>
                    {skill.score}%
                  </strong>
                </div>

                <div className="progress-bar">
                  <span
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                CAREER PATH
              </span>
              <h3>Recommended Roles</h3>
            </div>

            <BriefcaseBusiness size={18} />
          </div>

          <div className="career-role-list">
            <div>
              <div className="role-icon">
                <TrendingUp size={17} />
              </div>

              <div>
                <strong>Data Analyst</strong>
                <span>92% match</span>
              </div>
            </div>

            <div>
              <div className="role-icon">
                <Building2 size={17} />
              </div>

              <div>
                <strong>Frontend Developer</strong>
                <span>88% match</span>
              </div>
            </div>

            <div>
              <div className="role-icon">
                <GraduationCap size={17} />
              </div>

              <div>
                <strong>AI Developer</strong>
                <span>76% match</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel career-roadmap">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              DEVELOPMENT PLAN
            </span>
            <h3>Career Roadmap</h3>
          </div>
        </div>

        <div className="career-roadmap-track">
          <div className="roadmap-step completed">
            <i>
              <CheckCircle2 size={15} />
            </i>
            <strong>Core Skills</strong>
            <span>Completed</span>
          </div>

          <div className="roadmap-line" />

          <div className="roadmap-step active">
            <i>2</i>
            <strong>Advanced Projects</strong>
            <span>Current</span>
          </div>

          <div className="roadmap-line" />

          <div className="roadmap-step">
            <i>3</i>
            <strong>Interview Preparation</strong>
            <span>Upcoming</span>
          </div>

          <div className="roadmap-line" />

          <div className="roadmap-step">
            <i>4</i>
            <strong>Placement</strong>
            <span>Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}