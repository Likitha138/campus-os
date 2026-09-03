import {
  BriefcaseBusiness,
  Code2,
  Database,
  Globe,
  Sparkles,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const careers = [
  {
    title: "Full Stack Developer",
    icon: <Code2 size={25} />,
    match: "94%",
    description:
      "Build modern web applications using frontend and backend technologies.",
  },
  {
    title: "Data Analyst",
    icon: <Database size={25} />,
    match: "88%",
    description:
      "Analyze data and create meaningful insights for organizations.",
  },
  {
    title: "Cloud Engineer",
    icon: <Globe size={25} />,
    match: "81%",
    description:
      "Work with cloud platforms, deployment and scalable infrastructure.",
  },
];

function Career() {
  return (
    <div>
      <PageHeader
        title="Career Intelligence"
        description="Explore AI-assisted career recommendations based on your skills."
      />

      <div className="glass-card ai-card" style={{ marginBottom: 24 }}>
        <div className="stat-icon">
          <Sparkles size={22} />
        </div>

        <div className="ai-score" style={{ fontSize: 38 }}>
          Career Match
        </div>

        <p className="ai-description">
          Based on your academic performance, skills and
          interests, these career paths currently show the
          strongest compatibility.
        </p>
      </div>

      <div className="career-grid">
        {careers.map((career) => (
          <div className="glass-card career-card" key={career.title}>
            <div className="stat-icon">{career.icon}</div>

            <h3>{career.title}</h3>

            <span className="badge badge-success">
              {career.match} Match
            </span>

            <p style={{ marginTop: 14 }}>
              {career.description}
            </p>

            <button
              className="primary-btn"
              style={{ marginTop: 18 }}
            >
              <BriefcaseBusiness size={15} />
              Explore Career
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Career;